const Cart = require('../models/cart');

function runUpdate(condition, updateData) {
    return new Promise((resolve, reject) => {
     Cart.findOneAndUpdate(condition, updateData, { upsert: true })
       .then(result => resolve())
       .catch(err => reject(err))

     });
}


exports.addItemToCart = async (req, res, next) => {


   const cart = await Cart.findOne({ user: req.user._id })
        
        if(cart){
            
            let promiseArray = [];

            req.body.cartItems.forEach((cartItem) => {
                const product = cartItem.product;
                const item = cart.cartItems.find(c => c.product == product);
                let condition, update;
                if(item){
                    condition = { "user": req.user._id, "cartItems.product": product };
                    update = {
                        "$set": {
                            "cartItems.$": cartItem
                        }
                    }; 
                }else{
                    condition = { user: req.user._id };
                    update = {
                        "$push": {
                            "cartItems": cartItem
                        }
                    };
                }
                promiseArray.push(runUpdate(condition, update))
                
            });
            Promise.all(promiseArray)
            .then(response => res.status(201).json({ response }))
            .catch(error => res.status(400).json({error}))
        }else{
            
            const cart = await new Cart({
                user: req.user._id,
                cartItems: req.body.cartItems
            });
           const saved =  await cart.save();
                if(saved){
                    return res.send({
                        success: true, 
                        cart: saved 
                    });
                } else {
                    next(err);
                }
            
        } 
    

    

};

exports.getCartItems = async (req, res, next)=>{
    
    const cart = await Cart.findOne({user: req.user._id})
    .populate('cartItems.product', ' _id name price productPictures')

    if(cart){
        let cartItems = {};
        cart.cartItems.forEach((item, index) => {
            cartItems[item.product._id.toString()] = {
                _id: item.product._id.toString(),
                name: item.product.name,
                img: item.product.productPictures[0].img,
                price: item.product.price,
                qty: item.quantity, 
            }
        })
        res.status(200).json({ cartItems })
    }else {
            next(err)
        }
}