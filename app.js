const express = require('express');
const morgan = require('morgan');
const userRoutes = require('./routes/userRoute')
const userDocRoutes = require('./routes/userDocRoutes')
const errorController = require('./controllers/errorComtroller')
const ErrorUtil = require('./utils/ErrorUtil')

const app = express();

//middleware


if (process.env.NODE_ENV === 'development') {
    app.use(morgan('dev'));
}

app.use(express.json());

//routes

app.use('/api/v11/user', userRoutes);
app.use('/api/v11/Doc/user', userDocRoutes);

app.all('*', (req, res, next) => {
    const err = new ErrorUtil(`Unabale to find ${req.originalUrl}`, 404);

    next(err);

});
app.use(errorController);

module.exports = app;