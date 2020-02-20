const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const base64 = require("js-base64").Base64;
const app = express();

const port = 3001;
const email = "gsphyo@lguplus.co.kr";
const password =
    "c4420dbe113fc7d3cfc0e1126ac56e226845c6ae70cc71a4d42ad8040beeb9455bacf44b2c3921c6df362107788de80f0c22ad29426578c553e541c604f4bce0";

const userInfo = {
    name: "gyungsoo",
    email: "gsphyo@lguplus.co.kr",
    phone: "01084001755"
};

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello");
});

app.post("/login", (req, res) => {
    const decodePassword = base64.decode(req.body.headers.password);
    // console.log(email);
    // console.log(password);
    // console.log(req.body.headers.password);
    // console.log(decodePassword);
    if (email === req.body.headers.email) {
        if (password === decodePassword) {
            res.status(200).send(userInfo);
        } else {
            res.status(404).send("password");
        }
    } else {
        res.status(404).send("email");
    }
});

app.post("/register", (req, res) => {
    // console.log(req.body);
    res.status(200).send("login success");
});

app.listen(port, () => console.log(`Express Servr Listening on port ${port}`));
