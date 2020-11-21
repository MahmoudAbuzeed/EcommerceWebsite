const UserAddress = require('../models/address');



exports.addAddress = async (req, res, next) => {

    const { payload } = req.body;
    if(payload.address){
        const updatedAddress = await UserAddress.findOneAndUpdate({ user: req.user._id }, {
            "$push": {
                "address": payload.address
            }
        }, { new: true, upsert: true})

        if(updatedAddress){
            return res.send({
                success: true,
                update: updatedAddress
            });
        } else {
            next(err)
        }
    } else {
        next(err)
    }
}


exports.getAddress = async (req, res, next) => {

    const userAddress = await UserAddress.findOne({user: req.user._id});
    if(userAddress){
        return res.send({
            succes: true,
            userAddress: userAddress
        });
    } else { 
        next(err)
    }
}


