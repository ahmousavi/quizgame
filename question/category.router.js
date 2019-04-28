var express = require('express')
var router = express.Router()
var Category = require('../question/category.model')

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

/* 
create new category
- request body format: { "title": "the category title" }
- login required
- admins only
*/
router.post('/',function(req, res) {
    if (req.decodedData.admin) {
        let newCategory = new Category();
        newCategory.title = req.body.title;
        newCategory.save()
            .then(category => {
                res.status(201).json({
                    status: "success",
                    message: "دسته بندی ایجاد شد",
                    data: {
                        "title": category.title,
                        "questions": category.count,
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
            message: "دسترسی مجاز نیست",
            data: {}
        })
    }
})

router.put('/:name', (req, res) => {
    res.write('This part is in development yet');
    res.send();
})

// delete category
router.delete('/:name', (req, res) => {
    res.write('This part is in development yet');
    res.send();
})

module.exports = router