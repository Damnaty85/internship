import React from 'react';
// import { useNavigate } from 'react-router-dom';
import useFetch from '../customHooks/useFetch';
// import { IUserProps } from "../type/type";

const BASE_URL = `https://api.github.com`;

interface UserLoginProp {
    userLogin?: string
}

const UserDetail = ({userLogin}: UserLoginProp) => {
    // const navigate = useNavigate();
    const { response } = useFetch(`${BASE_URL}/users/`, `${userLogin}`);

    return (
            <div className="user-detail">
                <p>{userLogin}</p>
                {console.log(response)}
                {/* <button onClick={() => navigate(-1)}>go back</button>
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
                        {blog && <a href={blog} target="_blank" rel="noreferrer"><span>User blog: </span> {blog}</a>}
                        <a href={html_url} target="_blank" rel="noreferrer"><span>User page on GitHub: </span>{html_url}</a>
                        {twitter_username && <a href={twitter_username} target="_blank" rel="noreferrer"><span>User twitter: </span>{twitter_username}</a>}
                        {email && <a href={email} target="_blank" rel="noreferrer"><span>User email: </span>${email}</a>}
                    </div>
                </div> */}
            </div>
        )
    }

export default UserDetail;