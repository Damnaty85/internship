import React from 'react';
import { useNavigate } from 'react-router-dom';
import useFetch from '../customHooks/useFetch';
import { IUserProps } from "../type/type";

const BASE_URL = `https://api.github.com`;

interface IUserLoginProp {
    userLogin?: string
}

const UserDetail = ({userLogin}: IUserLoginProp) => {
    const navigate = useNavigate();
    const { response } = useFetch(`${BASE_URL}/users/`, `${userLogin}`);
    const prop: IUserProps = response;

    return (
            <div className="user-detail">
                <button onClick={() => navigate(-1)}>go back</button>
                <div className="user-detail__left">
                    <h3>{prop.login}<span>(user id: {prop.id})</span></h3>
                    <div className="user-detail__avatar">
                        <img src={prop.avatar_url} alt=""/>
                    </div>
                    {prop.name && <p><span>User name: </span>{prop.name}</p>}
                    {prop.bio && <p><span>Bio: </span>{prop.bio}</p> }
                </div>
                <div className="user-detail__right">
                    <div className="user-detail__info">
                        {prop.location && <p><span>Location: </span>{prop.location}</p>}
                        <p><span>Repos created at: </span>{prop.created_at}</p>
                        <p><span>Last update: </span>{prop.updated_at}</p>
                        {prop.company && <p><span>User company: </span>{prop.company}</p>}
                        <p><span>Followers count: </span>{prop.followers}</p>
                        <p><span>Following: </span>{prop.following}</p>
                        <p><span>Public repos: </span>{prop.public_repos}</p>
                        {prop.blog && <a href={prop.blog} target="_blank" rel="noreferrer"><span>User blog: </span> {prop.blog}</a>}
                        <a href={prop.html_url} target="_blank" rel="noreferrer"><span>User page on GitHub: </span>{prop.html_url}</a>
                        {prop.twitter_username && <a href={prop.twitter_username} target="_blank" rel="noreferrer"><span>User twitter: </span>{prop.twitter_username}</a>}
                        {prop.email && <a href={prop.email} target="_blank" rel="noreferrer"><span>User email: </span>${prop.email}</a>}
                    </div>
                </div>
            </div>
        )
    }

export default UserDetail;