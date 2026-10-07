import { useState } from "react";

const menu = [
  ["dashboard", "🏠", "Přehled"],
  ["objects", "🏢", "Objekty"],
  ["stock", "📦", "Sklad"],
  ["reports", "📄", "Zprávy"],
  ["controls", "📅", "Kontroly"],
  ["more", "•••", "Více"],
];

const objects = [
  {
    id: 1,
    name: "Panelový dům 125",
    customer: "SBD Bílina",
    address: "Bílina, Ulice 125",
    devices: 4,
    hydrants: 1,
    status: "V POŘÁDKU",
  },
  {
    id: 2,
    name: "Panelový dům 127",
    customer: "SBD Bílina",
    address: "Bílina, Ulice 127",
    devices: 6,
    hydrants: 1,
    status: "MUSÍ NA ÚDRŽBU",
  },
  {
    id: 3,
    name: "Panelový dům 129",
    customer: "SBD Bílina",
    address: "Bílina, Ulice 129",
    devices: 5,
    hydrants: 2,
    status: "PO EXPIRACI",
  },
];

const stock = [
  {
    id: "S-00001",
    type: "Práškový",
    manufacturer: "Hastex",
    serial: "SN-81001",
    from: "SBD Bílina",
  },
  {
    id: "S-00002",
    type: "Vodní",
    manufacturer: "Flamgard",
    serial: "SN-81002",
    from: "Panelový dům 125",
  },
  {
    id: "S-00003",
    type: "CO₂",
    manufacturer: "Hastex",
    serial: "SN-81003",
    from: "SBD Bílina",
  },
];

