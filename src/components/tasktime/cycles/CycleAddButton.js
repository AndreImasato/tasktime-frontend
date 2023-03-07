import React from 'react';
import { motion } from 'framer-motion';
import { useDispatch } from 'react-redux';

// MUI imports
import { 
  Grid,
  Button,
  Tooltip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Reducer imports
import { setIsAdding } from 'src/store/slices/projects/cyclesSlice';

const CycleAddButton = (props) => {
  const dispatch = useDispatch();
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <Tooltip title="Adicionar novo intervalo">
        <Button 
          variant="contained"
          startIcon={<AddIcon />} 
          color="primary"
          onClick={() => {
            dispatch(setIsAdding(true));
          }}
        >
          Novo
        </Button>
      </Tooltip>
    </motion.div>
  )
}

export default CycleAddButton;