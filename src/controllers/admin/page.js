const Page = require('../../models/page');

exports.createPage = async (req, res, next) => {
    const { banners, products } = req.files;
    if(banners && banners.length > 0){
        req.body.banners = banners.map((banner, index) => ({
            img: `${process.env.API}/public/${banner.filename}`,
            navigateTo: `/bannerClicked?categoryId=${req.body.category}&type=${req.body.type}`

        }));
    }

    if(products && products.length > 0){
        req.body.products = products.map((product, index) => ({
            img: `${process.env.API}/public/${product.filename}`,
            navigateTo: `/productClicked?categoryId=${req.body.category}&type=${req.body.type}`

        }));
    }
    
    req.body.createdBy = req.user._id;

    const page = await Page.findOne({ category: req.body.category })

    if(page){
        const updatedPage = await Page.findOneAndUpdate({ category: req.body.category }, req.body)

            return res.send({
                success: true,
                updatedPage: updatedPage
                })
    } else {
        const newPage = new Page(req.body);
         newPage.save();
        if(newPage){
            return res.send({
                success: true,
                newPage
            })
        }else {
            next(err)
        }
         
    }

}


exports.getPage = (req, res, next) => {
    const { category, type } = req.params;
    if(type === "page"){
        
            const page = Page.findOne({ category: category });
            return res.send({
                success: true,
                page: page
            })

    } else {
        next(err)
    }
} 