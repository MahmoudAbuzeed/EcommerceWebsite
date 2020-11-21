const express = require('express');
const { requireSignin, adminMiddleware} = require('../common-middleware/index');
const { createProduct, getProductsBySlug, getProductDetailsById} = require('../controllers/product');
const multer = require('multer');
const router = express.Router();
const shortid = require('shortid');
const path = require('path');


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb) {
      cb(null, shortid.generate() + '-' + file.originalname)
    }
})

const upload = multer({ storage });


router.post('/product/create', requireSignin, adminMiddleware, upload.array('productPicture'), createProduct);
router.post('/product/:slug', getProductsBySlug);
router.get('/product/:productId', getProductDetailsById);


module.exports = router;


