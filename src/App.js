import logo from './logo.svg';
import './App.css';
import Provider from 'react-redux/es/components/Provider';
import axios from 'axios';
import { Auth } from 'src/components';

import store from 'src/store';

/**
 * Axios HTTP request defaults
 */
const BASE_URL = process.env.REACT_APP_BACKEND_API_URL
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

function App() {
  return (
    <Provider store={store}>
      <Auth>
        <div className="App">
          <header className="App-header">
            <img src={logo} className="App-logo" alt="logo" />
            <p>
              Edit <code>src/App.js</code> and save to reload.
            </p>
            <a
              className="App-link"
              href="https://reactjs.org"
              target="_blank"
              rel="noopener noreferrer"
            >
              Learn React
            </a>
          </header>
        </div>
      </Auth>
    </Provider>
  );
}

export default App;
