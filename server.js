const express = require('express');
const path = require('path');
const app = express();
const port = 3000;

app.get('/', (req, res) => {
    res.sendFile(path.join('C:/Users/HIT/Desktop/Hazart/index.html'));
})

app.listen(port, () => {
    console.log(`listening at http:/localhost:${port}`);
})