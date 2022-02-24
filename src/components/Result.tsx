import UserList from './UserList';
import { IUserProps } from "../type/type";

type IArrayProp = {
    items: IUserProps[]
}

interface IDataProps {
    data: IArrayProp
}

const Result: React.FC<IDataProps> = ({data}) => {
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
