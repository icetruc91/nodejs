const mongoose = require('mongoose');
const schema = require('submission.schema.server');
const model = mongoose.model('SubmissionModel', schema);

createSubmission = submission =>
    mongoose.create(submission);

findAllSubmission =() =>
    mongoose.find();

findAllSubmissionsForStudent = studentId =>
    mongoose.find({student: studentId});

findAllSubmissionsForQuiz = quizId =>
    mongoose.find({quiz: quizId});

module.exports = {
    createSubmission,
    findAllSubmission,
    findAllSubmissionsForStudent,
    findAllSubmissionsForQuiz
}