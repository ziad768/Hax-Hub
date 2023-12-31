import React from 'react'
import ReactDOM from 'react-dom/client'
import  "./i18n.jsx"
import App from './App.jsx'
import 'react-toastify/dist/ReactToastify.css'
import "bootstrap/dist/css/bootstrap.min.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import './index.css'
import { CookiesProvider } from 'react-cookie'
import { Provider } from 'react-redux'
import { ToastContainer } from 'react-toastify'
import store from './Redux/Store.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
  <CookiesProvider defaultSetOptions={{ path: "/" }}>
    <Provider store={store}>
      <App />
      <ToastContainer position="top-right" autoClose={5000} />
    </Provider>
  </CookiesProvider>
</React.StrictMode>
)
