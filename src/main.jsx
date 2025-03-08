import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/auth.jsx";
import { BrowserRouter } from "react-router-dom";
import { UserProvider } from "./context/userContext.jsx";

import { GlobalProvider } from "./context/GlobalProvider.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <GlobalProvider>
      <BrowserRouter>
        <UserProvider>
          <App />
        </UserProvider>
      </BrowserRouter>
    </GlobalProvider>
  </AuthProvider>
);
