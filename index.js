const express = require('express')
const app = express()
const port = 8888

app.use(express.static('images'));
app.use(express.urlencoded());
app.use(require('./api'))

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
})