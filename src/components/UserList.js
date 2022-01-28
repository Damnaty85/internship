import React, { Component } from 'react';
import { Link } from "react-router-dom";

class UserList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        };
    }
    render() {
        
        const { id, avatar_url, login, html_url } = this.props

        return (
            <div className="user">
                <div className="user__avatar">
                    <img src={avatar_url} alt={login}/>
                </div>
                <div className="user__login">{login}</div>
                <div className="user__button-wrap">
                    <a href={html_url} className="user__page" target="_blank" rel="noreferrer">User page on GitHub</a>
                    <Link to={`user/${login}`} className="user__detail">More detail </Link>
                </div>
            </div>
        );
    }
}

export default UserList;
