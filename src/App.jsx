import React, { useState } from "react";

function App() {
  const [screen, setScreen] = useState("dashboard");

  return (
    <div style={{ padding: 30, fontFamily: "Arial" }}>
      <h1>🧯 Požárník AI</h1>

      <p>React komponenta funguje!</p>

      <button onClick={() => setScreen("test")}>
        Klikni
      </button>

      <p>Aktuální obrazovka: {screen}</p>
    </div>
  );
}

export default App;