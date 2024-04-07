import React, { createContext, useContext, useState } from "react";
import { Alert, Snackbar } from "@mui/material";

// Create a context
const AlertContext = createContext();

// Create a custom hook to use the alert context
const useAlert = () => useContext(AlertContext);

// Provider component
const AlertProvider = ({ children }) => {
  const [alert, setAlert] = useState({
    open: false,
    type: "success",
    message: "",
  });

  const showAlert = (type, message) => {
    setAlert({ open: true, type, message });
  };

  const handleCloseAlert = () => {
    setAlert((prev) => ({ ...prev, open: false }));
  };

  return (
    <AlertContext.Provider value={{ alert, showAlert, handleCloseAlert }}>
      {children}
      <Snackbar
        open={alert.open}
        autoHideDuration={6000}
        onClose={handleCloseAlert}
      >
        <Alert
          onClose={handleCloseAlert}
          severity={alert.type}
          variant="filled"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </AlertContext.Provider>
  );
};

export { AlertProvider, useAlert };
