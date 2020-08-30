const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './config.env'});

process.on('uncaughtException', err => {
    console.log('UNCAUGHT EXCEPTION! Shutting down...');
    console.log(err.name, err.message);
    process.exit(1);
});

const DB = process.env.DATABASE
    .replace('<DATABASE_PASSWORD>', process.env.DATABASE_PASSWORD)
    .replace('<DATABASE_USER>', process.env.DATABASE_USER)
    .replace('<DATABASE_HOST>', process.env.DATABASE_HOST)
    .replace('<DATABASE_SCHEMA>', process.env.DATABASE_SCHEMA);

mongoose
    .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
})
    .then(() => console.log('DB connection successful!'));

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
    console.log(`Server started at ${port}`);
});

process.on('unhandledRejection', err => {
    console.log('UNHANDLED REJECTION! Shutting down...');
    console.log(err.name, err.message);
    server.close(() => process.exit(1));
});

process.on('SIGTERM', () => {
    server.close(() => {
        //
    });
})