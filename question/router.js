const router = require('express').Router()
const Question = require('../question/model')


// get questions (dev)
router.get('/', (req, res) => {
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
router.post('/', (req, res) => {
    let newquestion = new Question();

    // get the specific data from request body
    newquestion.text = req.body.text;
    newquestion.answer = req.body.answer;
    newquestion.choices = req.body.choices;
    newquestion.category = req.body.category;
    newquestion.author = req.body.author;
    if (req.decodedDate.admin) {
        newquestion.confirmed = true;
    }
    newquestion.save()
        .then(question => {
            res.status(201).json({
                status: "success",
                message: "سوال شما ثبت شد و پس تایید در بازی قرار می گیرد",
                data: {
                    "text": question.text,
                    "answer": question.answer,
                    "choices": question.choices,
                    "createdAt": question.createdAt,
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
})

// update question data
router.put('/', (req, res) => {
    res.write('Update question is in development');
    res.send();
})

// delete question
router.delete('/', (req, res) => {
    res.write('Delete question is in development');
    res.send();
})

module.exports = router