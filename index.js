const express = require('express')
const app = express()
const port = 8888
const cors = require('cors');
const bodyParser = require("body-parser");

app.use(cors());
app.use(express.static('images'));
app.use(bodyParser.json());

app.use(express.urlencoded());
app.use(require('./api'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})