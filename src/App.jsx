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
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        color: "#111827",
        fontFamily: "Arial, Helvetica, sans-serif",
        paddingBottom: 90,
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "white",
          borderBottom: "1px solid #e5e7eb",
          padding: "16px 18px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <b style={{ fontSize: 21 }}>🧯 Požárník AI</b>
        <span style={{ color: "#6b7280", fontSize: 13 }}>React</span>
      </header>

      <main
        style={{
          maxWidth: 850,
          margin: "auto",
          padding: "22px 16px",
        }}
      >
        {screen === "dashboard" && <Dashboard />}
        {screen === "objects" && <Objects />}

        {screen !== "dashboard" && screen !== "objects" && (
          <>
            <h1>
              {menu.find((item) => item[0] === screen)?.[2]}
            </h1>

            <div
              style={{
                background: "white",
                border: "1px solid #e5e7eb",
                borderRadius: 16,
                padding: 20,
              }}
            >
              Tato část aplikace přijde na řadu za chvíli. 😎
            </div>
          </>
        )}
      </main>

      <nav
        style={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          height: 75,
          background: "rgba(255,255,255,.97)",
          borderTop: "1px solid #ddd",
          display: "flex",
          justifyContent: "space-around",
          padding: "6px 4px",
        }}
      >
        {menu.map(([id, icon, name]) => (
          <button
            key={id}
            onPointerDown={() => setScreen(id)}
            style={{
              border: 0,
              background:
                screen === id ? "#f3f4f6" : "transparent",
              color:
                screen === id ? "#111827" : "#6b7280",
              minWidth: 55,
              borderRadius: 12,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              padding: 8,
            }}
          >
            <span style={{ fontSize: 20 }}>{icon}</span>
            <small style={{ fontSize: 10 }}>{name}</small>
          </button>
        ))}
      </nav>
    </div>
  );
}

/* =========================
   PŘEHLED
========================= */

function Dashboard() {
  return (
    <>
      <h1 style={{ margin: "0 0 18px" }}>Přehled</h1>

      <div style={cardStyle}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            gap: 12,
          }}
        >
          <div>
            <b style={{ fontSize: 18 }}>
              Požární evidence
            </b>

            <div style={mutedStyle}>
              SBD Bílina • SVJ Bílina
            </div>
          </div>

          <Badge
            text="AKTIVNÍ"
            background="#dcfce7"
            color="#166534"
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: 10,
        }}
      >
        <DashboardStat number="50" text="objektů" />
        <DashboardStat number="247" text="zařízení" />
        <DashboardStat
          number="18"
          text="letos na údržbu"
        />
        <DashboardStat
          number="7"
          text="letos končí životnost"
        />
        <DashboardStat
          number="3"
          text="aktivní závady"
        />
        <DashboardStat
          number="4"
          text="aktuálně na údržbě"
        />
      </div>

      <div style={{ ...cardStyle, marginTop: 14 }}>
        <button
          style={{
            width: "100%",
            background: "#111827",
            color: "white",
            border: 0,
            borderRadius: 12,
            padding: 16,
            fontSize: 17,
            fontWeight: 700,
          }}
        >
          📷 Skenovat QR hasičáku
        </button>

        <div
          style={{
            textAlign: "center",
            color: "#6b7280",
            fontSize: 13,
            marginTop: 9,
          }}
        >
          QR kód vede vždy na konkrétní zařízení.
        </div>
      </div>

      <h2 style={{ marginTop: 28 }}>
        ⚠️ Co potřebuje pozornost
      </h2>

      <div
        style={{
          background: "#fffbeb",
          border: "1px solid #fde68a",
          borderRadius: 14,
          padding: 15,
          marginBottom: 10,
        }}
      >
        <b>🔧 Z-0002 — Práškový</b>
        <br />
        Bude muset na periodickou zkoušku
        <br />
        <span style={smallStyle}>
          15. 3. 2027 • Panelový dům 127
        </span>
      </div>

      <div
        style={{
          background: "#f5f3ff",
          border: "1px solid #ddd6fe",
          borderRadius: 14,
          padding: 15,
          marginBottom: 10,
        }}
      >
        <b>⏳ Z-0003 — Vodní</b>
        <br />
        Končí životnost
        <br />
        <span style={smallStyle}>
          2. 4. 2027 • Panelový dům 129
        </span>
      </div>

      <h2 style={{ marginTop: 28 }}>
        📊 Nejvíce závad
      </h2>

      <div style={cardStyle}>
        <FaultRow
          name="🔩 Poškozený plášť"
          count="3×"
        />

        <FaultRow
          name="🔒 Chybí plomba"
          count="2×"
        />

        <FaultRow
          name="📉 Nízký tlak"
          count="1×"
        />
      </div>
    </>
  );
}

function DashboardStat({ number, text }) {
  return (
    <div style={cardStyle}>
      <strong
        style={{
          display: "block",
          fontSize: 26,
        }}
      >
        {number}
      </strong>

      <span
        style={{
          color: "#6b7280",
          fontSize: 13,
        }}
      >
        {text}
      </span>
    </div>
  );
}

