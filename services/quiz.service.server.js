module.exports = app => {
    const quizModel = require('../models/quizzes/quiz.model.server');



    createQuiz = (req, res) => {
        console.log('create quiz');
        quizModel.createQuiz(req.body)
            .then(quiz => res.send(quiz));

    };

    findAllQuizzes = (req, res) => {
        console.log('find all quizzes');
        quizModel.findAllQuizzes()
            .then(quizzes => res.send(quizzes));

    };

    findQuizById = (req, res) => {
        console.log('find quiz by Id');
        quizModel.findQuizById(req.params.qid)
            .then(quiz => res.send(quiz));

    };

    updateQuiz = (req, res) => {
        console.log('update quiz');
        quizModel.updateQuiz(req.params.qid, req.body)
            .then(status => res.send(status));

    };

    deleteQuiz = (req, res) => {
        console.log('deletingQuiz');
        quizModel.deleteQuiz(req.params.qid)
            .then(status => res.send(status));

    };

    addQuestion = (req, res) => {
        console.log('adding quiz');
        quizModel
            .addQuestion(req.params.qid, req.params.questionId)
            .then(
                status => res.send(status),
                error => res.send(error)
            )
    };

    submitQuiz = (req, res) => {
        res.json(req.body);
    };

    app.post('/api/quiz', createQuiz);
    app.get('/api/quiz', findAllQuizzes);
    app.get('/api/quiz/:qid', findQuizById);
    app.put('/api/quiz/qid', updateQuiz);
    app.delete('/api/quiz/:qid', deleteQuiz);
    app.put('api/quiz/:qid/question/:questionId', addQuestion);
    app.post('/api/quiz/:qid/submission', submitQuiz);

};