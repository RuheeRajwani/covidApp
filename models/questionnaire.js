const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const questionnaireSchema = new Schema({
    employeeId: {
        type: String,
        required: true,
    },
    resultDate: {
        type: Date,
        // required: true,
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

const model = mongoose.model('questionnaire', questionnaireSchema);


const findEmployeeQuestionnaire = async function (id) {
    const questionnaires = await model.find({ employeeId: id });
    return (questionnaires);
}

const findMostRecentEmployeeQuestionnaire = async function (id) {
    const employeeQuestionnaires = await findEmployeeQuestionnaire(id);
    if (employeeQuestionnaires.length === 0) {
        return null;
    }
    const recentQuestionnaire = await model.find({ employeeId: id }).sort({ "resultDate": -1 }).limit(1);
    return (recentQuestionnaire[0].questResults);
}
const saveQuestionnaire = async function (questionnaire) {
    const q = new model(questionnaire);
    const saved = await q.save();
    console.log("SAVED!", saved)

}

module.exports = { model, findMostRecentEmployeeQuestionnaire, saveQuestionnaire };
