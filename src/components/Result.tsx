import UserList from './UserList';
import { IUserProps } from "../type/type";

interface IArrayProp {
    items?: IUserProps[]
}

interface IDataProps {
    data: IArrayProp
}

const Result = ({data}: IDataProps) => {
    if (!data.items) {
        return null;
    }
    return (
        <div className="result">
            {
                data.items.map((item) => (
                    <UserList items={item} key={item.id} />
                ))
            }
        </div>
    )
}

export default Result
