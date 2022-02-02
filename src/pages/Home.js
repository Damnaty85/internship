import React, { useState } from 'react';
import Search from '../components/Search';
import Result from '../components/Result';
import useFetch from '../customHook/useFetch';

const BASE_URL = `https://api.github.com`;

export default function Home() {
    const [ responseData, setResponseData ] = useState([]);
    const [ query, setQuery ] = useState("")
    const { response } = useFetch(`${BASE_URL}/search/users?q=`, `${query}`);

    const handleChange = (evt) => {
        setQuery(evt.target.value)
    }

    const handleSearchSubmit = async (evt) => {
        evt.preventDefault();
        
        setResponseData(response)
    }

    return (
        <>
            <Search handleSearchSubmit={handleSearchSubmit} handleChange={handleChange}/>
            <Result data={responseData} />
        </>
    )
}
