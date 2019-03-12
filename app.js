const createError = require('http-errors');
const cors = require('cors');
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const app = express();


const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const productsRouter = require('./routes/products');
const locationsRouter = require('./routes/locations');
const categoriesRouter = require('./routes/categories');
const companiesRouter = require('./routes/companies');


app.use(cors())
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());


//Routers
app.use('/api/', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/products', productsRouter);
app.use('/api/locations', locationsRouter);
app.use('/api/categories', categoriesRouter);
app.use('/api/companies', companiesRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.send({error: res.locals.error});
});

module.exports = app;
