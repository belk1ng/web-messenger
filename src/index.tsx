import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";

import "./assets/styles/reset.scss";
import "./assets/styles/App.scss";
import "./assets/styles/index.scss";

import Router from "./routes/Router";
import { BrowserRouter } from "react-router-dom";

import Loader from "./components/loader/Loader";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);

root.render(
  <BrowserRouter>
    <Suspense fallback={<Loader />}>
      <React.StrictMode>
        <Router />
      </React.StrictMode>
    </Suspense>
  </BrowserRouter>
);

reportWebVitals();
