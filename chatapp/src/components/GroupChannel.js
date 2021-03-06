import React, { Component } from 'react';

class GroupChannel extends Component {

    constructor() {
        super();
    }

    joinRoom = () => {
        this.props.socket.emit('join room', {
            room: this.props.room._id,
            roomName: this.props.room.name
        });
    }

    render() {
        return (
            <li data-name={this.props.room.name} data-channel={this.props.room._id} onClick={this.joinRoom} className="list-group-item channel">
                <i className="fa fa-comment-o">
                    {this.props.room.name}
                </i>
            </li>
        )
    }
}

export default GroupChannel;