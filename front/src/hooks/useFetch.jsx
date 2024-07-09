import {useState} from "react";


function isJson(str) {
    try {
        JSON.parse(str);
        return true
    } catch (e) {
        return false;
    }
}

export function useFetch(baseUrl) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchData = async (
        url,
        method = 'GET',
        body = null,
    ) => {
        try{
            setLoading(true);
            setError(null);
            const config = {
                url: `${baseUrl}/${url}`,
                method,
                mode: 'no-cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: body || null,
            }

            const response =  config.method === 'GET' || config.method === 'DELETE' ? await fetch(config.url) : await fetch(config.url, {
                method: config.method,
                headers: config.headers,
                body: config.body,
            });

            const json = await response.json();
            console.log(json)
            setData(json);
        }catch (errorCatched) {
            console.log(errorCatched.message,' error')
            setError(isJson(errorCatched.message) ? JSON.parse(errorCatched.message) : errorCatched.message)
        }finally {
            setLoading(false);
        }
    }
    const get = (url) => fetchData(url, 'GET');
    const post = (url, body) => fetchData(url, 'POST', JSON.stringify(body))
    const put = (url, body) => fetchData(url, 'PUT', JSON.stringify(body));
    const del = (url) => fetchData(url, 'DELETE');

    return { data, loading, error, get, post, put, del };
}

