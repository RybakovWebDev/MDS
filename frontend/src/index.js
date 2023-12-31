import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import "./styles/index.css";

import App from "./App";
import { AuthContextProvider } from "./context/AuthContext";
import { WatchlistContextProvider } from "./context/WatchlistContext";

const root = createRoot(document.getElementById("root"));
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <AuthContextProvider>
        <WatchlistContextProvider>
          <App />
        </WatchlistContextProvider>
      </AuthContextProvider>
    </React.StrictMode>
  </BrowserRouter>
);
