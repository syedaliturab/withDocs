const dotenv = require('dotenv');
const mongoose = require('mongoose');
process.on('uncaughtException', err => {
  console.log('UNCAUGHT EXCEPTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  process.exit(1);
});


dotenv.config({
  path: './config.env',
});
const app = require('./app');

// const DB = process.env.DATABASE.replace(
//   '<password>',
//   process.env.DATABASE_PASSWORD
// );
const DB = "mongodb://localhost/withDocs"
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Database is connected');
  });

const server = app.listen(process.env.PORT || 3000, () => {
  console.log('Server is listening at ' + process.env.PORT);
});

process.on('unhandledRejection', err => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err.name, err.message);
  server.close(() => {
    process.exit(1);
  });
});
