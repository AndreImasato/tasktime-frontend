import { Link } from 'react-router-dom';
import useBreadcrumbs from "use-react-router-breadcrumbs";

// MUI imports
import { 
  CssBaseline, 
  Box,
  Breadcrumbs,
  Typography,
} from '@mui/material';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';

// Custom imports
import { Header, Footer } from 'src/components';
import pageRoutes from 'src/routes';

const withLayout = (WrappedComponent) => {
  return (props) => {
    const breadcrumbs = useBreadcrumbs(pageRoutes);

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
              <div style={{ marginLeft: 100, marginTop: 2 }}>
                <Breadcrumbs
                  separator={
                    <Box 
                      sx={{
                        borderRadius: '50%', 
                        height: 4, 
                        width: 4,
                        backgroundColor: (theme) => theme.palette.grey[700]
                      }}
                    />
                  }
                >
                  {breadcrumbs.map((crumb, ix) => {
                    const { match, breadcrumb } = crumb;
                    if (match.pathname === '/') {
                      return null;
                    } else if (ix + 1 === breadcrumbs.length) {
                      return (
                        <Typography variant="h6" color="textPrimary">
                          {breadcrumb}
                        </Typography>
                      )
                    } else {
                      return (
                        <Link
                          key={ix}
                          to={match.pathname}
                          style={{
                            textDecoration: "none",
                          }}
                        >
                          <Typography 
                            variant="h6" 
                            sx={{
                              color: (theme) => theme.palette.grey[500],
                              '&:hover': {
                                color: (theme) => theme.palette.primary.main
                              }
                            }}
                          >
                            {breadcrumb}
                          </Typography>
                        </Link>
                      );
                    }
                  })}
                </Breadcrumbs>
              </div>
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