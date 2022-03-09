import { Link } from "react-router-dom";
import { IUserProps } from "../type/type";

interface IDataProps {
    items: IUserProps
}

const UserList = ({items}: IDataProps) => {
    const { avatar_url, login, html_url } = items;

    return (
        <div className="users__item">
            <div className="users__avatar">
                <img src={avatar_url} alt={login}/>
            </div>
            <div className="users__login">{login}</div>
            <div className="users__button-wrap">
                <a href={html_url} className="users__page" target="_blank" rel="noreferrer">User page on GitHub</a>
                <Link to={`user/${login}`} className="users__detail">More detail </Link>
            </div>
        </div>
    )
}

export default UserList;