import React from "react";
import axios from "axios";
import { Button } from "antd";

import { SERVICE_ID, API_ID, ACCESS_KEY, DAS_URL } from "../config/common";

function GetCallPlan({
  isLogin,
  SERVICE_CD,
  SUB_NO,
  callPlanInfo,
  successGetCallPlan
}) {
  async function getCallPlan(SERVICE_CD, SUB_NO) {
    await axios
      .post(`${DAS_URL}/svc/vas/callplan`, {
        headers: {
          "Access-Control-Allow-Origin": "*",
          SERVICE_ID: SERVICE_ID,
          API_ID: API_ID,
          ACCESS_KEY: ACCESS_KEY,
          SERVICE_CD: SERVICE_CD
        },
        body: {
          SUB_NO: SUB_NO,
          PLAN_LIST: [
            {
              PLAN_CODE: "PLAN_CODE"
            }
          ]
        }
      })
      .then(resp => {
        successGetCallPlan(resp.data.PLAN_LIST);
      })
      .catch(err => {
        console.log("err : " + err.response.data);
      });
  }

  let btnGetCallPlan;
  if (isLogin) {
    btnGetCallPlan = (
      <Button
        onClick={() => {
          getCallPlan(SERVICE_CD, SUB_NO);
        }}
      >
        요금제 조회
      </Button>
    );
  }

  return (
    <div>
      {btnGetCallPlan}
      {callPlanInfo.map(d => (
        <h1 key={d.PLAN_CODE}>{d.PLAN_CODE}</h1>
      ))}
    </div>
  );
}

export default GetCallPlan;
