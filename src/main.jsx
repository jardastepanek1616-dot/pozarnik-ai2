const root = document.getElementById("root");

import("react")
  .then((React) => {
    root.innerHTML = `
      <div style="padding:40px;font-family:Arial">
        <h1>🧯 React se načetl</h1>
        <p>React modul funguje.</p>
        <p>Verze: ${React.version}</p>
      </div>
    `;
  })
  .catch((error) => {
    root.innerHTML = `
      <div style="padding:40px;font-family:Arial;color:red">
        <h1>❌ React se nenačetl</h1>
        <pre>${error.stack || error}</pre>
      </div>
    `;
  });