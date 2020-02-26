// DAS URL
export const DAS_URL = "http://localhost:3001/das";

// CAS URL
// export const CAS_URL = "http://localhost:3001";
export const CAS_URL = "http://34.64.217.144:5000";

// nCAS URL

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
