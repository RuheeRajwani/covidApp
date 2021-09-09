const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const mongoose = require('mongoose');
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const employeeRouter = require('./routes/employee');
const questionnairreRouter = require('./routes/questionnairre');
const employee = require('./models/employee');
const questionnaire = require('./models/questionnaire');
const testResult = require('./models/testResult');


require('dotenv').config();

//connect to mongo
const dbUrl = process.env.DB_URL;
mongoose.connect(dbUrl, {
  useNewUrlParser: true,
  // useCreateIndex: true,
  useUnifiedTopology: true,
  // useFindAndModify: false
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  console.log("Database connected");
})

const app = express();
// database.initialize();



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/employee', employeeRouter);
app.use('/questionnairre', questionnairreRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});
testResult.findMostRecentEmployeeTestResult('5')

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});






const port = process.env.PORT || 3001;
app.listen(port, () => {
  console.log(`SERVING ON PORT ${port}`)
})

//Start-2
module.exports = app;
