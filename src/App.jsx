import React, { useState } from "react";

const menu = [
  ["dashboard", "🏠", "Přehled"],
  ["objects", "🏢", "Objekty"],
  ["stock", "📦", "Sklad"],
  ["reports", "📄", "Zprávy"],
  ["controls", "📅", "Kontroly"],
  ["more", "•••", "Více"],
];

function App() {
  const [screen, setScreen] = useState("dashboard");

  return (
    <div style={{ fontFamily: "Arial", paddingBottom: 90 }}>
      <header style={{
        padding: 20,
        borderBottom: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-between"
      }}>
        <b style={{ fontSize: 22 }}>🧯 Požárník AI</b>
        <span>React</span>
      </header>

      <main style={{ padding: 20 }}>
        <h1>{screen}</h1>
        <p>Obrazovka funguje.</p>
      </main>

      <nav style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 75,
        background: "white",
        borderTop: "1px solid #ddd",
        display: "flex",
        justifyContent: "space-around"
      }}>
        {menu.map(([id, icon, name]) => (
          <button
            key={id}
            onClick={() => setScreen(id)}
            style={{
              border: 0,
              background: "transparent",
              padding: 8
            }}
          >
            <div>{icon}</div>
            <small>{name}</small>
          </button>
        ))}
      </nav>
    </div>
  );
}

export default App;