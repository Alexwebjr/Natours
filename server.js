const mongoose = require('mongoose');

const dotenv = require('dotenv');

dotenv.config({ path: './config.env' }); //set env

const app = require('./app');

// ===============  MONGOOSE ===============  //
const DB = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD
);

mongoose.connect(DB).then((con) => console.log('DB connected!'));

// ===============  LISTENING ===============  //
const port = process.env.PORT || 8000;
const server = app.listen(port, () => {
  console.log(`App runing on port:${port}...`);
});

//Error
process.on('unhandledRejection', (err) => {
  console.log('UNHANDLED REJECTION! 💥 Shutting down...');
  console.log(err);

  //process.exit(1); //agresive
  server.close(() => {
    process.exit(1);
  });
});

//Uncaught Exceptions
process.on('uncaughtException', (err) => {
  console.log('UNHANDLED EXCEPTION! 💥 Shutting down...');
  console.log(err);

  server.close(() => {
    process.exit(1);
  });
});
