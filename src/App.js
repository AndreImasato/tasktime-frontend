import './App.css';
import Provider from 'react-redux/es/components/Provider';
import axios from 'axios';
import { Routes, Route, BrowserRouter, Navigate } from 'react-router-dom';
import "moment/locale/pt-br";
import { SnackbarProvider } from 'notistack'

// MUI Components
import { ThemeProvider } from '@mui/material/styles';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';

import { Auth } from 'src/components';
import { Login } from 'src/pages/login';
import { Page404 } from 'src/pages/404';
import ProtectedRoute from 'src/components/ProtectedRoute'
import history from 'src/utils/@history';
import store from 'src/store';
import pageRoutes from 'src/routes';
import theme from 'src/theme';

/**
 * Axios HTTP request defaults
 */
const BASE_URL = process.env.REACT_APP_BACKEND_API_URL
axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Content-Type'] = 'application/json';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <SnackbarProvider>
          <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-br">
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
          </LocalizationProvider>
        </SnackbarProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
