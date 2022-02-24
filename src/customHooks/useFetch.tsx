import { useState, useEffect, useCallback } from "react"

const useFetch = (url: string, query: string) => {
    const [response, setResponse] = useState([])

    const fetchData = useCallback(
        async () => {
            await fetch(`${url}${query}`, {
                headers: {
                    'User-Agent': 'request'
                }})
                .then(response => {
                    if(response.ok) {
                        return response;
                    } throw Error(response.statusText);
                })
                .then( response => response.json() )
                .then( data => {
                    setResponse(data);
                })
                .catch((error) => {
                    console.error('Error:', error);
                });
        },
        [query, url],
    )

    useEffect(() => {
        if(query) {
            fetchData()
        }
    }, [fetchData, query])

    return { response };
}

export default useFetch;
