import React, { Component } from 'react';

const BASE_URL = `https://api.github.com`;

class UserDetail extends Component {
    constructor() {
        super()
        this.state = {
            responseData: []
        }
    }

    componentDidMount() {
	    fetch(`${BASE_URL}/users/${this.props.userLogin}`, {
            headers: {
                'User-Agent': 'request'
            }})
            .then(response => {
			    if(response.ok) {
				    return response;
			    } throw Error(response.statusText);
		    })
		    .then( response => response.json() )
		    .then( data => {
                this.setState({
                    responseData: data
                })
		    })
		    .catch((error) => {
			    console.error('Error:', error);
		    });
    }

    render() {
        const {login, id, avatar_url, name, bio, location, created_at, updated_at, company, followers, following, public_repos, blog, html_url, twitter_username, email} = this.state.responseData;
        return (
            <div className="user-detail">
                <div className="user-detail__left">
                    <h3>{login}<span>(user id: {id})</span></h3>
                    <div className="user-detail__avatar">
                        <img src={avatar_url} alt=""/>
                    </div>
                    {name && <p><span>User name: </span>{name}</p>}
                    {bio && <p><span>Bio: </span>{bio}</p> }
                </div>
                <div className="user-detail__right">
                    <div className="user-detail__info">
                        {location && <p><span>Location: </span>{location}</p>}
                        <p><span>Repos created at: </span>{created_at}</p>
                        <p><span>Last update: </span>{updated_at}</p>
                        {company && <p><span>User company: </span>{company}</p>}
                        <p><span>Followers count: </span>{followers}</p>
                        <p><span>Following: </span>{following}</p>
                        <p><span>Public repos: </span>{public_repos}</p>
                        {blog && <a href="{blog}" target="_blank"><span>User blog: </span> {blog}</a>}
                        <a href={html_url} target="_blank" rel="noreferrer"><span>User page on GitHub: </span>{html_url}</a>
                        {twitter_username && <a href={twitter_username} target="_blank" rel="noreferrer"><span>User twitter: </span>{twitter_username}</a>}
                        {email && <a href={email} target="_blank" rel="noreferrer"><span>User email: </span>${email}</a>}
                    </div>
                </div>
            </div>
        );
    }
}

export default UserDetail;
