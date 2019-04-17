var express = require('express')
var router = express.Router()
var Category = require('../question/category.model')
// route /api/category

// get categorys (dev)
router.get('/', function(req, res) {
    Category.find({}, {_id:0, __v:0}, (error, categories) => {
        if (error) {
            res.status(500).json(error);
        }
        else {
            res.status(200).json(categories)
        }
    }) 
    
})

// create new category
router.post('/',function(req, res) {
    if (req.body.decodedData.admin) {
        let newCategory = new Category();
        newCategory.title = req.body.title;
        newCategory.save()
            .then(category => {
                res.status(201).json({
                    status: "success",
                    message: "Category created",
                    data: {
                        "title": category.title,
                        "createdAt": category.createdAt,
                    }
                })
            })
            .catch(error => {
                res.status(500).json({
                    status: "fail",
                    message: error.message,
                    data: {
                        error: error
                    }
                })
            })   
    }
    else {
        res.status(403).json({
            status: "fail",
            message: "You aren't an admin",
            data: {}
        })
    }
})

// update category data
router.put('/', (req, res) => {
    res.write('Update category')
    res.send();
})

// delete category
router.delete('/', (req, res) => {
    res.write('Delete category')
    res.send();
})

module.exports = router