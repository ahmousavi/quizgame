var express = require('express')
var router = express.Router()
var Question = require('../question/model')

// route /api/question
router.route('/')
// get questions (dev)
.get((req, res) => {
    Question.find({}, {})
        .populate('author')
        .populate('category')
        .exec(function (error, questions) {
            if (error) {
                res.status(500).json(error);
            }
            else {
                res.status(200).json(questions)
            }
        })
    
})

// create new question
.post((req, res) => {
    let newquestion = new Question();

    newquestion.text = req.body.text;
    newquestion.answer = req.body.answer;
    newquestion.choices = req.body.choices;
    newquestion.category = req.body.category;
    newquestion.author = req.body.author;

    newquestion.save()
        .then(question => {
            res.status(201).json({
                status: "success",
                message: "Question created",
                data: {
                    "text": question.text,
                    "answer": question.answer,
                    "choices": question.choices,
                    "createdAt": question.createdAt,
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

// update question data
.put((req, res) => {
    res.write('Update question')
    res.send();
})

// delete question
.delete((req, res) => {
    res.write('Delete question')
    res.send();
})

module.exports = router