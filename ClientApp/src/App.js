import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "apis/auth/AuthContext";
import AppRoutes from "./AppRoutes";
import { SnackbarProvider } from "notistack";

const App = () => {
  useEffect(() => {
    document.body.style.zoom = '125%';
  }, []);

  return (
    <AuthContextProvider>
      <SnackbarProvider maxSnack={3}>
        <Routes>
          {AppRoutes.map((route, index) => {
            const { element, ...rest } = route;
            return <Route key={index} {...rest} element={element} />;
          })}
        </Routes>
      </SnackbarProvider>
    </AuthContextProvider>
  );
}

export default App;
