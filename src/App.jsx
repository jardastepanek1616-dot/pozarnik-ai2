import { useState } from "react";

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
    <div className="app">
      <header>
        <div className="header-inner">
          <div className="logo">🧯 Požárník AI</div>
          <div className="version">React</div>
        </div>
      </header>

      <main>
        {screen === "dashboard" && <Dashboard />}
        {screen === "objects" && <Objects />}
        {screen === "stock" && <Stock />}
        {screen === "reports" && <Reports />}
        {screen === "controls" && <Controls />}
        {screen === "more" && <More />}
      </main>

      <nav>
        {menu.map(([id, icon, name]) => (
          <button
            key={id}
            className={screen === id ? "active" : ""}
            onClick={() => setScreen(id)}
          >
            <span>{icon}</span>
            <small>{name}</small>
          </button>
        ))}
      </nav>
    </div>
  );
}

function Dashboard() {
  return (
    <>
      <h1>Přehled</h1>

      <div className="card">
        <div className="row">
          <div>
            <b>Požární evidence</b>
            <div className="muted">SBD Bílina • SVJ Bílina</div>
          </div>

          <span className="badge ok">AKTIVNÍ</span>
        </div>
      </div>

      <div className="grid">
        <Stat number="50" text="objektů" />
        <Stat number="0" text="zařízení" />
        <Stat number="0" text="letos na údržbu" />
        <Stat number="0" text="letos končí životnost" />
        <Stat number="0" text="aktivních závad" />
        <Stat number="0" text="aktuálně na údržbě" />
      </div>

      <div className="card">
        <button className="primary scan">
          📷 Skenovat QR hasičáku
        </button>
        <div className="small center">
          QR kód vede vždy na konkrétní zařízení.
        </div>
      </div>

      <h2>⚠️ Co potřebuje pozornost</h2>

      <div className="alert warning">
        <b>🔧 Z-0002 — Práškový</b>
        <br />
        Bude muset na periodickou zkoušku
        <br />
        <span className="small">
          2027-03-15 • Panelový dům 127
        </span>
      </div>

      <div className="alert purple">
        <b>⏳ Z-0003 — Vodní</b>
        <br />
        Končí životnost
        <br />
        <span className="small">
          2027-04-02 • Panelový dům 129
        </span>
      </div>

      <h2>📊 Nejvíce závad</h2>

      <div className="card muted">
        Zatím žádné závady.
      </div>
    </>
  );
}

function Stat({ number, text }) {
  return (
    <div className="stat">
      <strong>{number}</strong>
      <span>{text}</span>
    </div>
  );
}

function Objects() {
  return (
    <>
      <div className="row">
        <h1>Objekty</h1>
        <button className="primary">+ Objekt</button>
      </div>

      <div className="card">
        <b>👥 Zákazníci</b>

        <div className="actions">
          <button className="primary">Všichni</button>
          <button className="light">SBD Bílina</button>
          <button className="light">SVJ Bílina</button>
        </div>
      </div>

      <input placeholder="🔎 Hledat objekt..." />

      <div className="card object">
        <div className="row">
          <div>
            <b>🏢 Panelový dům 125</b>
            <div className="muted">SBD Bílina</div>
            <div className="small">Bílina, Ulice 125</div>
          </div>

          <span className="badge ok">V POŘÁDKU</span>
        </div>

        <div className="small object-info">
          🧯 3 hasičáky • 🚒 1 hydrant
        </div>
      </div>
    </>
  );
}

function Stock() {
  return (
    <>
      <h1>📦 Sklad</h1>

      <div className="grid">
        <Stat number="3" text="hasičáků na skladě" />
        <Stat number="1" text="hasičák na údržbě" />
        <Stat number="0" text="vyřazených" />
      </div>

      <div className="card">
        <div className="row">
          <b>📦 Hasičáky na skladě</b>
          <span className="badge ok">3 ks</span>
        </div>

        <div className="stock-item">
          <b>🧯 S-00001</b>
          <div className="muted">Práškový</div>
          <div className="small">
            Výrobce: Hastex
            <br />
            Výrobní číslo: SN-81001
          </div>
        </div>

        <button className="primary">+ Přidat hasičák</button>
      </div>

      <div className="card">
        <div className="row">
          <b>🔧 Hasičáky na údržbě</b>
          <span className="badge warning">1 ks</span>
        </div>
      </div>
    </>
  );
}

function Reports() {
  return (
    <>
      <h1>📄 Zprávy</h1>

      <div className="card">
        <b>📄 Kontrolní protokoly</b>
        <p className="muted">
          Zde se ukládají protokoly vytvořené po dokončení kontrol zařízení.
        </p>
      </div>

      <div className="card muted center">
        Zatím žádný protokol.
      </div>
    </>
  );
}

function Controls() {
  return (
    <>
      <h1>📅 Kontroly</h1>

      <div className="year">
        <button>◀️</button>

        <div className="center">
          <div className="small">ROČNÍ PLÁN</div>
          <b>2027</b>
        </div>

        <button>▶️</button>
      </div>

      <div className="card">
        <div className="row">
          <div>
            <b>🟠 Duben</b>
            <div className="muted">Hlavní roční kontrola</div>
          </div>

          <b>0 / 48</b>
        </div>

        <div className="progress">
          <div style={{ width: "0%" }} />
        </div>
      </div>

      <div className="card">
        <div className="row">
          <div>
            <b>🟣 Říjen</b>
            <div className="muted">
              Přesně dva vybrané objekty
            </div>
          </div>

          <b>0 / 2</b>
        </div>

        <div className="progress">
          <div style={{ width: "0%" }} />
        </div>

        <button className="light">
          🎯 Vybrat říjnové objekty
        </button>
      </div>
    </>
  );
}

function More() {
  return (
    <>
      <h1>Více</h1>

      <div className="card">
        <b>👥 Zákazníci</b>
        <p className="muted">SBD Bílina • SVJ Bílina</p>
      </div>

      <div className="card">
        <b>📊 Statistiky</b>
        <p className="muted">
          Přehled zařízení a závad.
        </p>
      </div>

      <div className="card">
        <b>💾 Záloha</b>
        <p className="muted">
          Export nebo import celé evidence.
        </p>
      </div>
    </>
  );
}

export default App;
