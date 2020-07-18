const express = require('express');
const morgan = require('morgan');
const userRoute = require('./routes/userRoutes')
const errorController = require('./controllers/errorController')
const ErrorUtil = require('./utils/ErrorUtil')

const app = express();

//middleware


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

//routes

app.use('/api/v11/user', userRoute);

app.all('*', (req, res, next) => {
    const err = new ErrorUtil(`Unabale to find ${req.originalUrl}`, 404);

    next(err);

});
app.use(errorController);

module.exports = app;