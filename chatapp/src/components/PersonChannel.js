import React, { Component } from 'react';

class PersonChannel extends Component {

    constructor() {
        super();
    }

    joinUser = () => {
        this.props.socket.emit('join user', {
            user: this.props.user._id,
            userName: this.props.user.name
        });
    }

    render() {
        return (
            <li data-name={this.props.user.name} data-channel={this.props.user._id} onClick={this.joinUser} className="list-group-item user">
                <i className="fa fa-comment-o">
                    {this.props.user.name}
                </i>
            </li>
        )
    }
}

export default PersonChannel;