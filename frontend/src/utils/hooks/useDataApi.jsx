import { useState, useEffect } from 'react';
import axios from 'axios';
import { AVAILABLE_METHODS } from '../../constants/constants';

const { REACT_APP_API_HOST } = process.env;

export default function useDataApi({
    url,
    initData,
    reqMethod = 'GET',
    reqData = null,
}) {
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState(initData);
    const method = reqMethod.toUpperCase();

    if (method && !AVAILABLE_METHODS.includes(method)) {
        return new Error(`Method '${method}' is not available`);
    }

    const instance = axios.create({
        baseURL: REACT_APP_API_HOST,
    });

    useEffect(() => {
        let ignore = false;

        async function fetchData() {
            let result;

            try {
                result = await instance({
                    method,
                    url,
                    reqData,
                });
            } catch (e) {
                setError(e.message);
                setIsLoading(false);
            }

            await new Promise(resolve => {
                // for test loading animation
                setTimeout(() => {
                    resolve();
                }, 300);
            });

            if (!ignore && !error) {
                setData(result.data);
                setIsLoading(false);
            }
        }

        fetchData();

        return function cleanup() {
            ignore = true;
        };
    }, [url, method, reqData]);

    return [data, isLoading, error];
}
