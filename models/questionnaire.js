const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionnaireSchema = new Schema({
    employeeId: {
        type: String,
        required: true,
    },
    resultDate: {
        type: Date,
        required: true,
    },
    questResults: {
        type: String,
        required: true,
        enum: ['Pass', 'Fail']
    },
    vaccinated: {
        type: Boolean,
        required: true
    },
    covidContact: {
        type: Boolean,
        required: true
    },
    travelInternational: {
        type: Boolean,
        required: true
    },
    fever: {
        type: Boolean,
        required: true
    },
    cough: {
        type: Boolean,
        required: true
    },
    soreThroat: {
        type: Boolean,
        required: true
    },
    chills: {
        type: Boolean,
        required: true
    },
    muscleAches: {
        type: Boolean,
        required: true
    }, headAche: {
        type: Boolean,
        required: true
    }, tasteSmellLoss: {
        type: Boolean,
        required: true
    }, abdominalPain: {
        type: Boolean,
        required: true
    }

})

const Questionnaire = mongoose.model('questionnaire', questionnaireSchema);

const findEmployeeQuestionnaires = async function (id) {
    const questionnaires = await Questionnaire.find({ employeeId: id });
    console.log(questionnaires);
}

const findMostRecentQuestionnaires = async function (id) {
    const questionnaires = await Questionnaire.find({ employeeId: id });
    console.log(questionnaires);
}
module.exports = { Questionnaire, findEmployeeQuestionnaires };