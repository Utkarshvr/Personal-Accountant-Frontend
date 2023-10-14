import { Toaster } from "react-hot-toast";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import React from "react";
import ClientFormModal from "./components/Modals/ClientFormModal.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Toaster />
    <App />
    <ClientFormModal />
  </React.StrictMode>
);
