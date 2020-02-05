const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const port = 3001;
const email = 'abc';
const password = '1234';

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res) => {
    res.send("Hello");
});

app.post('/login', (req, res) => {
    console.log(email);
    console.log(password);
    if(email === req.body.headers.email){
        if(password === req.body.headers.password){
            res.status(200).send('success');
        }
        else{
            res.status(404).send('password');
        }
    }
    else{
        res.status(404).send('email');
    }
})

app.listen(port, () => console.log(`Express Servr Listening on port ${port}`));