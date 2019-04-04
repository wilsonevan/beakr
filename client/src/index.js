<<<<<<< HEAD
import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { BrowserRouter, } from 'react-router-dom';
import { AuthProvider, } from './providers/AuthProvider';
import * as serviceWorker from './serviceWorker';
import 'semantic-ui-css/semantic.min.css';
import 'react-quill/dist/quill.snow.css';
import { initMiddleware } from 'devise-axios';
=======
import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./providers/AuthProvider";
import * as serviceWorker from "./serviceWorker";
import "semantic-ui-css/semantic.min.css";
import { initMiddleware } from "devise-axios";
>>>>>>> a36ec54486b8f0a5169b87bb2eed095f9b1387c1

initMiddleware();

ReactDOM.render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>,
  document.getElementById("root")
);

serviceWorker.unregister();
