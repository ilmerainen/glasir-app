import React from 'react';
import ReactDOM from 'react-dom';
import '@material-ui/core/CssBaseline';

import * as serviceWorker from 'src/serviceWorker';
import Layout from 'containers/Layout/Layout';
import 'assets/css/index.css';

function App() {
    return <Layout />;
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
