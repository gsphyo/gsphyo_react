const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const fs = require('fs');
const app = express();

const port = 3001;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("Hello");
});

app.post('/file', (req, res) => {
    console.log(req.body.headers.test);
    fs.readFile('../static/docs/Chapter_1.md', 'utf8', (err, data) =>{
        console.log(data);
        res.send(data);
    });        
})

app.listen(port, () => console.log(`Express Servr Listening on port ${port}`));