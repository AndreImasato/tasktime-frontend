import React from 'react';

// MUI components
import { 
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button
} from '@mui/material'

const ConfirmationDialog = (props) => {
  const { title, description, cancelLabel, confirmLabel, handleCancelClick, handleConfirmClick, open } = props;

  return (
    <Dialog
      title={title}
      open={open}
      onClose={handleCancelClick}
      aria-labelledby="confirm-dialog-title"
      aria-describedby=''
    >
      <DialogTitle
        id="confirm-dialog-title"
        sx={{
          backgroundColor: (theme) => theme.palette.grey[100]
        }}
      >
        {title}
      </DialogTitle>
      <DialogContent 
        dividers 
        sx={{ 
          backgroundColor: (theme) => theme.palette.grey[100]
        }}
      >
        {description}
      </DialogContent>
      <DialogActions>
        <Button
          sx={{
            color: (theme) => theme.palette.error.main,
            borderColor: (theme) => theme.palette.error.main,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.error.light,
              color: (theme) => theme.palette.error.contrastText,
              borderColor: (theme) => theme.palette.error.main,
            }
          }}
          variant="outlined"
          onClick={() => handleCancelClick()}
        >
          {cancelLabel}
        </Button>
        <Button
          sx={{
            color: (theme) => theme.palette.success.main,
            borderColor: (theme) => theme.palette.success.main,
            '&:hover': {
              backgroundColor: (theme) => theme.palette.success.light,
              borderColor: (theme) => theme.palette.success.main,
              color: (theme) => theme.palette.success.contrastText
            }
          }}
          variant="outlined"
          onClick={() => handleConfirmClick()}
        >
          {confirmLabel}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

export default ConfirmationDialog;