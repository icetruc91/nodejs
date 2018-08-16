const mongoose = require('mongoose');
module.exports = mongoose.Schema({
    student: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'UserModel'
    },
    question: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'QuizModel'
    },
    answers: [{
        fillBlanksAnswers: {
            variable: String,
            value: String
        },
        multipleChoiceAnswer: Number,
        trueFalseAnswer: Boolean,
        essayString: String,
        question: {
            type: mongoose.Schemma.Types.ObjectId,
            ref: 'QuestionModel'
        }
    }]
}, {collection: 'submission'});