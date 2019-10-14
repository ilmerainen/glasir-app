import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import * as serviceWorker from './serviceWorker';
import '@material-ui/core/CssBaseline';
import './assets/css/index.css';
import Layout from './containers/Layout/Layout';

function App() {
    return (
        <>
            <BrowserRouter>
                <Switch>
                    <Route exact path="/">
                        <Layout />
                    </Route>
                    <Route path="/blog">
                        <Layout />
                    </Route>
                    <Route path="/contacts">
                        <Layout />
                    </Route>
                    <Route exact path="/categories">
                        <Layout />
                    </Route>
                    <Route path="/categories/computer_science">
                        <Layout />
                    </Route>
                    <Route path="/categories/databases_big_data">
                        <Layout />
                    </Route>
                    <Route path="/categories/graphics_design">
                        <Layout />
                    </Route>
                    <Route path="/categories/hardware_diy">
                        <Layout />
                    </Route>
                    <Route path="/categories/internet_social_media">
                        <Layout />
                    </Route>
                    <Route path="/categories/networking_cloud_computing">
                        <Layout />
                    </Route>
                    <Route path="/categories/operating_systems">
                        <Layout />
                    </Route>
                    <Route path="/categories/programming">
                        <Layout />
                    </Route>
                    <Route path="/categories/programming_languages">
                        <Layout />
                    </Route>
                    <Route path="/categories/security_encryption">
                        <Layout />
                    </Route>
                    <Route path="/categories/security_encryption">
                        <Layout />
                    </Route>
                    <Route path="/categories/web_development_design">
                        <Layout />
                    </Route>
                </Switch>
            </BrowserRouter>
        </>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
