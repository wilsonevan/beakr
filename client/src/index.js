import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import './components/attendance/CalendarFlatpickr.css';
import "react-quill/dist/quill.snow.css";
import { initMiddleware } from "devise-axios";
import { transitions, positions, Provider as AlertProvider } from 'react-alert'
import FlashTemplate from './styles/AlertStyle'


initMiddleware();

ReactDOM.render(
  <AuthProvider>
    <AlertProvider template={FlashTemplate} >
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AlertProvider>
  </AuthProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
