import React, { Component } from 'react';
import axios from 'axios';
import {saveState} from "./../state/cookie";

class Login extends Component {

    constructor() {
        super();
        this.state = {
            login: false,
            inputValue: '',
            passValue: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault();
        axios
            .post('http://localhost:3030/login', {
                email: this.state.inputValue,
                password: this.state.passValue
            })
            .then(result => {
                saveState(result.data.token);
                this.props.history.push('/home');

            }).catch(err => {
                console.log(err);
            });


    }

    changeUserValue = (e) => {
        this.setState({inputValue: e.target.value});
    }

    changePassValue = (e) => {
        this.setState({passValue: e.target.value});
    }

    render() {
        return (
            <div>
                <p>Login</p>
                <form onSubmit={this.handleSubmit}>
                    <input type="text" onChange={this.changeUserValue} placeholder="Username" name="username"/>
                    <input type="password" onChange={this.changePassValue} placeholder="Password" name="password"/>
                    <button type="submit" name="login">Login</button>
                </form>
            </div>
        )
    }
}

export default Login;