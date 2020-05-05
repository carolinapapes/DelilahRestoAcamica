const express = require('express');
const bodyParser = require('body-parser');
const configuration = require('./configuration.json');
const app = express();

app.use(bodyParser.json());

// rutes
const productos = require('./routes/products');
const users = require('./routes/users');
const orders = require('./routes/orders');

app.use('/', productos);
app.use('/', users);
app.use('/', orders);

app.listen(configuration.PORT, () => {
	console.log('Listening');
});
