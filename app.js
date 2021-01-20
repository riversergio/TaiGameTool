const express = require('express');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');
const morgan = require('morgan');

require('dotenv').config();


mongoose.connect('mongodb://127.0.0.1:27017/taigametool_dev',{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('error', err => console.error(err));
db.on('open', () => console.log('Database Connected!'));

const app = express();
const port = process.env.PORT || 3000;
const routes = require('./src/routes');

app.use(express.static('public'));
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());
app.use(morgan('dev'));
app.use(cookieParser());

app.set('views', './src/views');
app.set('view engine','pug');

routes(app);

app.listen(port,() => console.log('Server started on port: ' + port));