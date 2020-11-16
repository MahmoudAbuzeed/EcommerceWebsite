const express = require('express');
const {addCategory, getCategories, updateCategories, deleteCategories} = require("../controllers/category");
const router = express.Router();
const shortid = require('shortid');
const path = require('path');
const multer = require('multer');


const storage = multer.diskStorage({
    distination: function(req, res, cb){
        cb(null, path.join(path.dirname(__dirname), 'uploads'))
    },
    filename: function (req, res, cb){
        cb(null, shortid.generate() + '-' + file.originalname)
    }
});


const upload = multer.storage();

router.post('/category/create', upload.single('categoryImage'), addCategory);
router.get('/category/getcategory', getCategories);
router.post('/category/update', upload.array('categoryImage', updateCategories));
router.post('/category/delete', deleteCategories);


module.exports = router;

