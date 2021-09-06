const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const employeeSchema = new Schema({
    employeeId: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['M', 'F']
    },
    age: {
        type: Number,
        required: true,
    },
    managerId: {
        type: String,
        required: true
    },
    managerName: {
        type: String,
        required: true
    },
    keyPostionFlag: {
        type: Boolean,
        required: true
    },
    jobTitle: {
        type: String,
        required: true
    },
    department: {
        type: String,
        required: true
    },
    division: {
        type: String,
        required: true
    },
    officeBuilding: {
        type: String,
        required: true
    },
    floor: {
        type: Number,
        required: true

    },
    desk: {
        type: String,
        required: true

    },
    officeCity: {
        type: String,
        required: true

    },
    officeCounty: {
        type: String,
        required: true

    },
    officeState: {
        type: String,
        required: true

    },
    homeCity: {
        type: String,
        required: true

    },
    homeCounty: {
        type: String,
        required: true

    },
    homeState: {
        type: String,
        required: true

    },
    covidSeverity: {
        type: Number,
        required: true

    }

})

const Employee = mongoose.model('employee', employeeSchema);

const findEmployee = async function (id) {
    const foundEmployee = await Employee.find({ employeeId: id });
    console.log(foundEmployee);
}
module.exports = { Employee, findEmployee };