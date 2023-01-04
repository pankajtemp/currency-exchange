import "./styles.css";
import React from "react";
import { Provider } from "react-redux";
import store from "./redux/store";
import HomePage from "./components/HomePage";

export default function App() {
  return (
    <Provider store={store}>
      <HomePage />
    </Provider>
  );
}
