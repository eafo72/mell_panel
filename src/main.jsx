import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "simplebar-react/dist/simplebar.min.css";
import "flatpickr/dist/themes/light.css";
import "react-svg-map/lib/index.css";
import "../src/assets/scss/app.scss";
import { BrowserRouter } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import { Provider } from "react-redux";
import store from "./store";
import "react-toastify/dist/ReactToastify.css";

import { UserProvider } from "./pages/context/userContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <>
    <UserProvider>
      <BrowserRouter>
        <Provider store={store}>
          <App />
        </Provider>
      </BrowserRouter>
    </UserProvider>
  </>
);
