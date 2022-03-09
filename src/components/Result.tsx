import UserList from './UserList';
import { useContext } from 'react';
import { Context } from '../context';
import { IUserProps } from '../type/type';

interface IArrayProp {
    items?: IUserProps[]
}

interface IDataProps {
    data?: IArrayProp,
}

const Result = () => {
    const { data } = useContext<IDataProps>(Context);

    if (!data?.items) {
        return null;
    }

    return (
        <section className='users'>
            <h3>Your search result:</h3>
            <div className="users__list">
                {
                    data.items.map((item: IUserProps) => (
                        <UserList items={item} key={item.id} />
                    ))
                }
            </div>
        </section>
    )
}

export default Result
