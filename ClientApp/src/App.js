import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "apis/auth/AuthContext";
import AppRoutes from "./AppRoutes";
import { SnackbarProvider } from "notistack";

const App = () => {
  useEffect(() => {
    const handleResize = () => {
      const originalScale = window.devicePixelRatio;
      const element = document.getElementById("fb-root");
      const body = 1.25 / originalScale;
      const fb = 1 / body;

      document.body.style.zoom = `${body * 100}%`;
      element.style.zoom = `${fb * 100}%`;
    }

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => {
      window.removeEventListener("resize", handleResize);
    }
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
