import React from "react";
import Routes from "./Routes/index";

// Import Scss
import "./assets/scss/theme.scss";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <React.Fragment>
      <Routes />
      <ToastContainer />
    </React.Fragment>
  );
}
export default App;



