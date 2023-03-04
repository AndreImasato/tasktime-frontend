import React from 'react';
import { motion } from 'framer-motion';

// MUI imports
import { Grid, Typography, Link } from '@mui/material';

// Custom components
import Copyright from 'src/components/Copyright';


const Footer = (props) => {
  return (
    <Grid
      sx={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        bgcolor: 'primary.main',
        height: "100%"
      }}
    >
      <Copyright />
    </Grid>
  )
}

export default Footer;