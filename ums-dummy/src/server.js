const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const base64 = require("js-base64").Base64;
const app = express();

const port = 3001;
const email = "gsphyo@lguplus.co.kr";
const password =
    "c4420dbe113fc7d3cfc0e1126ac56e226845c6ae70cc71a4d42ad8040beeb9455bacf44b2c3921c6df362107788de80f0c22ad29426578c553e541c604f4bce0";

const respLogin = {
    RT: "200",
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
		ONEID_KEY: "회원 일련번호",
		SERVICE_KEY: "서비스의 고객 Unique ID 값",
		LGT_TYPE: "자타사구분(0: 타사, 1: 자사)",
		MBL_MAPPNG_YN: "모바일매핑여부(0:모바일매핑안됨, 1:모바일매핑됨)",
		USER_TYPE: "회원구분(0:개인, 1:개인사업자, 2:법인사업자, 3:외국인)",
		USER_ID: "회원아이디",
		CTN: "CTN",
		NAME: "이름",
		BIRTHDAY: "생년월일",
		GENDER: "성별(0:미지정, 1:남자, 2:여자, 3:기타)",
		NICKNAME: "별명",
		ENTR_NO: "가입번호",
		ACE_NO: "가입계약번호",
		IS_SMS: "휴대폰 문자 수신여부(0:미수신, 1:수신)",
		IS_EMAIL: "이메일 수신여부(0:미수신, 1:수신)",
		IS_STATUS: "회원상태(0:정상, 1:중지)",
		REG_DATE: "가입일(YYYYMMDD)",
		CONTC_TELNO: "연락가능전화번호",
		CABL_TELNO: "유선전화번호",
		CUST_NO: "고객번호",
		ID_TYPE: "ID구분",
		VTID_YN: "임시ID 여부 (Y: 임시ID, N: oneID)",
		VTID_RQST_RSN_CD: "임시ID 신청 사유코드",
		FIVEO_ENTR_NO: "Five'O 가입번호"
	}
}

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => {
    res.send("Hello");
});

app.get("/getUserInfo", (req, res) => {
    console.log(req.headers);
    res.status(200).send(userInfo);
})

app.post("/login", (req, res) => {
    const decodePassword = base64.decode(req.body.body.USER_PASSWORD);
    // console.log(email);
    // console.log(password);
    console.log(req.body);
    // console.log(decodePassword);
    if (email === req.body.body.USER_ID) {
        if (password === decodePassword) {
            res.status(200).send(respLogin);
        } else {
            res.status(404).send("password");
        }
    } else {
        res.status(404).send("email");
    }
});

// app.post("/register", (req, res) => {
//     console.log(req.body);
//     res.status(200).send("login success");
// });

app.listen(port, () => console.log(`Express Servr Listening on port ${port}`));
