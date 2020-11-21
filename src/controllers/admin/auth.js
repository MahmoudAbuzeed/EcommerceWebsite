const User = require('../../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const shortid = require('shortid');


exports.signup = async(req, res, next) => {
    const {firstName, lastName, email, password} = req.body;
    const alreadyRegistered = await User.findOne({ email });
    if(alreadyRegistered) {
        const error = new Error(`Email address ${alreadyRegistered.email} is already taken`);
        error.status = 400
        next(error);
      }
      const hash_password = await bcrypt.hash(password, 10);

      const newUser = new User({ 
        firstName, 
        lastName, 
        email, 
        hash_password,
        username: shortid.generate(),
        role: 'admin'
    });
    try {
        const user = await newUser.save();
        return res.send({ user });
     }catch(e) {
          next(e);
      }

           
}


exports.signin = async (req, res, next) => {

    const { email, password } = req.body;
    try {
        //Retrieve user information
        const user = await User.findOne({ email });
        if (!user) {
            const err = new Error(`The email ${email} was not found on our system`);
            err.status = 401;
            return next(err);
        }

        //Check the password
        user.isPasswordMatch(password, user.hash_password, (err, matched) => {
            if (matched && user.role === 'admin') {
                 //Generate JWT
                const secret = process.env.JWT_SECRET;
                const expire = process.env.JWT_EXPIRATION;

                const token = jwt.sign({ _id: user._id }, secret, { expiresIn: expire });
                return res.send({ 
                    token,
                    user
             });
            }

            res.status(401).send({
                error: 'Invalid username/password combination'
            });
        });

    }catch(e){
        next(e);
    }

    }


exports.signout = (req, res) => {
    res.clearCookie('token');
    res.status(200).json({
        message: 'signout successfully ...'
    })
}