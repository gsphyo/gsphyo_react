import React from "react";
import ReactMarkdown from "react-markdown";
import axios from "axios";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: "",
      source: this.props.source
    };
  }
  getFile = async (src = "README") => {
    const data = await axios
      .post("http://localhost:3001/file", {
        headers: {
          "Access-Control-Allow-Origin": "*",
          source: src
        }
      })
      .then(resp => {
        this.setState({ data: resp.data });
      })
      .catch(err => {
        console.log(err);
      });
    console.log(data);
  };

  componentDidMount() {
      this.setState({source: this.props.source});
    console.log('state: ' + this.state.source);
    console.log('props: ' + this.props.source);
    this.getFile(this.state.source);
  }
  render() {
    const { data } = this.state;
    return <ReactMarkdown source={data} />;
  }
}

export default Content;
