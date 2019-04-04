var express = require('express')
var router = express.Router()
var Category = require('../models/category')

// route /api/category
router.route('/')
// get categorys (dev)
.get((req, res) => {
    Category.find({}, {}, (error, categories) => {
        if (error) {
            res.status(500).json(error);
        }
        else {
            res.status(200).json(categories)
        }
    }) 
    
})

// create new category
.post((req, res) => {
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
            res.status(400).json({
                status: "fail",
                message: error.message,
                data: {
                    error: error
                }
            })
        })   
})

// update category data
.put((req, res) => {
    res.write('Update category')
    res.send();
})

// delete category
.delete((req, res) => {
    res.write('Delete category')
    res.send();
})

module.exports = router