import React from 'react';
import Snackbar from '@mui/material/Snackbar';
import { useSnackbar } from './SnackbarContext';
import { Alert } from '@mui/material';

function SnackbarComponent() {
  const { isOpen, snackbarMessage, hideSnackbar,snakbarType } = useSnackbar();
  return (
    <Snackbar
    open={isOpen}
    onClose={hideSnackbar}
    message={snackbarMessage}
    // sx={{"& .MuiSnackbarContent-root ":{background : "green"}}}
    
  ><Alert severity={snakbarType}>{snackbarMessage}</Alert></Snackbar>
  );
}

export default SnackbarComponent;
