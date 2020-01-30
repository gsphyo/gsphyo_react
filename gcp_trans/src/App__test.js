import React from 'react';
import ReactMarkdown from 'react-markdown';
import htmlParser from 'react-markdown/plugins/html-parser';

function App() {

  // const input = `
  // # Hello World
  // \`\`\`
  // var test;
  // \`\`\`
  // * Hello
  // `;

  const input = readFile('./docs/README.md');

  const parseHtml = htmlParser({
    processingInstructions: [{
      shouldProcessNode: (node) => node && node.name === 'span',
      processNode: () => <span style={{color: '#f00'}}/>
    }]
  });

  return (
    <ReactMarkdown
      source={input}
      skipHtml={false}
      escapeHtml={false}
      astPlugins={[parseHtml]}
      renderers={{
        code: CodeBlock,
        blockquote: BlockQouteBlock,
        inlineCode: InlineCodeBlock
      }}
    />
  );
}

function CodeBlock(props){
  return (
    <pre style={{background: '#000', color: '#fff', padding: 10}}>
      <code>
        {props.value}
      </code>
    </pre>
  )
}

function BlockQouteBlock(props){
  return (
    <div style={{border: '1px dashed #aaa', borderRadius: 10, paddingLeft: 10, margin: 5}}>
      {props.children}
    </div>
  );
}

function InlineCodeBlock(props){
  return (
    <span style={{background: '#ff0'}}>
      {props.value}
    </span>
  );
}

function readFile(url){
  fetch(url)
    .then(resp => resp.text())
    .then(text => console.log(text));
}


export default App;
