import React, { createContext, useContext, useState } from 'react';

const SnackbarContext = createContext();

export const SnackbarProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snakbarType ,setSnakbarType] = useState('success');

  const showSnackbar = (message , type) => {
    setSnackbarMessage(message);
    setIsOpen(true);
    setSnakbarType(type = 'success');
  };

  const hideSnackbar = () => {
    setIsOpen(false);
  };

  return (
    <SnackbarContext.Provider
      value={{ isOpen, snackbarMessage, showSnackbar,snakbarType, hideSnackbar }}
    >
      {children}
    </SnackbarContext.Provider>
  );
};

export const useSnackbar = () => {
  return useContext(SnackbarContext);
};
