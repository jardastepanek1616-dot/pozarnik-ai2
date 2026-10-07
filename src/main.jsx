const root = document.getElementById("root");

Promise.all([
  import("react"),
  import("react-dom/client"),
  import("./App.jsx")
])
  .then(([React, ReactDOM, AppModule]) => {
    const App = AppModule.default;

    ReactDOM.createRoot(root).render(
      React.createElement(App)
    );
  })
  .catch((error) => {
    root.innerHTML = `
      <div style="padding:40px;font-family:Arial;color:red">
        <h1>❌ React chyba</h1>
        <pre style="white-space:pre-wrap">${error.stack || error}</pre>
      </div>
    `;
  });