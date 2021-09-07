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
const model = mongoose.model("testResult", testResultSchema);

const findEmployeeTestResults = async function (id) {
    const testResults = await model.find({ employeeId: id });
    return (testResults);
}

const findMostRecentEmployeeTestResult = async function (id) {
    const testResults = await findEmployeeTestResults(id);

    if (testResults.length === 0) {
        return null;
    }
    const recentTestResult = await model.find({ employeeId: id }).sort({ "testDate": -1 }).limit(1);
    return (recentTestResult[0].testResult);
}

module.exports = { model, findEmployeeTestResults, findMostRecentEmployeeTestResult };