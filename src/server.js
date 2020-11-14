require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

const PORT = process.env.PORT || 5000;

// ---------- Server config ---------- // 
app.listen(PORT, () => {
    console.log(`Server run on port : ${PORT}`)
});

// ---------- DateBase config ----------- //

mongoose.connect(process.env.MONGO_DB_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});
mongoose.connection.on('connected', () => {
    console.log('Connected to database');

});
mongoose.connection.on('error', (err) => {
    console.log(`Failed to connect to database : ${err}`);
});

// ----------- Middlewares ----------- //

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
