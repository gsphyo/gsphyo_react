import React from 'react';
// import ReactMarkdownEditor from 'react-markdown-editor-lite';
// import MarkdownIt from 'markdown-it';
import axios from 'axios';
// import ReactMarkdown from 'react-markdown';
// import 'react-markdown-editor-lite/lib/index.css';
import Navigation from './components/Navigation';
import './App.css';

class App extends React.Component{
    constructor(props){
      super(props);
      this.state = {
        data: ''
      }
    }
    // mdParser = null;
    // constructor(props){
    //     super(props);
    //     this.mdParser = new MarkdownIt()
    // }
    // handleEditorChange({html, text}){
    //     console.log("handleEditorChange", html, text);
    // }
    getFile = async () => {
      const data = await axios.post('http://localhost:3001/file',{
        headers: {
          'Access-Control-Allow-Origin': '*',
          'test': 'test'
        }
      })
      .then(resp => {
        this.setState({data: resp.data})
      });
      // this.setState({ movies, isLoading: false });
      console.log(data);
    }
  
    componentDidMount(){
      this.getFile();
    }
    render(){
      // const {data} = this.state;
        return (
          <div>
            {/* <ReactMarkdownEditor
              value="test"
              renderHTML={text => this.mdParser.render(text)}
              onChange={this.handleEditorChange}
            /> */}
            {/* <ReactMarkdown
              source={data}
              skipHtml={false}
              escapeHtml={false}
              astPlugins={[parseHtml]}
              renderers={{
                code: CodeBlock,
                blockquote: BlockQouteBlock,
                inlineCode: InlineCodeBlock
              }}
            /> */}
            {/* <ReactMarkdown source={data} /> */}
            <Navigation className="nav"/>
          </div>
        );
    }
}

export default App;