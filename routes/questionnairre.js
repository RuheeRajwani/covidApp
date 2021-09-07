const express = require('express');
const router = express.Router();
const questionnaireValues = ["employeeId", "vaccinated", "covidContact", "travelInternational", "fever", "cough", "soreThroat", "chills", "muscleAches", "headAche", "tasteSmellLoss", "abdominalPain"];
const questionnaire = require('../models/questionnaire');
let fName = "";
let lName = "";



/* GET home page. */
router.post('/', async function (req, res, next) {
  let qObject = { employeeId: 0, resultDate: 0, questResults: "Pass", vaccinated: false, covidContact: false, travelInternational: false, fever: false, cough: false, soreThroat: false, chills: false, muscleAches: false, headAche: false, tasteSmellLoss: false, abdominalPain: false };
  fName = req.body["fName"];
  lName = req.body["lName"];
  console.log("Request body: ", req.body);

  for (let value of questionnaireValues) {
    if (req.body[value] !== undefined) {
      if (req.body[value] === "TRUE") {
        if (value === ("covidContact") || value === ("travelInternational") || value === ("fever") || value === ("cough") || value === ("soreThroat") || value === ("chills") || value === ("muscleAches") || value === ("headAche") || value === ("tasteSmellLoss") || value === ("abdominalPain")) {
          qObject["questResults"] = "Fail";
        }
        qObject[value] = true;
      } else {
        qObject[value] = req.body[value];
      }
    }
  }

  if (qObject["questResults"] === "Pass") {
    res.render('message', { "message": "", "hasError": false, "employeeStatus": "OE", "fName": fName, "lName": lName });

  } else {
    res.render('message', { "message": "", "hasError": false, "employeeStatus": "CP", "fName": fName, "lName": lName })
  }
  //need to add date to qObject
  //qObject.resultDate=
  await questionnaire.saveQuestionnaire(qObject)
})
module.exports = router;








