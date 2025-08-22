import React from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter } from "react-router-dom"
import App from "./App"
import "./index.css"

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)

console.log(import.meta.env.VITE_APP_NAME); // "MISTLLC"
console.log(import.meta.env.VITE_API_URL);  // Your backend URL 