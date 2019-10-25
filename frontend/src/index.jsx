import React from 'react';
import ReactDOM from 'react-dom';
import '@material-ui/core/CssBaseline';

import * as serviceWorker from 'src/serviceWorker';
import Layout from 'containers/Layout/Layout';
import BagContext from 'context/bagContext';
import useStateWithLocalStorage from 'utils/hooks/useStateWithLocalStorage';
import 'assets/css/index.css';

function App() {
    const [bag, setBag] = useStateWithLocalStorage('saveProducts');
    const bagContext = { bag, setBag };

    return (
        <BagContext.Provider value={bagContext}>
            <Layout />
        </BagContext.Provider>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));

serviceWorker.register();
