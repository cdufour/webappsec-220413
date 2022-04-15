const express = require('express');
const res = require('express/lib/response');

const app = express();
const port = 3008;

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/cors.html');
})

app.listen(port, () => console.log('Serveur http @ ' + port));