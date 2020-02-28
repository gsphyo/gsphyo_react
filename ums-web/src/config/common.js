// DAS URL
export const DAS_URL = "http://localhost:3001";
// export const DAS_URL = "http://34.64.159.102:8080";
export const DAS_LOGIN_URL = `${DAS_URL}/lguclan/auth/cust/login`;
export const DAS_USER_URL = `${DAS_URL}/lguclan/auth/cust/search`;

// CAS URL
export const CAS_INFO_URL = "http://localhost:3001/CASINFO";
// export const CAS_INFO_URL = "http://34.64.217.144:5000/CASINFO";

// nCAS URL
export const nCAS_REG_URL = "http://localhost:3001/reg";
export const nCAS_UNREG_URL = "http://localhost:3001/unreg";

// 공통 헤더
export const SERVICE_ID = "SERVICE_ID";
export const API_ID = "API_ID";
export const ACCESS_KEY = "ACCESS_KEY";
export const SERVICE_CD = [
  {
    id: 1,
    serviceName: "CLOUD PC",
    serviceCD: "A01"
  },
  {
    id: 2,
    serviceName: "CLOUD GAME",
    serviceCD: "A02"
  },
  {
    id: 3,
    serviceName: "UPLUS AR",
    serviceCD: "A03"
  },
  {
    id: 4,
    serviceName: "UPLUS VR",
    serviceCD: "A04"
  }
];

// 회원 정보
// 자타사 구분
export const LGT_TYPE = {
  1: "타사",
  2: "자사"
}
// 모바일 매핑 여부
export const MBL_MAPPING_YN = {
  0: "모바일 매핑 안 됨",
  1: "모바일 매핑 됨"
}
// 회원 구분
export const USER_TYPE = {
  0: "개인",
  1: "개인사업자",
  2: "법인사업자",
  3: "외국인"
}
// 성별
export const GENDER = {
  0: "미지정",
  1: "남자",
  2: "여자",
  3: "기타"
}
// 휴대폰 문자 수신 여부
export const IS_SMS = {
  0: "미수신",
  1: "수신"
}
// 이메일 수신 여부
export const IS_EMAIL = {
  0: "미수신",
  1: "수신"
}
// 회원 상태
export const IS_STATUS = {
  0: "정상",
  1: "중지"
}
// ID구분
export const ID_TYPE = {
  T00: "ONE ID",
  T01: "이메일 인증가입 ID",
  T02: "본인정보 입력가입 ID"
}
// 임시ID 여부
export const VTID_YN = {
  Y: "임시ID",
  N: "ONE ID"
}

// 부가서비스
export const CAS_RESP_INFO = {
  "09": "CTN 길이가 잘못되었습니다.",
  "10": "회원아이디가 없습니다.",
  "11": "회원번호가 없습니다.",
  "12": "CTN이 없습니다.",
  "17": "PCSNO가 없거나 불일치합니다.",
  "18": "나이 값이 없습니다.",
  "21": "AGE_YN 입력값 오류",
  "22": "법정 대리인 정보가 없습니다.",
  "25": "고객 데이터 오류",
  "26": "주민번호 or 법인번호 길이가 잘못되었습니다.",
  "27": "내부 CP 인증 오류",
  "28": "외부 CP 인증 오류",
  "31": "COMP_ID 부재 및 불일치",
  "61": "CPID 부재",
  "70": "고객 정보를 찾을 수 없습니다.",
  "71": "SKT로 번호이동된 고객입니다.",
  "72": "KT로 번호이동된 고객입니다.",
  "84": "필수 파라미터가 불일치합니다.",
  "96": "DB connection 실패",
  "97": "암호화 G/W connection 실패",
  "98": "기타 시스템 에러",
  "99": "기타 에러"
}