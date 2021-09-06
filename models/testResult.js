const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const testResultSchema = new Schema({
    employeeId: {
        type: String,
        required: true
    },
    testDate: {
        type: Date,
        required: true

    },
    testResult: {
        type: String,
        required: true,
        enum: ['Positive', 'Negative']
    }
})
const TestResult = mongoose.model("testResult", testResultSchema);

const findEmployeeTestResults = async function (id) {
    const testResults = await TestResult.find({ employeeId: id });
    console.log(testResults);
}
module.exports = { TestResult, findEmployeeTestResults };