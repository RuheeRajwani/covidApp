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

const findMostRecentEmployeeTestResult = async function (id) {
    const recentTestResult = await TestResult.find({ employeeId: id }).sort({ "testDate": -1 }).limit(1);
    const result = await recentTestResult[0].testResult;
    console.log("recent", recentTestResult);
    console.log("Just most recent result:", result);
}
module.exports = { TestResult, findEmployeeTestResults, findMostRecentEmployeeTestResult };