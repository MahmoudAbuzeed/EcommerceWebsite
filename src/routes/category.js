const express = require('express');
const {addCategory, getCategories, updateCategories, deleteCategories} = require("../controllers/category");
const router = express.Router();
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');
const { requireSignin, adminMiddleware } = require('../common-middleware');



const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, file, cb){
        cb(null, shortid.generate() + '-' + file.originalname)
    }
});


const upload = multer({storage});

router.post('/category/create', upload.single('categoryImage'), requireSignin ,adminMiddleware, requireSignin, addCategory);
router.get('/category/getcategory',requireSignin ,adminMiddleware, getCategories);
router.post('/category/update', upload.array('categoryImage', requireSignin, adminMiddleware, updateCategories));
router.post('/category/delete', requireSignin, adminMiddleware, deleteCategories);


module.exports = router;

