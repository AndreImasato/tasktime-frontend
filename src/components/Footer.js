import React from 'react';
import { motion } from 'framer-motion';

// MUI imports
import { Grid } from '@mui/material';

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
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Copyright />
      </motion.div>
    </Grid>
  )
}

export default Footer;