import React, { Component } from 'react';

class PersonChannel extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <li data-name={this.props.user.name} data-channel={this.props.user._id} className="list-group-item user">
                <i className="fa fa-comment-o">
                    {this.props.user.name}
                </i>
            </li>
        )
    }
}

export default PersonChannel;