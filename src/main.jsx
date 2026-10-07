import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

const root = document.getElementById("root");

try {
  const appRoot = ReactDOM.createRoot(root);

  appRoot.render(
    <App />
  );
} catch (error) {
  root.innerHTML = `
    <div style="padding:30px;font-family:Arial;color:red">
      <h1>❌ Chyba Reactu</h1>
      <pre style="white-space:pre-wrap">${error.stack || error}</pre>
    </div>
  `;
}