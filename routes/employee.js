const employee = require('../models/employee');
const express = require('express');
const router = express.Router();
const questionnaire = require('../models/questionnaire');
const testResult = require('../models/testResult');


/* GET home page. */
router.get('/', async function (req, res, next) {
  const employeeId = req.query.employeeId;
  const foundEmployee = await employee.findEmployee(employeeId);
  if (!foundEmployee) {
    res.render('message', { "message": "NO Employee found for Id: " + employeeId + ". Please try the search again." });
    return;
  } else {
    //calculate return status then present questionanaire accordingly
    const mostRecentTestResult = await testResult.findMostRecentEmployeeTestResult(employeeId);
    const mostRecentQuestionnaire = await questionnaire.findMostRecentEmployeeQuestionnaire(employeeId);
    console.log(`Most recent test result: ${mostRecentTestResult}. Most recent questionnaire: ${mostRecentQuestionnaire}.`);
    if (mostRecentTestResult === "Negative") {
      res.render('message', { "message": " ", "hasError": false, "employeeStatus": "OE", "fName": foundEmployee.firstName, "lName": foundEmployee.lastName });
      return;

    } else if (mostRecentTestResult === "Positive") {
      if (mostRecentQuestionnaire === "Pass") {
        res.render('message', { "message": "", "hasError": false, "employeeStatus": "OE", "fName": foundEmployee.firstName, "lName": foundEmployee.lastName });


      } else if (mostRecentQuestionnaire === "Fail" || mostRecentQuestionnaire == null) {
        res.render('questionnairre', { "employee": foundEmployee });
        return;

      } else {
        res.render('message', { "message": "", "hasError": false, "employeeStatus": "NTR", "fName": foundEmployee.firstName, "lName": foundEmployee.lastName });
        return;
      }


    }

  }
})

module.exports = router;


