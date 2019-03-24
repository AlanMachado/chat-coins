import React, { Component } from 'react';
import axios from 'axios';
import GroupChannel from './GroupChannel';
import PersonChannel from './PersonChannel';
import {loadState} from "./../state/cookie";

class Channels extends Component {

    constructor() {
        super();
        this.state = {
            users: [],
            rooms: [],
            token: loadState()
        }
    }


    componentDidMount() {
        axios
            .get("http://localhost:3030/rooms")
            .then(data => {
                this.setState({rooms: data.data.rooms});
            })
            .catch(err => {
                this.setState({rooms: []});
            });

        axios
            .get("http://localhost:3030/users", { headers: { Authorization: `JWT ${this.state.token}` } })
            .then(data => {
                this.setState({users: data.data.users});
            })
            .catch(err => {
                this.setState({users: []})
            });
    }

    render() {
        return (
            <aside className="col-xs-6 col-md-2 chat-bar">
                <div className="col-xs-12 title">
                    <i className="fa fa-commenting-o"></i>
                    <h4>ChatCoins</h4>
                </div>
                <ul className="list-group channels">
                    {this.state.rooms.map((room, key) => {
                        return <GroupChannel key={room._id} room={room}/>
                    })}
                </ul>
                <ul className="list-group messages">
                    <li className="list-group-item title">
                        <h4>Mensagens</h4>
                    </li>
                    {this.state.users.map((user, key) => {
                        return <PersonChannel key={user._id} user={user}/>
                    })}
                </ul>
            </aside>
        )
    }
}

export default Channels