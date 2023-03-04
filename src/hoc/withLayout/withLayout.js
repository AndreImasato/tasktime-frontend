// MUI imports
import { CssBaseline } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';

import { Header, Footer } from 'src/components';

const theme = createTheme();

const withLayout = (WrappedComponent) => {
  return (props) => {
    return (
      <>
        <CssBaseline />
        <div
          style={{
            height: "100%",
            display: "flex",
            flexDirection: "column",
            marginBottom: 0,
            width: "-webkit-fill-available"
          }}
        >
          <div
            style={{
              height: "10%"
            }}
          >
            <Header />
          </div>
          <div
            style={{
              height: "85%"
            }}
          >
            <WrappedComponent {...props} />
          </div>
          <div
            style={{
              height: "5%"
            }}
          >
            <Footer />
          </div>
        </div>
      </>
    )
  }
}

export default withLayout;