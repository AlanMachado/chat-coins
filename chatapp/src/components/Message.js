import React, { Component } from 'react';

class Message extends Component {


    render() {
        return (
            <div className="col-xs-12 message">
                <div className="avatar col-xs-6 col-md-1">
                    <h2>{this.props.who}</h2>
                </div>
                <p className="text col-xs-6 col-md-11">{this.props.message}</p>
            </div>
        )
    }
}

export default Message;