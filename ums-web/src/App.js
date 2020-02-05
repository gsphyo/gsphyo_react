import React from "react";
import {CookiesProvider} from 'react-cookie';

import Main from "./components/Main";

class App extends React.Component {
    render() {
        return (
            <CookiesProvider>
                <Main />
            </CookiesProvider>
        );
    }
}

export default App;
