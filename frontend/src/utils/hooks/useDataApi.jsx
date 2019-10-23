import { useEffect, useReducer } from 'react';
import axios from 'axios';

const FETCH_INIT = 'FETCH_INIT';
const FETCH_SUCCESS = 'FETCH_SUCCESS';
const FETCH_FAILURE = 'FETCH_FAILURE';
const { REACT_APP_API_HOST } = process.env;
axios.defaults.baseURL = REACT_APP_API_HOST;
const AVAILABLE_METHODS = ['GET', 'DELETE', 'HEAD', 'PUT', 'PATCH'];

const initialState = {
    rawData: null,
    isLoading: false,
    isError: false,
};

const dataFetchReducer = (state, action) => {
    switch (action.type) {
        case FETCH_INIT:
            return {
                rawData: null,
                isLoading: true,
            };
        case FETCH_SUCCESS:
            return {
                rawData: action.payload,
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

export default function useDataApi(config) {
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
        };

        fetchData();

        return function cleanup() {
            ignore = true;
        };
    }, [config.url, config.method, config.data]);

    return state;
}
