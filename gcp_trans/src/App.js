import React from "react";
import "./App.css";
import Content from "./components/Content";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      fileName: ""
    };
  }
  sendFileName = name => {
    this.setState({ fileName: name });
  };
  render() {
    const { fileName } = this.state;
    console.log(fileName);
    return (
      <div>
        <h1>
          <button onClick={this.sendFileName.bind(this, "Chapter_1")}>
            Chapter 1
          </button>
        </h1>
        <Content source={fileName} />
      </div>
    );
  }
}

export default App;
