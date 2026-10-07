import React, { useState } from "react";

const menu = [
  ["dashboard", "🏠", "Přehled"],
  ["objects", "🏢", "Objekty"],
  ["stock", "📦", "Sklad"],
  ["reports", "📄", "Zprávy"],
  ["controls", "📅", "Kontroly"],
  ["more", "•••", "Více"],
];
function Dashboard() {
  return (
    <>
      <h1 style={{ marginBottom: 18 }}>Přehled</h1>

      <div style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 16,
        marginBottom: 14
      }}>
        <div style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10
        }}>
          <div>
            <b style={{ fontSize: 18 }}>Požární evidence</b>
            <div style={{ color: "#6b7280", marginTop: 5 }}>
              SBD Bílina • SVJ Bílina
            </div>
          </div>

          <span style={{
            background: "#dcfce7",
            color: "#166534",
            padding: "6px 10px",
            borderRadius: 999,
            fontSize: 11,
            fontWeight: 700
          }}>
            AKTIVNÍ
          </span>
        </div>
      </div>

      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(2, 1fr)",
        gap: 10
      }}>
        <DashboardStat number="50" text="objektů" />
        <DashboardStat number="247" text="zařízení" />
        <DashboardStat number="18" text="letos na údržbu" />
        <DashboardStat number="7" text="letos končí životnost" />
        <DashboardStat number="3" text="aktivní závady" />
        <DashboardStat number="4" text="aktuálně na údržbě" />
      </div>

      <div style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 14,
        marginTop: 14
      }}>
        <button style={{
          width: "100%",
          background: "#111827",
          color: "white",
          border: 0,
          borderRadius: 12,
          padding: 16,
          fontSize: 17,
          fontWeight: 700
        }}>
          📷 Skenovat QR hasičáku
        </button>

        <div style={{
          textAlign: "center",
          color: "#6b7280",
          fontSize: 13,
          marginTop: 9
        }}>
          QR kód vede vždy na konkrétní zařízení.
        </div>
      </div>

      <h2 style={{ marginTop: 28 }}>
        ⚠️ Co potřebuje pozornost
      </h2>

      <div style={{
        background: "#fffbeb",
        border: "1px solid #fde68a",
        borderRadius: 14,
        padding: 15,
        marginBottom: 10
      }}>
        <b>🔧 Z-0002 — Práškový</b>
        <br />
        Bude muset na periodickou zkoušku
        <br />
        <span style={{ color: "#6b7280", fontSize: 13 }}>
          15. 3. 2027 • Panelový dům 127
        </span>
      </div>

      <div style={{
        background: "#f5f3ff",
        border: "1px solid #ddd6fe",
        borderRadius: 14,
        padding: 15,
        marginBottom: 10
      }}>
        <b>⏳ Z-0003 — Vodní</b>
        <br />
        Končí životnost
        <br />
        <span style={{ color: "#6b7280", fontSize: 13 }}>
          2. 4. 2027 • Panelový dům 129
        </span>
      </div>

      <h2 style={{ marginTop: 28 }}>
        📊 Nejvíce závad
      </h2>

      <div style={{
        background: "white",
        border: "1px solid #e5e7eb",
        borderRadius: 16,
        padding: 16
      }}>
        <FaultRow name="🔩 Poškozený plášť" count="3×" />
        <FaultRow name="🔒 Chybí plomba" count="2×" />
        <FaultRow name="📉 Nízký tlak" count="1×" />
      </div>
    </>
  );
}

function DashboardStat({ number, text }) {
  return (
    <div style={{
      background: "white",
      border: "1px solid #e5e7eb",
      borderRadius: 14,
      padding: 15
    }}>
      <strong style={{
        display: "block",
        fontSize: 26
      }}>
        {number}
      </strong>

      <span style={{
        color: "#6b7280",
        fontSize: 13
      }}>
        {text}
      </span>
    </div>
  );
}

function FaultRow({ name, count }) {
  return (
    <div style={{
      display: "flex",
      justifyContent: "space-between",
      padding: "11px 0",
      borderBottom: "1px solid #eee"
    }}>
      <span>{name}</span>
      <b>{count}</b>
    </div>
  );
}

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

    <main style={{ padding: 20, maxWidth: 900, margin: "auto" }}>
{screen === "dashboard" && <Dashboard />}
{screen === "objects" && <Objects />}

{screen !== "dashboard" && screen !== "objects" && (
  <>
    <h1>{menu.find((x) => x[0] === screen)?.[2]}</h1>
    <p>Tahle část aplikace přijde na řadu za chvíli. 😎</p>
  </>
)}
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