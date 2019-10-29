import React, { useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';
import '@material-ui/core/CssBaseline';

import * as serviceWorker from 'src/serviceWorker';
import Layout from 'containers/Layout/Layout';
import AppContext from 'context/AppContext';
import useStateWithLocalStorage from 'utils/hooks/useStateWithLocalStorage';
import { AUTH_TOKEN } from 'constants/constants';
import routes from 'constants/routes';
import 'assets/css/index.css';
import axios from 'axios';

const { PROFILE_ROUTE } = routes;
const SET_LOGIN = 'SET_LOGIN';
const SET_GUEST = 'SET_GUEST';
const SET_LOADING = 'SET_LOADING';
const authInitState = {};

const authReducer = (state, action) => {
    switch (action.type) {
        case SET_LOGIN:
            return {
                authData: {
                    userData: {
                        ...action.payload,
                        avatar: action.payload.files[0].path,
                    },
                    isAuth: true,
                },
                isLoading: false,
            };
        case SET_GUEST:
            return {
                authData: {
                    isAuth: false,
                },
                isLoading: false,
            };
        case SET_LOADING:
            return {
                isLoading: true,
            };
        default:
            throw Error('Action is not found');
    }
};

function App() {
    const [bag, setBag] = useStateWithLocalStorage('saveProducts');
    let appContext = { bag, setBag };
    const [authState, dispatch] = useReducer(authReducer, authInitState);
    const token = localStorage.getItem(AUTH_TOKEN);

    const handleUserLogin = userData => {
        dispatch({ type: SET_LOGIN, payload: userData });
    };

    const handleUserLogout = () => {
        dispatch({ type: SET_GUEST });
        localStorage.removeItem(AUTH_TOKEN);
        setBag({});
    };

    useEffect(() => {
        const fetchData = async () => {
            dispatch({ type: SET_LOADING });

            let rawData;

            if (token) {
                try {
                    rawData = await axios({
                        method: 'GET',
                        url: PROFILE_ROUTE,
                        headers: {
                            Authorization: token,
                        },
                    });
                } catch (err) {
                    if (err.response.status === 401) {
                        console.log(err.message);
                    }
                }

                if (rawData.status === 200) {
                    const userData = rawData.data;

                    dispatch({ type: SET_LOGIN, payload: userData });
                }
                if (rawData.status === 401) {
                    localStorage.clear(AUTH_TOKEN);
                }
            } else {
                dispatch({ type: SET_GUEST });
            }
        };

        fetchData();
    }, [token]);

    appContext = {
        ...appContext,
        authData: {
            ...authState.authData,
            handleUserLogin,
            handleUserLogout,
        },
    };

    return (
        <>
            {!authState.isLoading && authState.authData && (
                <AppContext.Provider value={appContext}>
                    <Layout />
                </AppContext.Provider>
            )}
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