function App() {
  const [screen, setScreen] = useState("dashboard");

  return (
    <div className="app">
      <style>{styles}</style>

      <header className="header">
        <div className="logo">🧯 Požárník AI</div>
        <div className="version">React</div>
      </header>

      <main className="main">
        {screen === "dashboard" && <Dashboard />}
        {screen === "objects" && <Objects />}
        {screen === "stock" && <Stock />}
        {screen === "reports" && <Reports />}
        {screen === "controls" && <Controls />}
        {screen === "more" && <More />}
      </main>

      <nav className="nav">
        {menu.map(([id, icon, name]) => (
          <button
            key={id}
            className={screen === id ? "nav-button active" : "nav-button"}
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
        <Stat number="247" text="zařízení" />
        <Stat number="18" text="letos na údržbu" />
        <Stat number="7" text="letos končí životnost" />
        <Stat number="3" text="aktivní závady" />
        <Stat number="4" text="aktuálně na údržbě" />
      </div>

      <div className="card scan-card">
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
          15. 3. 2027 • Panelový dům 127
        </span>
      </div>

      <div className="alert purple">
        <b>⏳ Z-0003 — Vodní</b>
        <br />
        Končí životnost
        <br />
        <span className="small">
          2. 4. 2027 • Panelový dům 129
        </span>
      </div>

      <h2>📊 Nejvíce závad</h2>

      <div className="card">
        <div className="fault-row">
          <span>🔩 Poškozený plášť</span>
          <b>3×</b>
        </div>

        <div className="fault-row">
          <span>🔒 Chybí plomba</span>
          <b>2×</b>
        </div>

        <div className="fault-row">
          <span>📉 Nízký tlak</span>
          <b>1×</b>
        </div>
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
  const [customer, setCustomer] = useState("Všichni");

  const filtered =
    customer === "Všichni"
      ? objects
      : objects.filter((x) => x.customer === customer);

  return (
    <>
      <div className="row">
        <h1>Objekty</h1>
        <button className="primary">+ Objekt</button>
      </div>

      <div className="card">
        <b>👥 Zákazníci</b>

        <div className="actions">
          {["Všichni", "SBD Bílina", "SVJ Bílina"].map((x) => (
            <button
              key={x}
              className={customer === x ? "primary" : "light"}
              onClick={() => setCustomer(x)}
            >
              {x}
            </button>
          ))}
        </div>
      </div>

      <input
        className="input"
        placeholder="🔎 Hledat objekt..."
      />

      {filtered.map((object) => (
        <div className="card object" key={object.id}>
          <div className="row">
            <div>
              <b>🏢 {object.name}</b>
              <div className="muted">{object.customer}</div>
              <div className="small">{object.address}</div>
            </div>

            <span className={statusClass(object.status)}>
              {object.status}
            </span>
          </div>

          <div className="object-info">
            🧯 {object.devices} hasičáků
            <span>•</span>
            🚒 {object.hydrants} hydranty
          </div>

          <button className="light full">
            DETAIL OBJEKTU →
          </button>
        </div>
      ))}
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

        {stock.map((item) => (
          <div className="stock-item" key={item.id}>
            <div className="row">
              <b>🧯 {item.id}</b>
              <button className="light small-button">
                DETAIL
              </button>
            </div>

            <div className="muted">{item.type}</div>

            <div className="small">
              Výrobce: {item.manufacturer}
              <br />
              Výrobní číslo: {item.serial}
              <br />
              Odkud: {item.from}
            </div>

            <div className="stock-actions">
              <button className="light">🔧 Poslat na údržbu</button>
              <button className="light">🏢 Vrátit do objektu</button>
              <button className="light">🗄️ Vyřadit</button>
            </div>
          </div>
        ))}

        <button className="primary full">
          + Přidat hasičák
        </button>
      </div>

      <div className="card">
        <div className="row">
          <b>🔧 Hasičáky na údržbě</b>
          <span className="badge warning">1 ks</span>
        </div>

        <div className="stock-item">
          <b>🧯 S-00004</b>
          <div className="muted">Práškový</div>
          <div className="small">
            Výrobce: Hastex
            <br />
            Výrobní číslo: SN-81004
            <br />
            Na údržbě od: 5. 10. 2026
          </div>

          <div className="stock-actions">
            <button className="light">
              📦 Dát na sklad
            </button>
            <button className="light">
              🏢 Vrátit do objektu
            </button>
            <button className="light">
              🗄️ Vyřadit
            </button>
          </div>
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
          Protokoly vytvořené po dokončení kontrol
          zařízení.
        </p>
      </div>

      <div className="card report">
        <div className="row">
          <div>
            <b>Protokol Z-0002</b>
            <div className="small">
              Panelový dům 127
            </div>
          </div>

          <span className="badge ok">HOTOVO</span>
        </div>

        <div className="small">
          Kontrola: 5. 10. 2026
        </div>

        <button className="light full">
          📄 Otevřít protokol
        </button>
      </div>
    </>
  );
}

function Controls() {
  return (
    <>
      <h1>📅 Kontroly</h1>

      <div className="year">
        <button className="light">◀️</button>

        <div className="center">
          <div className="small">ROČNÍ PLÁN</div>
          <b className="year-number">2027</b>
        </div>

        <button className="light">▶️</button>
      </div>

      <div className="card">
        <div className="row">
          <div>
            <b>🟠 Duben</b>
            <div className="muted">
              Hlavní roční kontrola
            </div>
          </div>

          <b>0 / 48</b>
        </div>

        <div className="progress">
          <div style={{ width: "0%" }} />
        </div>

        <div className="small">
          Zbývá 48 objektů
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

        <button className="light full">
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
        <p className="muted">
          SBD Bílina • SVJ Bílina
        </p>
      </div>

      <div className="card">
        <b>📊 Statistiky</b>
        <p className="muted">
          Přehled zařízení, závad a historie.
        </p>
        <button className="light full">
          Otevřít statistiky
        </button>
      </div>

      <div className="card">
        <b>💾 Záloha</b>
        <p className="muted">
          Export nebo import celé evidence.
        </p>
        <button className="light full">
          💾 Záloha evidence
        </button>
      </div>

      <div className="card">
        <b>⚙️ Nastavení</b>
        <p className="muted">
          Nastavení aplikace a evidence.
        </p>
      </div>
    </>
  );
}

function statusClass(status) {
  if (status === "V POŘÁDKU") return "badge ok";
  if (status === "PO EXPIRACI") return "badge danger";
  return "badge warning";
}

const styles = `
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  background: #f4f6f8;
  color: #111827;
  font-family: Arial, Helvetica, sans-serif;
}

button,
input {
  font: inherit;
}

button {
  cursor: pointer;
}

.app {
  min-height: 100vh;
  padding-bottom: 82px;
}

.header {
  position: sticky;
  top: 0;
  z-index: 10;
  background: white;
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 18px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo {
  font-size: 21px;
  font-weight: 800;
}

.version {
  color: #6b7280;
  font-size: 13px;
}

.main {
  max-width: 850px;
  margin: auto;
  padding: 22px 16px;
}

h1 {
  margin: 0 0 18px;
  font-size: 28px;
}

h2 {
  font-size: 19px;
  margin: 26px 0 12px;
}

.card {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 16px;
  margin-bottom: 14px;
  box-shadow: 0 2px 8px rgba(0,0,0,.04);
}

.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 12px;
}

.muted {
  color: #6b7280;
  margin-top: 5px;
}

.small {
  font-size: 13px;
  color: #6b7280;
  line-height: 1.5;
}

.center {
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 10px;
  margin-bottom: 14px;
}

.stat {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 14px;
  padding: 15px;
}

.stat strong {
  display: block;
  font-size: 26px;
}

.stat span {
  color: #6b7280;
  font-size: 13px;
}

.badge {
  display: inline-block;
  border-radius: 999px;
  padding: 6px 9px;
  font-size: 10px;
  font-weight: 800;
  white-space: nowrap;
}

.ok {
  background: #dcfce7;
  color: #166534;
}

.warning {
  background: #fef3c7;
  color: #92400e;
}

.danger {
  background: #fee2e2;
  color: #991b1b;
}

.primary {
  background: #111827;
  color: white;
  border: 0;
  border-radius: 10px;
  padding: 11px 15px;
  font-weight: 700;
}

.light {
  background: #f3f4f6;
  color: #111827;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 10px 13px;
}

.full {
  width: 100%;
  margin-top: 12px;
}

.scan {
  width: 100%;
  font-size: 17px;
  padding: 15px;
}

.scan-card {
  padding: 14px;
}

.alert {
  border-radius: 14px;
  padding: 15px;
  margin-bottom: 10px;
}

.alert.warning {
  background: #fffbeb;
  border: 1px solid #fde68a;
}

.alert.purple {
  background: #f5f3ff;
  border: 1px solid #ddd6fe;
}

.fault-row {
  display: flex;
  justify-content: space-between;
  padding: 11px 0;
  border-bottom: 1px solid #eee;
}

.fault-row:last-child {
  border-bottom: 0;
}

.actions {
  display: flex;
  gap: 7px;
  overflow-x: auto;
  margin-top: 12px;
  padding-bottom: 2px;
}

.input {
  width: 100%;
  padding: 13px;
  border: 1px solid #d1d5db;
  border-radius: 12px;
  background: white;
  margin-bottom: 14px;
}

.object-info {
  margin-top: 14px;
  padding-top: 12px;
  border-top: 1px solid #eee;
  color: #4b5563;
  display: flex;
  gap: 8px;
}

.stock-item {
  border-top: 1px solid #eee;
  padding: 14px 0 2px;
  margin-top: 12px;
}

.stock-actions {
  display: flex;
  gap: 7px;
  flex-wrap: wrap;
  margin-top: 10px;
}

.small-button {
  padding: 7px 9px;
  font-size: 11px;
}

.year {
  background: white;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  padding: 12px;
  margin-bottom: 14px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.year-number {
  font-size: 25px;
}

.progress {
  height: 9px;
  background: #e5e7eb;
  border-radius: 99px;
  overflow: hidden;
  margin: 14px 0 8px;
}

.progress div {
  height: 100%;
  background: #111827;
  border-radius: 99px;
}

.nav {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 20;
  height: 72px;
  background: rgba(255,255,255,.97);
  border-top: 1px solid #ddd;
  display: flex;
  justify-content: space-around;
  padding: 6px 4px;
}

.nav-button {
  border: 0;
  background: transparent;
  color: #6b7280;
  min-width: 55px;
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 3px;
}

.nav-button span {
  font-size: 20px;
}

.nav-button small {
  font-size: 10px;
}

.nav-button.active {
  background: #f3f4f6;
  color: #111827;
  font-weight: 700;
}

@media (min-width: 700px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .nav {
    max-width: 850px;
    left: 50%;
    transform: translateX(-50%);
    border-radius: 18px 18px 0 0;
  }
}
`;

export default App;