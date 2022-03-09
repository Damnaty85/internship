import UserList from './UserList';
import { useContext } from 'react';
import { Context } from '../context';
import { IUserProps } from '../type/type';

const Result = () => {
    const { data } = useContext<any>(Context);

    if (!data.items) {
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
