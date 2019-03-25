import React, { Component } from 'react';
import Channels from './Channels';
import Chat from './Chat';
let socket = require('socket.io-client')('http://localhost:3030');

class Home extends Component {

    constructor() {
        super();

        this.state = {
            currentUser: undefined,
            currentRoom: undefined
        }

        socket.on('joined user', function (data){
            this.setState({currentUser: data.user, currentRoom: undefined});
        });

        socket.on('joined room', function (data){
            this.setState({currentUser: undefined, currentRoom: data.room});
        });

    }

    render() {
        return (
            <main>
                <Channels/>
                <Chat currentUser={this.state.currentUser} currentRoom={this.state.currentRoom}/>
            </main>
        )
    }
}

export default Home;