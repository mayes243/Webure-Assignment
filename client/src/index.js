import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import { store } from "./store";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <App />
        <ToastContainer
          theme="colored"
          autoClose={3000}
          limit={2}
          transition={Zoom}
          hideProgressBar={true}
          position="bottom-right"
        />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>
);
