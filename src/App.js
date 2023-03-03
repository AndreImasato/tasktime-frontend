import Provider from 'react-redux/es/components/Provider';
import axios from 'axios';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';

import { Auth } from 'src/components';
import { Login } from 'src/pages/login';
import { Page404 } from 'src/pages/404';
import ProtectedRoute from 'src/components/ProtectedRoute'
import history from 'src/utils/@history';
import store from 'src/store';
import pageRoutes from 'src/routes';

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
        <BrowserRouter history={history}>
          <Routes>
            <Route exact path="/" element={<Login/>} />
            {pageRoutes.map((route, ix) =>
              <Route 
                key={ix}
                exact path={route.path}
                element={<ProtectedRoute/>}
              >
                <Route
                  exact path={route.path}
                  element={route.component}
                />
              </Route>
            )}
            <Route path="404" element={<Page404/>} />
            <Route path="*" element={<Navigate to="404" />} />
          </Routes>
        </BrowserRouter>
      </Auth>
    </Provider>
  );
}

export default App;
