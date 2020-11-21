const Category = require('../models/category');
const Product = require('../models/product');
const slugify = require('slugify');

exports.createProduct = async (req, res, next)=>{

    const { name, price, description, category, quantity, createdBy }= req.body;

    let productPictures = [];
    
    if(req.files.length > 0){
        productPictures = req.files.map( file => {
            return { img: file.filename }
        });
    }

    const newProduct = new Product({
        name: name,
        slug: slugify(name),
        price,
        quantity,
        description,
        productPictures,
        category,
        createdBy: req.user._id
    });

    if(newProduct) {
        const saved = await newProduct.save();
        return res.send({
            success: true,
            product: saved
        })

    } else {
        next(err)
    }
    
}


  


exports.getProductsBySlug = async (req, res, next) => {
    const {slug} = req.params;
    const category = await Category.findOne({ slug: slug }).select('_id')
        if(category){
                const products = await Product.find({category: category._id});
                if(products.length > 0){
                    res.status(400).json({
                        products,
                        productsByPrice: {
                            under5k: products.filter(product => product.price <= 5000),
                            under10k: products.filter(product => product.price > 5000 && product.price <= 10000),
                            under15k: products.filter(product => product.price > 10000 && product.price <= 15000),
                            under20k: products.filter(product => product.price > 15000 && product.price <= 20000),
                            under30k: products.filter(product => product.price > 20000 && product.price <= 30000),
                            
                        }
                    });
                }
        }

}

exports.getProductDetailsById = async (req, res, next) => {
    const { productId } = req.params;

    if(productId){
        
            const product = await Product.findOne({ _id: productId});
            if(product){
                return res.send({product});
            } else {
                next(err)
            }

    }    

}


