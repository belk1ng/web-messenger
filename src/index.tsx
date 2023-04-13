import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import "./assets/styles/fonts.scss";
import "./assets/styles/reset.scss";
import "./assets/styles/index.scss";

import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";

import AuthContextProvider from "./contexts/AuthContext";
import Loader from "./components/loader";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <AuthContextProvider>
    <BrowserRouter>
      <Suspense fallback={<Loader />}>
        <React.StrictMode>
          <Router />
        </React.StrictMode>
      </Suspense>
    </BrowserRouter>
  </AuthContextProvider>
);

reportWebVitals();