function FaultRow({ name, count }) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-between",
        padding: "11px 0",
        borderBottom: "1px solid #eee",
      }}
    >
      <span>{name}</span>
      <b>{count}</b>
    </div>
  );
}

/* =========================
   OBJEKTY
========================= */

function Objects() {
  const [customer, setCustomer] = useState("Všichni");
  const [search, setSearch] = useState("");

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
    {
      id: 4,
      name: "Panelový dům 131",
      customer: "SVJ Bílina",
      address: "Bílina, Ulice 131",
      devices: 8,
      hydrants: 1,
      status: "V POŘÁDKU",
    },
    {
      id: 5,
      name: "Panelový dům 133",
      customer: "SVJ Bílina",
      address: "Bílina, Ulice 133",
      devices: 3,
      hydrants: 2,
      status: "V POŘÁDKU",
    },
  ];

  const filteredObjects = objects.filter((object) => {
    const matchesCustomer =
      customer === "Všichni" ||
      object.customer === customer;

    const text =
      `${object.name} ${object.address} ${object.customer}`.toLowerCase();

    const matchesSearch =
      text.includes(search.toLowerCase());

    return matchesCustomer && matchesSearch;
  });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 10,
          marginBottom: 18,
        }}
      >
        <h1 style={{ margin: 0 }}>🏢 Objekty</h1>

        <button
          style={{
            background: "#111827",
            color: "white",
            border: 0,
            borderRadius: 10,
            padding: "11px 14px",
            fontWeight: 700,
          }}
        >
          + Objekt
        </button>
      </div>

      <div style={cardStyle}>
        <b>👥 Zákazníci</b>

        <div
          style={{
            display: "flex",
            gap: 8,
            overflowX: "auto",
            marginTop: 12,
          }}
        >
          {[
            "Všichni",
            "SBD Bílina",
            "SVJ Bílina",
          ].map((name) => (
            <button
              key={name}
              onPointerDown={() => setCustomer(name)}
              style={{
                background:
                  customer === name
                    ? "#111827"
                    : "#f3f4f6",
                color:
                  customer === name
                    ? "white"
                    : "#111827",
                border: "1px solid #e5e7eb",
                borderRadius: 10,
                padding: "10px 13px",
                whiteSpace: "nowrap",
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <input
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="🔎 Hledat objekt..."
        style={{
          width: "100%",
          padding: 14,
          border: "1px solid #d1d5db",
          borderRadius: 12,
          marginBottom: 14,
          fontSize: 16,
          background: "white",
        }}
      />

      {filteredObjects.map((object) => (
        <div
          key={object.id}
          style={{
            ...cardStyle,
            marginBottom: 12,
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <div>
              <b>🏢 {object.name}</b>

              <div style={mutedStyle}>
                {object.customer}
              </div>

              <div style={smallStyle}>
                {object.address}
              </div>
            </div>

            <ObjectStatus status={object.status} />
          </div>

          <div
            style={{
              borderTop: "1px solid #eee",
              marginTop: 14,
              paddingTop: 12,
              color: "#4b5563",
            }}
          >
            🧯 {object.devices} hasičáků
            {" • "}
            🚒 {object.hydrants} hydrantů
          </div>

          <button
            onPointerDown={() =>
              alert(`Detail objektu: ${object.name}`)
            }
            style={{
              width: "100%",
              marginTop: 12,
              background: "#f3f4f6",
              border: "1px solid #e5e7eb",
              borderRadius: 10,
              padding: 11,
              fontWeight: 700,
            }}
          >
            DETAIL OBJEKTU →
          </button>
        </div>
      ))}

      {filteredObjects.length === 0 && (
        <div
          style={{
            ...cardStyle,
            textAlign: "center",
            color: "#6b7280",
            padding: 25,
          }}
        >
          Žádný objekt nebyl nalezen.
        </div>
      )}
    </>
  );
}

function ObjectStatus({ status }) {
  let background = "#dcfce7";
  let color = "#166534";

  if (status === "MUSÍ NA ÚDRŽBU") {
    background = "#fef3c7";
    color = "#92400e";
  }

  if (status === "PO EXPIRACI") {
    background = "#fee2e2";
    color = "#991b1b";
  }

  return (
    <span
      style={{
        background,
        color,
        padding: "6px 9px",
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 800,
        whiteSpace: "nowrap",
        height: "fit-content",
      }}
    >
      {status}
    </span>
  );
}

/* =========================
   STYLY
========================= */

const cardStyle = {
  background: "white",
  border: "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 16,
  marginBottom: 14,
  boxShadow: "0 2px 8px rgba(0,0,0,.04)",
};

const mutedStyle = {
  color: "#6b7280",
  marginTop: 5,
};

const smallStyle = {
  color: "#6b7280",
  fontSize: 13,
  lineHeight: 1.5,
};

function Badge({ text, background, color }) {
  return (
    <span
      style={{
        background,
        color,
        padding: "6px 9px",
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 800,
        whiteSpace: "nowrap",
      }}
    >
      {text}
    </span>
  );
}

export default App;