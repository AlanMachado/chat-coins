import React, { Component } from 'react';

class GroupChannel extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <li data-name={this.props.room.name} data-channel={this.props.room._id} className="list-group-item channel">
                <i className="fa fa-comment-o">
                    {this.props.room.name}
                </i>
            </li>
        )
    }
}

export default GroupChannel;