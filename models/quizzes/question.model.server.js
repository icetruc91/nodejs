const mongoose =require('mongoose');
const questionSchema = require('./question.schema.server');
const questionModel = mongoose.model('QuestionModel', questionSchema);



createQuestion = question =>
    questionModel.create(question);

findAllQuestions = () =>
    questionModel.find();

findQuestionById = qId =>
    questionModel.findById(qId);

deleteQuestion = qId =>
    questionModel.delete(qId);

updateQuestion = (questionId, newQuestion) =>
    questionModel.update({_id: questionId}, {
        $set:newQuestion
    });

module.exports = {
    createQuestion,
    findAllQuestions,
    findQuestionById,
    deleteQuestion,
    updateQuestion
};