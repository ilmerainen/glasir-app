import React from 'react';
import ReactDOM from 'react-dom';
import '@material-ui/core/CssBaseline';

import * as serviceWorker from 'src/serviceWorker';
import 'assets/css/index.css';
import Layout from 'containers/Layout/Layout';

function App() {
    return <Layout />;
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
