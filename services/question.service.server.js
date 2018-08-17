module.exports = app => {
    const questionModel =require('../models/quizzes/question.model.server');

    createQuestion = (req, res) =>
        questionModel
            .createQuestion(req.body)
            .then(
                question => res.json(question),
                error => res.send(error)
            )

    findAllQuestions = (req, res) => {
        console.log('find all questions');
        questionModel.findAllQuestions()
            .then(questions => res.send(questions));

    };

    findQuestionById = (req, res) => {
        console.log('find question by id');
        questionModel.findQuestionById(req.params.questionId)
            .then(question => res.send(question));

    };

    updateQuestion = (req, res) => {
        console.log('updating question');
        questionModel.updateQuestion(req.params.questionId, req.body)
            .then(status => res.send(status));

    };

    deleteQuestion = (req, res) => {
        console.log('deleting question');
        questionModel.deleteQuestion(req.params.questionId)
            .then(status => res.send(status));

    };


    app.post('/api/question', createQuestion);
    app.get('/api/question', findAllQuestions);
    app.get('/api/question/:questionId', findQuestionById);
    app.put('/api/question/questionId', updateQuestion);
    app.delete('/api/question/questionId', deleteQuestion);
};