import React, { Component } from 'react';
import Message from './Message';

class Chat extends Component {

    constructor(props){
        super(props);
        this.state = {
            messages: [],
            username: '',
            currentUser: undefined,
            currentRoom: undefined,
        }
    }

    componentWillReceiveProps(nextProps) {
        let username = nextProps.currentUser ? nextProps.currentUser.userName : '';
        username = nextProps.currentRoom ? nextProps.currentRoom.roomName : '';

        this.setState({currentUser: nextProps.currentUser, currentRoom: nextProps.currentRoom, username: username});

    }

    sendMessage = (e) => {

        let message = e.target.value;
        if (e.which === 13 || e.keyCode === 13) {
            e.preventDefault();
            if (!message) {
                return;
            }

            if (this.state.currentUser) {
                this.props.socket.emit('message user', {
                    message,
                    user: this.state.currentUser.user
                });

            } else if (this.state.currentRoom) {

                this.props.socket.emit('message room', {
                    message,
                    room: this.state.currentRoom.room
                });

            }

            e.target.value = "";
            this.setState({ messages: this.state.messages.concat({who: 'T', message: message})});

        }
    }


    render() {
        return (
            <section className="col-xs-6 col-md-10 chat-box">
                <header className="col-xs-12 header">
                    <span className="username">{this.state.username}</span>
                    <button type="button" className="btn btn-default pull-right">Leave</button>
                </header>
                <div className="col-xs-12 conversation">
                    {this.state.messages.map((msg, key) => {
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