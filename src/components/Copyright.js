import React from 'react';

// MUI imports
import { Typography, Link } from '@mui/material';

const Copyright = (props) => {
  return (
    <Typography variant="body2" color="primary.contrastText" align="center" {...props}>
      © {new Date().getFullYear()}{' '}
      <Link color="inherit" href="https://github.com/AndreImasato" sx={{ textDecoration: "none" }}>
        André Imasato
      </Link>
    </Typography>
  )
}

export default Copyright;