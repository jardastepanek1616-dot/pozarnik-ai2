const root = document.getElementById("root");

import("./App.jsx")
  .then(() => {
    root.innerHTML = `
      <div style="padding:40px;font-family:Arial">
        <h1>🧯 Import funguje</h1>
        <p>App.jsx se načetl.</p>
      </div>
    `;
  })
  .catch((error) => {
    root.innerHTML = `
      <div style="padding:40px;font-family:Arial;color:red">
        <h1>❌ Chyba</h1>
        <pre>${error}</pre>
      </div>
    `;
  });