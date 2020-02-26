import React, { Component } from "react";
import { Descriptions, Button } from "antd";

import { RESPCODE } from "../config/common";

class GetCASInfo extends Component {
  render() {
    const _casInfo = RESPCODE[this.props.casInfo];

    return (
      <div>
        <Descriptions title="부가서비스" bordered>
          <Descriptions.Item label="부가서비스 가입여부">
            {_casInfo}
          </Descriptions.Item>
        </Descriptions>
        <Button>가입</Button>
        <Button>해지</Button>
      </div>
    );
  }
}

export default GetCASInfo;
