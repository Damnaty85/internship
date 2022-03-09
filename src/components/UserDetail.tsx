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
            <section className="user-detail">
                <div className="user-detail__wrapper">
                    <div className="user-detail__left">
                        <h3>{prop.login}<span>(user id: {prop.id})</span></h3>
                        <div className="user-detail__avatar">
                            <img src={prop.avatar_url} alt=""/>
                        </div>
                    </div>
                    <div className="user-detail__right">
                        <div className="user-detail__info">
                            {prop.name && <p><span>User name: </span>{prop.name}</p>}
                            {prop.bio && <p><span>Bio: </span>{prop.bio}</p> }
                            {prop.location && <p><span>Location: </span>{prop.location}</p>}
                            <p><span>Repos created at: </span>{prop.created_at}</p>
                            <p><span>Last update: </span>{prop.updated_at}</p>
                            {prop.company && <p><span>User company: </span>{prop.company}</p>}
                            <p><span>Followers count: </span>{prop.followers}</p>
                            <p><span>Following: </span>{prop.following}</p>
                            <p><span>Public repos: </span>{prop.public_repos}</p>
                            {prop.blog && <p><span>User blog: </span><a href={prop.blog} target="_blank" rel="noreferrer"> {prop.blog}</a></p>}
                            <p><span>User page on GitHub: </span><a href={prop.html_url} target="_blank" rel="noreferrer">{prop.html_url}</a></p>
                            {prop.twitter_username && <p><span>User twitter: </span><a href={prop.twitter_username} target="_blank" rel="noreferrer">{prop.twitter_username}</a></p>}
                            {prop.email && <p><span>User email: </span><a href={prop.email} target="_blank" rel="noreferrer">${prop.email}</a></p>}
                        </div>
                    </div>
                </div>
                <button onClick={() => navigate(-1)}><span className="material-icons">arrow_circle_left</span>go back</button>
            </section>
        )
    }

export default UserDetail;