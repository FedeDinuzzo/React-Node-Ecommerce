import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import reportWebVitals from './reportWebVitals'
import { initializeApp } from "firebase/app"

const firebaseConfig = {
  apiKey: "AIzaSyCYPImaztf-kCoIYIGKhtwZjv1Z-jdc8mk",
  authDomain: "react-ecommerce-tailwind.firebaseapp.com",
  projectId: "react-ecommerce-tailwind",
  storageBucket: "react-ecommerce-tailwind.appspot.com",
  messagingSenderId: "117450974125",
  appId: "1:117450974125:web:b1627b64b66a5e26eb7724"
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <App />
  </React.StrictMode>,
)

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();