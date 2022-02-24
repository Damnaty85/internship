import {useState} from 'react';
import Search from '../components/Search';
import Result from '../components/Result';
import useFetch from '../customHooks/useFetch';

const BASE_URL = `https://api.github.com`;

const Home = () => {
    const [ responseData, setResponseData ] = useState([]);
    const [ query, setQuery ] = useState("")
    const { response } = useFetch(`${BASE_URL}/search/users?q=`, `${query}`);

    const handleChange = (evt: any) => {
        setQuery(evt.target.value)
    }

    const handleSearchSubmit = async (evt: any) => {
        evt.preventDefault();
        setResponseData(response)
    }

    return (
        <div>
            <h1>Home</h1>
            <Search handleSearchSubmit={handleSearchSubmit} handleChange={handleChange}/>
            <Result data={responseData}/>
        </div>
    )
}

export default Home;
