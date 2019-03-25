import React, { Component } from 'react';
import Message from './Message';
let socket = require('socket.io-client')('http://localhost:3030');

class Chat extends Component {

    constructor(){
        super();
        this.state = {
            message: []
        }
    }

    sendMessage = (e) => {
        let message = e.target.value;

        if (e.which === 13 || e.keyCode === 13) {
            if (!message) {
                return;
            }

            if (this.props.currentUser) {

                socket.emit('message user', {
                    message,
                    user: this.props.currentUser
                });

            } else {

                socket.emit('message room', {
                    message,
                    room: this.props.currentRoom
                });

            }

            this.setState({message: this.state.message.push({who: 'T', message: message})});

            //e.target.value("");
        }
    }


    render() {
        return (
            <section className="col-xs-6 col-md-10 chat-box">
                <header className="col-xs-12 header">
                    <span className="username"></span>
                    <button type="button" className="btn btn-default pull-right" id="leave">Leave</button>
                </header>
                <div className="col-xs-12 conversation">
                    {this.state.message.map((msg, key) => {
                        return <Message who={msg.who} message={msg.message}/>
                    })}
                </div>
                <div className="col-xs-12 type">
                    <form>
                        <input type="text" id="message" className="form-control" onKeyPress={this.sendMessage} name="message"
                               placeholder="Type your message here" />
                    </form>
                </div>
            </section>
        )
    }
}


export default Chat;