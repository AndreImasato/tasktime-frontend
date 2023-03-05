// MUI imports
import { CssBaseline, Box } from '@mui/material';

import { Header, Footer } from 'src/components';

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
            <Box
              component="main"
              sx={{
                backgroundColor: (theme) => theme.palette.grey[100],
                flexGrow: 1,
                height: '100%',
                overflow: 'auto'
              }}
            >
              <WrappedComponent {...props} />
            </Box>
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