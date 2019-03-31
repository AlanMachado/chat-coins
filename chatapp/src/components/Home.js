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
    }

    componentDidMount() {
        socket.on('joined user', (data) => {
            this.controlRooms(data);
            console.log("joined user " + data.user);
        });

        socket.on('joined room', (data) => {
            this.controlRooms(data);
            console.log("joined room " + data.room);
        });
    }

    controlRooms = (data) => {
        this.setState({currentUser: data.user ? data : undefined, currentRoom: data.room ? data : undefined});
    }



    render() {
        return (
            <main>
                <Channels socket={socket} />
                <Chat socket={socket} currentUser={this.state.currentUser} currentRoom={this.state.currentRoom}/>
            </main>
        )
    }
}

export default Home;