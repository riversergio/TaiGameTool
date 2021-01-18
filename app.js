const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const routes = require('./src/routes');
app.use(express.urlencoded({
    extended: true
}));
app.use(express.json());

app.set('views', './src/views');
app.set('view engine','pug');

routes(app);

app.listen(port,() => console.log('Server started on port: ' + port));