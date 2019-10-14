import { useState, useEffect, useReducer } from 'react';
import axios from 'axios';

import { AVAILABLE_METHODS } from 'constants/constants';

const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';
const { REACT_APP_API_HOST } = process.env;
axios.defaults.baseURL = REACT_APP_API_HOST;

const initialState = {
    data: {},
    isLoading: false,
    isError: false,
};

const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case FETCH_INIT:
            return { ...state.data, isLoading: true };
        case FETCH_SUCCESS:
            return {
                data: {
                    hits: action.payload,
                },
                isLoading: false,
            };
        case FETCH_FAILURE:
            return {
                errorMsg: action.payload,
                isLoading: false,
                isError: true,
            };
        default:
            throw new Error('Action is not found');
    }
};

export default function useDataApi(initConfig) {
    const [config, setConfig] = useState(initConfig);
    const [state, dispatch] = useReducer(dataFetchReducer, initialState);

    if (config.method && !AVAILABLE_METHODS.includes(config.method)) {
        return new Error(`Method '${config.method}' is not available`);
    }

    useEffect(() => {
        let ignore = false;

        const fetchData = async () => {
            dispatch({ type: FETCH_INIT });

            try {
                const result = await axios(config);

                if (!ignore) {
                    dispatch({ type: FETCH_SUCCESS, payload: result.data });
                }
            } catch (e) {
                dispatch({ type: FETCH_FAILURE, payload: e.message });
            }

            await new Promise(resolve => {
                // for test loading animation
                setTimeout(() => {
                    resolve();
                }, 300);
            });
        };

        fetchData();

        return function cleanup() {
            ignore = true;
        };
    }, [config]);

    return [state, setConfig];
}
