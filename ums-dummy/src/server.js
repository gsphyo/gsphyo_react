const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const CryptoJS = require("crypto-js");
const app = express();

const port = 3001;
const email = "gsphyo@lguplus.co.kr";
// const password =
//   "c4420dbe113fc7d3cfc0e1126ac56e226845c6ae70cc71a4d42ad8040beeb9455bacf44b2c3921c6df362107788de80f0c22ad29426578c553e541c604f4bce0";
const password =
  "xEINvhE/x9PPwOESasVuImhFxq5wzHGk1CrYBAvuuUVbrPRLLDkhxt82IQd4jegPDCKtKUJleMVT5UHGBPS84A==";

const respLogin = {
  RT: "00000",
  RT_MSG: "Success",
  ONEID_KEY: "0000000000001",
  USER_NAME: "표경수",
  SERVICE_KEY: "0000000000001",
  LGT_TYPE: "Y",
  PW_UPDATE_DT: "YYYYMMDD",
  TOS_SERVICE_CD: "001",
  ID_TYPE: "T00"
  // email: "gsphyo@lguplus.co.kr",
  // phone: "01084001755"
};

const userInfo = {
  RT: "결과코드",
  RT_MSG: "결과메시지",
  USER_INFO: {
    ONEID_KEY: "0000000000001",
    SERVICE_KEY: "0000000000001",
    LGT_TYPE: "1",
    MBL_MAPPNG_YN: "0",
    USER_TYPE: "0",
    USER_ID: "gsphyo@lguplus.co.kr",
    CTN: "01080805468",
    NAME: "표경수",
    BIRTHDAY: "19910928",
    GENDER: "1",
    NICKNAME: "Gyungsoo",
    ENTR_NO: "0000000000001",
    ACE_NO: "0000000000001",
    IS_SMS: "0",
    IS_EMAIL: "0",
    IS_STATUS: "0",
    REG_DATE: "20200226",
    CONTC_TELNO: "01084001755",
    CABL_TELNO: "01084001755",
    CUST_NO: "0000000000001",
    ID_TYPE: "T00",
    VTID_YN: "N",
    VTID_RQST_RSN_CD: "",
    FIVEO_ENTR_NO: ""
  }
};

const callPlan = {
  RT: "결과코드",
  RT_MSG: "결과 메시지",
  PLAN_LIST: [
    {
      PLAN_CODE: "요금제 코드",
      PLAN_JOIN_YN: "요금제 가입여부"
    }
  ]
};

// const casInfo = {RESPCODE: "70", RESPMSG: "LG U+ 고객정보 없음"};
const casInfo = { RESPCODE: "00", RESPMSG: "정상", SVC_AUTH: "0|0" };

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Hello");
});

app.post("/lguclan/auth/cust/search", (req, res) => {
  // console.log(req.headers);
  res.status(200).send(userInfo);
});

app.post("/lguclan/auth/cust/login", (req, res) => {
  // const decodePassword = base64.decode(req.body.USER_PASSWORD);
  // const decodePassword = CryptoJS.enc.Utf8.stringify(req.body.USER_PASSWORD);
  const decodePassword = req.body.USER_PASSWORD;
  console.log(req.body.USER_PASSWORD);
  console.log(decodePassword);
  if (email === req.body.USER_ID) {
    if (password === decodePassword) {
      res.status(200).send(respLogin);
    } else {
      res.status(404).send("password");
    }
  } else {
    res.status(404).send("email");
  }
});

app.post("/das/svc/vas/callplan", (req, res) => {
  console.log(req.body);
  res.status(200).send(callPlan);
});

app.post("/CASINFO", (req, res) => {
  // console.log(req.headers);
  // console.log(req.body);
  res.status(200).send(casInfo);
});

app.put("/reg", (req, res) => {
  console.log(req.body);
  res.status(200).send({ result: "200", msg: "success" });
});

app.delete("/unreg", (req, res) => {
  console.log(req.body);
  res.status(200).send({ result: "200", msg: "success" });
});

app.listen(port, () => console.log(`Express Servr Listening on port ${port}`));
