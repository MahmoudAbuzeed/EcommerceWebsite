const Category = require('../models/category')
const slugify = require('slugify')
const shortid = require('shortid')



function createCategories(categories, parentId = null){

    const categoryList = [];
    let category;
    if(parentId == null){
        category = categories.filter(cat => cat.parentId == undefined);
    }else{
        category = categories.filter(cat => cat.parentId == parentId);
    }

    for(let cate of category){
        categoryList.push({
            _id: cate._id,
            name: cate.name,
            slug: cate.slug,
            parentId: cate.parentId,
            type: cate.type,
            children: createCategories(categories, cate._id)
        });
    }

    return categoryList;

};


exports.addCategory = async (req, res, next) => {

    const categoryObj = {
        name: req.body.name,
        slug: `${slugify(req.body.name)}-${shortid.generate()}`
    }

    if(req.file){
        categoryObj.categoryImage = process.env.API + '/public/' + req.file.filename;
    }

    if(req.body.parentId){
        categoryObj.parentId = req.body.parentId;
    }

    const newCategory = new Category(categoryObj);

    try{
        const saved = await newCategory.save();
        return res.send({
            success: true,
            category: saved
        })
    } catch(err){
        next(err)
    }
    
   /* cat.save((error, category) => {
        if(error) return res.status(400).json({error});
        if(category){
            return res.status(201).json({category});
        }*/
    
}

exports.getCategories = async (req, res, next)=> {

    try{
        const category = await Category.find();
        const categoryList = createCategories(category)
        return res.send({
            success: true,
            categoryList
          });
    } catch(err){
        next(err)
    }
}

exports.updateCategories = async (req, res, next) =>{
    const { _id, name, parentId, type} = req.body;
    const updatedCategories = [];
    if(name instanceof Array){
        for(let i = 0; i < name.length; i++){
            const category ={
                name: name[i],
                type: type[i]

            };
             if(parentId!== ""){
                 category.parentId = parentId[i];
                }
            
                const updatedCategory = await Category.findOneAndUpdate({_id: _id[i]}, category, {new: true});
                updatedCategories.push(updatedCategory);
        }
        return res.status(400).json({updateCategories: updatedCategories})
    } else {
        const category ={ 
            name, 
            type
        };
        if(parentId !== ""){
            category.parentId = parentId;

        }
        const updatedCategory = await Category.findOneAndUpdate({_id}, category, {new: true});
        return res.status(400).json({updatedCategory})
    }
}



exports.deleteCategories = async (req, res, next) =>{
    const { ids } = req.body.payload;
    const deletedCategories = [];
    for(let i; i<ids.length; i++){
        const deleteCategory = Category.findOneAndDelete({_id: ids[i]._id});
        deletedCategories.push(deleteCategory);
    }
    if(deletedCategories.length == ids.length){
        return res.send({
            success: true,
            deletedCategories
          });

    } else if(err) {
        next(err)

    }
}
