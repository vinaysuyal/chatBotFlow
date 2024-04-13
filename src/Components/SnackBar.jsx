import React, { useState, useEffect } from "react";
import "../Styles/Components/SnackBar.css"; // You can create your own CSS file for styling

const Snackbar = ({ message, type, onSnackBarClose, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (message) {
      setIsVisible(true);
      const timer = setTimeout(() => {
        onSnackBarClose();
        setIsVisible(false);
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [message, duration]);

  const getSnackbarClass = () => {
    switch (type) {
      case "success":
        return "snackbar success";
      case "failure":
        return "snackbar failure";
      default:
        return "snackbar";
    }
  };

  return (
    <div className={`${getSnackbarClass()} ${isVisible ? "show" : ""}`}>
      {message}
    </div>
  );
};

export default Snackbar;
