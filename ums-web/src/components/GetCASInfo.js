import React, { Component } from "react";
import { Descriptions } from "antd";

class GetCASInfo extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isCasService: false
    };
  }
  componentDidMount() {
    // const userCTN = this.props.userInfo.CTN;
    // const userCTNFront = userCTN.substring(0, 3) + "0";
    // const userCTNEnd = userCTN.substring(3, 11);

    // const resultCTN = userCTNFront + userCTNEnd;
    
    // console.log(this.props);
    // console.log(resultCTN);

    // this.getCASInfo();
  }

  

  render() {
    // let isCasInfo;

    // if (isCasService) {
    //   isCasInfo = (
    //     <Descriptions.Item label="부가서비스 가입여부">
    //       부가서비스
    //     </Descriptions.Item>
    //   );
    // }
    // else{
    //   isCasInfo = (
    //     <Button >부가서비스 가입</Button>
    //   )
    // }

    return (
      <Descriptions title="부가서비스" bordered>
        {/* {isCasInfo} */}
        <Descriptions.Item label="부가서비스 가입여부">
          부가서비스
        </Descriptions.Item>
      </Descriptions>
    );
  }
}

export default GetCASInfo;
