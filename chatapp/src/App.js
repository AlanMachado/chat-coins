import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link, withRouter } from "react-router-dom";
import Login from "./components/Login";
import Home from "./components/Home";
import {loadState} from "./state/cookie";

class App extends Component {

    needAuthentication = () => {
        if (loadState()) {
            return Home;
        }
        return Login;
    }


    render() {
        return (
            <Router>
                <div className="App">
                    <Route exact path="/" component={this.needAuthentication()}/>
                    <Route path="/login" component={Login}/>
                    <Route path="/home" component={Home}/>
                </div>
            </Router>
        );
    }
}

export default App;
