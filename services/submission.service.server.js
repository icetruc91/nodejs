module.exports = function (app) {

    console.log("print is you're in submission");
    app.post('/api/quiz/:qid/submission', submitQuiz);
    app.get('api/quiz/:qid/submission/:submissionId', getSubmissionByQuizId);
    app.get('/api/quiz/:qid/submission/:submissionId', getSubmissionByStudentId);
    app.get('api/quiz/:qid/submission', getAllSubmissions);

    const submissionModel = require('../models/submission/submission.model.server');

    function submitQuiz (req, res) {
        console.log('submit quiz');
        submissionModel.createSubmission(req.body)
            .then(submission => res.send(submission));
    }

    function getSubmissionByQuizId (req, res) {
        console.log('get submission by quiz id');
        submissionModel.findAllSubmissionsForQuiz(quizId)
        .then(submission => res.send(submission));
    }

    function  getSubmissionByStudentId (req, res) {
        console.log('find all submissions for a particular student');
        submissionModel.findAllSubmissionsForStudent(studentId)
            .then(submission => res.send(submission));
    }

    function getAllSubmissions (req, res)  {
        console.log('get all submissions');
        submissionModel.findAllSubmissions()
            .then(submission => res.send(submission));
    }







}

