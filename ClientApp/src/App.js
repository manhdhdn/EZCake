import React, { Component } from "react";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "apis/auth/AuthContext";
import AppRoutes from "./AppRoutes";
import { SnackbarProvider } from "notistack";

export default class App extends Component {
  static displayName = App.name;

  render() {
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
}
