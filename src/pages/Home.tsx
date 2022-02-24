import {useState} from 'react';
import Search from '../components/Search';
import Result from '../components/Result';
import useFetch from '../customHooks/useFetch';

const BASE_URL = `https://api.github.com`;

const Home = () => {
    const [ responseData, setResponseData ] = useState<object>({});
    const [ query, setQuery ] = useState<string>("")
    const { response } = useFetch(`${BASE_URL}/search/users?q=`, `${query}`);

    const handleChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
        setQuery(evt.target.value)
    }

    const handleSearchSubmit = async (evt: React.FormEvent<SubmitEvent>) => {
        evt.preventDefault();
        setResponseData(response)
    }

    return (
        <>
            <Search handleSearchSubmit={handleSearchSubmit} handleChange={handleChange}/>
            <Result data={responseData}/>
        </>
    )
}

export default Home;
