var express = require('express');
var router = express.Router();
var database = require('../database.js');
let questionnaireValues = ["EMPLOYEE_ID", "VACCINATED", "COVID_CONTACT", "TRAVEL_INTERNATIONAL", "FEVER", "COUGH", "SORE_THROAT", "CHILLS", "MUSCLE_ACHES", "HEADACHE", "TASTE_SMELL_LOSS", "ABDOMINAL_PAIN"];
let fName = "";
let lName = "";



/* GET home page. */
router.post('/', function (req, res, next) {
  let qObject = { EMPLOYEE_ID: 0, RESULT_DATE: 0, QUES_RESULTS: "Pass", VACCINATED: "FALSE", COVID_CONTACT: "FALSE", TRAVEL_INTERNATIONAL: "FALSE", FEVER: "FALSE", COUGH: "FALSE", SORE_THROAT: "FALSE", CHILLS: "FALSE", MUSCLE_ACHES: "FALSE", HEADACHE: "FALSE", TASTE_SMELL_LOSS: "FALSE", ABDOMINAL_PAIN: "FALSE" };
  fName = req.body["fName"];
  lName = req.body["lName"];

  for (let value of questionnaireValues) {
    if (req.body[value] !== undefined) {
      qObject[value] = req.body[value];
      if (value === ("COVID_CONTACT") || value === ("TRAVEL_INTERNATIONAL") || value === ("FEVER") || value === ("COUGH") || value === ("SORE_THROAT") || value === ("CHILLS") || value === ("MUSCLE_ACHES") || value === ("HEADACHE") || value === ("TASTE_SMELL_LOSS") || value === ("ABDOMINAL_PAIN")) {
        qObject["QUES_RESULTS"] = "Fail";
      }
    }
  }

  try {
    database.deleteTodayQuestionnairre(qObject.EMPLOYEE_ID)
      .then(result => {
        database.addQuestionnairre(qObject)
          .then(result => {
            if (qObject.QUES_RESULTS == "Fail")
              res.render('message', { "fName": fName, "lName": lName, "employeeStatus": "CP", "hasError": false });
            else
              res.render('message', { "fName": fName, "lName": lName, "message": "", "employeeStatus": "OE", "hasError": false });

            return;

          })
          .catch(error => {
            res.render('message', {
              "message": "System error processing your request, please try again later.", "employeeStatus": "N/A", "hasError": true
            });
            return;
          })
      })
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;




