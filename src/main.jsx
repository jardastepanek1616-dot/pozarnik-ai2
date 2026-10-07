const root = document.getElementById("root");

Promise.all([
  import("react"),
  import("react-dom/client")
])
  .then(([React, ReactDOM]) => {
    root.innerHTML = `
      <div style="padding:40px;font-family:Arial">
        <h1>🧯 ReactDOM se načetl</h1>
        <p>React: ${React.version}</p>
        <p>ReactDOM funguje.</p>
      </div>
    `;
  })
  .catch((error) => {
    root.innerHTML = `
      <div style="padding:40px;font-family:Arial;color:red">
        <h1>❌ ReactDOM chyba</h1>
        <pre style="white-space:pre-wrap">${error.stack || error}</pre>
      </div>
    `;
  });