const mongoose = require('mongoose');
const schema = require('./submission.schema.server');
const submissionModel = mongoose.model('SubmissionModel', schema);

createSubmission = submission =>
    submissionModel.create(submission);

findAllSubmissions = () =>
    submissionModel.find();

findAllSubmissionsForStudent = studentId =>
    submissionModel.find({student: studentId});

findAllSubmissionsForQuiz = () =>
    submissionModel.find({quiz: quizId});

module.exports = {
    createSubmission,
    findAllSubmissions,
    findAllSubmissionsForStudent,
    findAllSubmissionsForQuiz
};