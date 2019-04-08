var express = require('express')
var router = express.Router()
var Category = require('../models/category')
const {verifyToken} = require('./../controllers/authentication')
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
.post(function(req, res) {
    if (req.headers.authorization && req.headers.authorization.split(' ')[0] === 'Bearer') {
        let token = req.headers.authorization.split(' ')[1];
        verifyToken(token).then(data => {
            console.log("LOG", data);
            
            if (data.admin) {
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
        .catch(err => {
            res.status(401).json({
                status: "fail",
                message: err.message,
                data: {
                    error: err,
                }
            })
        })
    }
    else {
        res.status(401).json({
            status: "fail",
            message: "token not found",
            data: {}
        })
    }
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