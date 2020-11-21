const env = require('dotenv');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');


// routes
const authRoutes = require('./routes/auth');
const adminRoutes = require('./routes/admin/auth');
const categoryRoutes = require('./routes/category');
const productRoutes = require('./routes/product');
const pageRoutes = require('./routes/admin/page');
const cartRoutes = require('./routes/cart');
const addressRoutes = require('./routes/address');
const initialDataRoutes = require('./routes/admin/initialData');



env.config();


const app = express();

const PORT = process.env.PORT || 5000;

// ---------- Server config ---------- // 
app.listen(PORT, () => {
    console.log(`Server run on port : ${PORT}`)
});

// ---------- DataBase config ----------- //

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

app.use(cors());
app.use(express.json());
app.use('/public', express.static(path.join(__dirname, 'uploads')));
app.use('/api', authRoutes);
app.use('/api', adminRoutes)
app.use('/api', categoryRoutes)
app.use('/api', productRoutes)
app.use('/api', pageRoutes)
app.use('/api', cartRoutes)
app.use('/api', addressRoutes)
app.use('/api', initialDataRoutes);




// ----------- ERRORS -----------//

app.use((req, res, next) => { //404 Not Found
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

app.use((err, req, res, next) => {
    const status = err.status || 500;
    const error = err.message || 'Error processing your request';

    res.status(status).send({
        error
    })
}); 

