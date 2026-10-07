import React, { useState } from "react";

const menu = [
  ["dashboard", "🏠", "Přehled"],
  ["objects", "🏢", "Objekty"],
  ["stock", "📦", "Sklad"],
  ["reports", "📄", "Zprávy"],
  ["controls", "📅", "Kontroly"],
  ["more", "•••", "Více"],
];

/* =========================
   ZÁKONNÁ PRAVIDLA
========================= */

const LEGAL_RULES = {
  VODNI: {
    name: "Vodní",
    icon: "💧",
    periodicYears: 3,
    lifeYears: 20,
  },

  PRASKOVY: {
    name: "Práškový",
    icon: "🧯",
    periodicYears: 5,
    lifeYears: 20,
  },

  CO2: {
    name: "CO₂",
    icon: "❄️",
    periodicYears: 5,
    lifeYears: 40,
  },
};

/* =========================
   VÝPOČTY
========================= */

function calculatePeriodicYear(type, lastPeriodicYear) {
  const rule = LEGAL_RULES[type];

  if (!rule || !lastPeriodicYear) {
    return null;
  }

  return Number(lastPeriodicYear) + rule.periodicYears;
}

function calculateLifeEnd(type, manufactureYear) {
  const rule = LEGAL_RULES[type];

  if (!rule || !manufactureYear) {
    return null;
  }

  return Number(manufactureYear) + rule.lifeYears;
}

/* =========================
   POMOCNÉ FUNKCE
========================= */

function formatDate(date = new Date()) {
  return date.toLocaleDateString("cs-CZ");
}

function getNextAnnualCheck(date = new Date()) {
  const next = new Date(date);
  next.setFullYear(next.getFullYear() + 1);

  return formatDate(next);
}

/* =========================
   POČÁTEČNÍ DATA
========================= */

const initialObjects = [
  {
    id: 1,
    name: "Panelový dům 125",
    customer: "SBD Bílina",
    address: "Bílina, Ulice 125",

    devices: [
      {
        id: "125001",
        type: "VODNI",
        manufacturer: "Příklad výrobce",
        serial: "125001",
        manufactureYear: 2020,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2023,
        location: "1. patro",
        position: "chodba",
        status: "V POŘÁDKU",
        history: [],
      },

      {
        id: "125002",
        type: "PRASKOVY",
        manufacturer: "Příklad výrobce",
        serial: "125002",
        manufactureYear: 2018,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2021,
        location: "2. patro",
        position: "chodba",
        status: "MUSÍ NA ÚDRŽBU",
        history: [],
      },

      {
        id: "125003",
        type: "CO2",
        manufacturer: "Příklad výrobce",
        serial: "125003",
        manufactureYear: 2024,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2024,
        location: "přízemí",
        position: "elektro rozvodna",
        status: "V POŘÁDKU",
        history: [],
      },

      {
        id: "1",
        type: "HYDRANT",
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        location: "1. patro",
        position: "chodba",
        status: "V POŘÁDKU",
        history: [],
      },
    ],
  },

  {
    id: 2,
    name: "Panelový dům 127",
    customer: "SBD Bílina",
    address: "Bílina, Ulice 127",

    devices: [
      {
        id: "127001",
        type: "PRASKOVY",
        manufacturer: "Příklad výrobce",
        serial: "127001",
        manufactureYear: 2017,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2021,
        location: "1. patro",
        position: "chodba",
        status: "MUSÍ NA ÚDRŽBU",
        history: [],
      },

      {
        id: "127002",
        type: "PRASKOVY",
        manufacturer: "Příklad výrobce",
        serial: "127002",
        manufactureYear: 2021,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2021,
        location: "2. patro",
        position: "chodba",
        status: "V POŘÁDKU",
        history: [],
      },

      {
        id: "127003",
        type: "CO2",
        manufacturer: "Příklad výrobce",
        serial: "127003",
        manufactureYear: 2019,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2024,
        location: "přízemí",
        position: "elektro rozvodna",
        status: "V POŘÁDKU",
        history: [],
      },

      {
        id: "127004",
        type: "VODNI",
        manufacturer: "Příklad výrobce",
        serial: "127004",
        manufactureYear: 2022,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2022,
        location: "3. patro",
        position: "chodba",
        status: "V POŘÁDKU",
        history: [],
      },

      {
        id: "127005",
        type: "PRASKOVY",
        manufacturer: "Příklad výrobce",
        serial: "127005",
        manufactureYear: 2016,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2021,
        location: "4. patro",
        position: "chodba",
        status: "V POŘÁDKU",
        history: [],
      },

      {
        id: "1",
        type: "HYDRANT",
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        location: "1. patro",
        position: "chodba",
        status: "V POŘÁDKU",
        history: [],
      },
    ],
  },

  {
    id: 3,
    name: "Panelový dům 129",
    customer: "SBD Bílina",
    address: "Bílina, Ulice 129",

    devices: [
      {
        id: "129001",
        type: "VODNI",
        manufacturer: "Příklad výrobce",
        serial: "129001",
        manufactureYear: 2006,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2023,
        location: "1. patro",
        position: "chodba",
        status: "PO EXPIRACI",
        history: [],
      },

      {
        id: "129002",
        type: "PRASKOVY",
        manufacturer: "Příklad výrobce",
        serial: "129002",
        manufactureYear: 2021,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2021,
        location: "2. patro",
        position: "chodba",
        status: "V POŘÁDKU",
        history: [],
      },

      {
        id: "129003",
        type: "CO2",
        manufacturer: "Příklad výrobce",
        serial: "129003",
        manufactureYear: 2020,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2025,
        location: "přízemí",
        position: "elektro rozvodna",
        status: "V POŘÁDKU",
        history: [],
      },

      {
        id: "1",
        type: "HYDRANT",
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        location: "3. patro",
        position: "chodba",
        status: "V POŘÁDKU",
        history: [],
      },

      {
        id: "2",
        type: "HYDRANT",
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        location: "4. patro",
        position: "chodba",
        status: "V POŘÁDKU",
        history: [],
      },
    ],
  },

  {
    id: 4,
    name: "Panelový dům 131",
    customer: "SVJ Bílina",
    address: "Bílina, Ulice 131",

    devices: [
      {
        id: "131001",
        type: "PRASKOVY",
        manufacturer: "Příklad výrobce",
        serial: "131001",
        manufactureYear: 2022,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2022,
        location: "1. patro",
        position: "chodba",
        status: "V POŘÁDKU",
        history: [],
      },

      {
        id: "131002",
        type: "CO2",
        manufacturer: "Příklad výrobce",
        serial: "131002",
        manufactureYear: 2023,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2023,
        location: "přízemí",
        position: "elektro rozvodna",
        status: "V POŘÁDKU",
        history: [],
      },

      {
        id: "131003",
        type: "VODNI",
        manufacturer: "Příklad výrobce",
        serial: "131003",
        manufactureYear: 2021,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2021,
        location: "2. patro",
        position: "chodba",
        status: "V POŘÁDKU",
        history: [],
      },

      {
        id: "1",
        type: "HYDRANT",
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        location: "2. patro",
        position: "chodba",
        status: "V POŘÁDKU",
        history: [],
      },
    ],
  },

  {
    id: 5,
    name: "Panelový dům 133",
    customer: "SVJ Bílina",
    address: "Bílina, Ulice 133",

    devices: [
      {
        id: "133001",
        type: "PRASKOVY",
        manufacturer: "Příklad výrobce",
        serial: "133001",
        manufactureYear: 2022,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2022,
        location: "1. patro",
        position: "chodba",
        status: "V POŘÁDKU",
        history: [],
      },

      {
        id: "133002",
        type: "VODNI",
        manufacturer: "Příklad výrobce",
        serial: "133002",
        manufactureYear: 2023,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2023,
        location: "2. patro",
        position: "chodba",
        status: "V POŘÁDKU",
        history: [],
      },

      {
        id: "1",
        type: "HYDRANT",
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        location: "2. patro",
        position: "chodba",
        status: "V POŘÁDKU",
        history: [],
      },
    ],
  },
];

/* =========================
   APLIKACE
========================= */

function App() {
  const [screen, setScreen] =
    useState("dashboard");

  const [objects, setObjects] =
    useState(initialObjects);

  const [selectedObjectId, setSelectedObjectId] =
    useState(null);

  const [selectedDeviceId, setSelectedDeviceId] =
    useState(null);

  const [showAddDevice, setShowAddDevice] =
    useState(false);

  const [showInspection, setShowInspection] =
    useState(false);

  const selectedObject =
    objects.find(
      (object) =>
        object.id === selectedObjectId
    );

  const selectedDevice =
    selectedObject?.devices.find(
      (device) =>
        device.id === selectedDeviceId
    );

  function openObject(object) {
    setSelectedObjectId(object.id);
    setSelectedDeviceId(null);
  }

  function openDevice(device) {
    setSelectedDeviceId(device.id);
  }

  function backToObjects() {
    setSelectedObjectId(null);
    setSelectedDeviceId(null);
  }

  function backToObject() {
    setSelectedDeviceId(null);
  }

  function addDevice(device) {
    setObjects((currentObjects) =>
      currentObjects.map(
        (object) => {
          if (
            object.id !== selectedObjectId
          ) {
            return object;
          }

          return {
            ...object,

            devices: [
              ...object.devices,
              device,
            ],
          };
        }
      )
    );

    setShowAddDevice(false);
  }

  function finishInspection(result) {
    const today = new Date();

    const historyItem = {
      id: Date.now(),
      date: formatDate(today),
      type: "ROČNÍ KONTROLA",
      result:
        result.faults.length > 0
          ? "ZÁVADA"
          : "V POŘÁDKU",
      faults: result.faults,
      note: result.note,
      photo: result.photo || null,
    };

    setObjects((currentObjects) =>
      currentObjects.map(
        (object) => {
          if (
            object.id !== selectedObjectId
          ) {
            return object;
          }

          return {
            ...object,

            devices:
              object.devices.map(
                (device) => {
                  if (
                    device.id !==
                    selectedDeviceId
                  ) {
                    return device;
                  }

                  const history =
                    Array.isArray(
                      device.history
                    )
                      ? device.history
                      : [];

                  return {
                    ...device,

                    lastCheck:
                      formatDate(
                        today
                      ),

                    nextCheck:
                      getNextAnnualCheck(
                        today
                      ),

                    status:
                      result.faults
                        .length > 0
                        ? "MUSÍ NA ÚDRŽBU"
                        : "V POŘÁDKU",

                    history: [
                      historyItem,
                      ...history,
                    ],
                  };
                }
              ),
          };
        }
      )
    );

    setShowInspection(false);
  }

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "#f4f6f8",
        color: "#111827",
        fontFamily:
          "Arial, Helvetica, sans-serif",
        paddingBottom: 90,
      }}
    >
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 10,
          background: "white",
          borderBottom:
            "1px solid #e5e7eb",
          padding:
            "16px 18px",
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
        }}
      >
        <b
          style={{
            fontSize: 21,
          }}
        >
          🧯 Požárník AI
        </b>

        <span
          style={{
            color: "#6b7280",
            fontSize: 13,
          }}
        >
          React
        </span>
      </header>

      <main
        style={{
          maxWidth: 850,
          margin: "auto",
          padding:
            "22px 16px",
        }}
      >
        {screen ===
          "dashboard" && (
          <Dashboard
            objects={objects}
          />
        )}

        {screen ===
          "objects" &&
          !selectedObject && (
            <Objects
              objects={objects}
              onOpenObject={
                openObject
              }
            />
          )}

        {screen ===
          "objects" &&
          selectedObject &&
          !selectedDevice && (
            <ObjectDetail
              object={
                selectedObject
              }
              onBack={
                backToObjects
              }
              onOpenDevice={
                openDevice
              }
              onAddDevice={() =>
                setShowAddDevice(
                  true
                )
              }
            />
          )}

        {screen ===
          "objects" &&
          selectedObject &&
          selectedDevice && (
            <DeviceDetail
              device={
                selectedDevice
              }
              object={
                selectedObject
              }
              onBack={
                backToObject
              }
              onInspection={() =>
                setShowInspection(
                  true
                )
              }
            />
          )}

        {screen !==
          "dashboard" &&
          screen !==
            "objects" && (
          <>
            <h1>
              {
                menu.find(
                  (item) =>
                    item[0] ===
                    screen
                )?.[2]
              }
            </h1>

            <div
              style={cardStyle}
            >
              Tato část aplikace
              přijde na řadu za
              chvíli. 😎
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
          background:
            "rgba(255,255,255,.97)",
          borderTop:
            "1px solid #ddd",
          display: "flex",
          justifyContent:
            "space-around",
          padding: "6px 4px",
        }}
      >
        {menu.map(
          ([id, icon, name]) => (
            <button
              key={id}
              onPointerDown={() => {
                setScreen(id);
                setSelectedObjectId(
                  null
                );
                setSelectedDeviceId(
                  null
                );
              }}
              style={{
                border: 0,
                background:
                  screen === id
                    ? "#f3f4f6"
                    : "transparent",
                color:
                  screen === id
                    ? "#111827"
                    : "#6b7280",
                minWidth: 55,
                borderRadius: 12,
                display: "flex",
                flexDirection:
                  "column",
                alignItems:
                  "center",
                justifyContent:
                  "center",
                gap: 3,
                padding: 8,
              }}
            >
              <span
                style={{
                  fontSize: 20,
                }}
              >
                {icon}
              </span>

              <small
                style={{
                  fontSize: 10,
                }}
              >
                {name}
              </small>
            </button>
          )
        )}
      </nav>

      {showAddDevice &&
        selectedObject && (
          <AddDeviceModal
            object={
              selectedObject
            }
            onClose={() =>
              setShowAddDevice(
                false
              )
            }
            onSave={addDevice}
          />
        )}

      {showInspection &&
        selectedObject &&
        selectedDevice && (
          <InspectionModal
            device={
              selectedDevice
            }
            onClose={() =>
              setShowInspection(
                false
              )
            }
            onSave={
              finishInspection
            }
          />
        )}
    </div>
  );
}

/* =========================
   PŘEHLED
========================= */

function Dashboard({
  objects,
}) {
  const allDevices =
    objects.flatMap(
      (object) =>
        object.devices
    );

  return (
    <>
      <h1
        style={{
          margin:
            "0 0 18px",
        }}
      >
        Přehled
      </h1>

      <div style={cardStyle}>
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            gap: 12,
          }}
        >
          <div>
            <b
              style={{
                fontSize: 18,
              }}
            >
              Požární evidence
            </b>

            <div
              style={
                mutedStyle
              }
            >
              SBD Bílina • SVJ
              Bílina
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
          gridTemplateColumns:
            "repeat(2, 1fr)",
          gap: 10,
        }}
      >
        <DashboardStat
          number={
            objects.length
          }
          text="objektů"
        />

        <DashboardStat
          number={
            allDevices.length
          }
          text="zařízení"
        />

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

      <div
        style={{
          ...cardStyle,
          marginTop: 14,
        }}
      >
        <button
          style={{
            width: "100%",
            background:
              "#111827",
            color: "white",
            border: 0,
            borderRadius: 12,
            padding: 16,
            fontSize: 17,
            fontWeight: 700,
          }}
        >
          📷 Skenovat QR
          hasičáku
        </button>

        <div
          style={{
            textAlign:
              "center",
            color:
              "#6b7280",
            fontSize: 13,
            marginTop: 9,
          }}
        >
          QR kód vede vždy
          na konkrétní
          zařízení.
        </div>
      </div>

      <h2
        style={{
          marginTop: 28,
        }}
      >
        ⚠️ Co potřebuje
        pozornost
      </h2>

      <div
        style={{
          background:
            "#fffbeb",
          border:
            "1px solid #fde68a",
          borderRadius: 14,
          padding: 15,
          marginBottom: 10,
        }}
      >
        <b>
          🔧 127002 —
          Práškový
        </b>

        <br />

        Bude muset na
        periodickou zkoušku

        <br />

        <span
          style={
            smallStyle
          }
        >
          15. 3. 2027 •
          Panelový dům 127
        </span>
      </div>

      <div
        style={{
          background:
            "#f5f3ff",
          border:
            "1px solid #ddd6fe",
          borderRadius: 14,
          padding: 15,
          marginBottom: 10,
        }}
      >
        <b>
          ⏳ 129001 —
          Vodní
        </b>

        <br />

        Končí životnost

        <br />

        <span
          style={
            smallStyle
          }
        >
          2. 4. 2027 •
          Panelový dům 129
        </span>
      </div>

      <h2
        style={{
          marginTop: 28,
        }}
      >
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

function DashboardStat({
  number,
  text,
}) {
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
          color:
            "#6b7280",
          fontSize: 13,
        }}
      >
        {text}
      </span>
    </div>
  );
}

function FaultRow({
  name,
  count,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        padding:
          "11px 0",
        borderBottom:
          "1px solid #eee",
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

function Objects({
  objects,
  onOpenObject,
}) {
  const [customer, setCustomer] =
    useState("Všichni");

  const [search, setSearch] =
    useState("");

  const filteredObjects =
    objects.filter(
      (object) => {
        const matchesCustomer =
          customer ===
            "Všichni" ||
          object.customer ===
            customer;

        const text =
          `${object.name} ${object.address} ${object.customer}`
            .toLowerCase();

        const matchesSearch =
          text.includes(
            search.toLowerCase()
          );

        return (
          matchesCustomer &&
          matchesSearch
        );
      }
    );

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems:
            "center",
          gap: 10,
          marginBottom: 18,
        }}
      >
        <h1
          style={{
            margin: 0,
          }}
        >
          🏢 Objekty
        </h1>

        <button
          style={{
            background:
              "#111827",
            color: "white",
            border: 0,
            borderRadius: 10,
            padding:
              "11px 14px",
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
            overflowX:
              "auto",
            marginTop: 12,
          }}
        >
          {[
            "Všichni",
            "SBD Bílina",
            "SVJ Bílina",
          ].map(
            (name) => (
              <button
                key={name}
                onPointerDown={() =>
                  setCustomer(
                    name
                  )
                }
                style={{
                  background:
                    customer ===
                    name
                      ? "#111827"
                      : "#f3f4f6",
                  color:
                    customer ===
                    name
                      ? "white"
                      : "#111827",
                  border:
                    "1px solid #e5e7eb",
                  borderRadius: 10,
                  padding:
                    "10px 13px",
                  whiteSpace:
                    "nowrap",
                }}
              >
                {name}
              </button>
            )
          )}
        </div>
      </div>

      <input
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
        placeholder="🔎 Hledat objekt..."
        style={{
          width: "100%",
          padding: 14,
          border:
            "1px solid #d1d5db",
          borderRadius: 12,
          marginBottom: 14,
          fontSize: 16,
          background:
            "white",
          boxSizing:
            "border-box",
        }}
      />

      {filteredObjects.map(
        (object) => {
          const extinguishers =
            object.devices.filter(
              (device) =>
                device.type !==
                "HYDRANT"
            );

          const hydrants =
            object.devices.filter(
              (device) =>
                device.type ===
                "HYDRANT"
            );

          const hasExpired =
            object.devices.some(
              (device) =>
                device.status ===
                "PO EXPIRACI"
            );

          const needsMaintenance =
            object.devices.some(
              (device) =>
                device.status ===
                "MUSÍ NA ÚDRŽBU"
            );

          let status =
            "V POŘÁDKU";

          if (hasExpired) {
            status =
              "PO EXPIRACI";
          } else if (
            needsMaintenance
          ) {
            status =
              "MUSÍ NA ÚDRŽBU";
          }

          return (
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
                  justifyContent:
                    "space-between",
                  gap: 12,
                }}
              >
                <div>
                  <b>
                    🏢{" "}
                    {
                      object.name
                    }
                  </b>

                  <div
                    style={
                      mutedStyle
                    }
                  >
                    {
                      object.customer
                    }
                  </div>

                  <div
                    style={
                      smallStyle
                    }
                  >
                    {
                      object.address
                    }
                  </div>
                </div>

                <ObjectStatus
                  status={
                    status
                  }
                />
              </div>

              <div
                style={{
                  borderTop:
                    "1px solid #eee",
                  marginTop: 14,
                  paddingTop: 12,
                  color:
                    "#4b5563",
                }}
              >
                🧯{" "}
                {
                  extinguishers.length
                }{" "}
                hasičáků
                {" • "}
                🚒{" "}
                {
                  hydrants.length
                }{" "}
                hydrantů
              </div>

              <button
                onPointerDown={() =>
                  onOpenObject(
                    object
                  )
                }
                style={{
                  width:
                    "100%",
                  marginTop: 12,
                  background:
                    "#f3f4f6",
                  border:
                    "1px solid #e5e7eb",
                  borderRadius: 10,
                  padding: 11,
                  fontWeight: 700,
                }}
              >
                DETAIL OBJEKTU →
              </button>
            </div>
          );
        }
      )}
    </>
  );
}

/* =========================
   DETAIL OBJEKTU
========================= */

function ObjectDetail({
  object,
  onBack,
  onOpenDevice,
  onAddDevice,
}) {
  const extinguishers =
    object.devices.filter(
      (device) =>
        device.type !==
        "HYDRANT"
    );

  const hydrants =
    object.devices.filter(
      (device) =>
        device.type ===
        "HYDRANT"
    );

  const hasExpired =
    object.devices.some(
      (device) =>
        device.status ===
        "PO EXPIRACI"
    );

  const needsMaintenance =
    object.devices.some(
      (device) =>
        device.status ===
        "MUSÍ NA ÚDRŽBU"
    );

  let status =
    "V POŘÁDKU";

  if (hasExpired) {
    status =
      "PO EXPIRACI";
  } else if (
    needsMaintenance
  ) {
    status =
      "MUSÍ NA ÚDRŽBU";
  }

  return (
    <>
      <button
        onPointerDown={onBack}
        style={
          backButtonStyle
        }
      >
        ← Zpět na objekty
      </button>

      <h1
        style={{
          marginTop: 12,
        }}
      >
        🏢 {object.name}
      </h1>

      <div style={cardStyle}>
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            gap: 10,
          }}
        >
          <div>
            <b>
              {
                object.customer
              }
            </b>

            <div
              style={
                mutedStyle
              }
            >
              📍{" "}
              {
                object.address
              }
            </div>
          </div>

          <ObjectStatus
            status={
              status
            }
          />
        </div>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(2, 1fr)",
          gap: 10,
        }}
      >
        <DashboardStat
          number={
            extinguishers.length
          }
          text="hasičáků"
        />

        <DashboardStat
          number={
            hydrants.length
          }
          text="hydrantů"
        />
      </div>

      <button
        onPointerDown={
          onAddDevice
        }
        style={{
          width: "100%",
          background:
            "#111827",
          color: "white",
          border: 0,
          borderRadius: 12,
          padding: 15,
          fontSize: 16,
          fontWeight: 700,
          marginTop: 18,
        }}
      >
        + Přidat zařízení
      </button>

      <h2
        style={{
          marginTop: 28,
        }}
      >
        🧯 Hasicí přístroje
      </h2>

      {extinguishers.map(
        (device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onOpen={() =>
              onOpenDevice(
                device
              )
            }
          />
        )
      )}

      <h2
        style={{
          marginTop: 28,
        }}
      >
        🚒 Hydranty
      </h2>

      {hydrants.map(
        (device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onOpen={() =>
              onOpenDevice(
                device
              )
            }
          />
        )
      )}
    </>
  );
}

/* =========================
   PŘIDÁNÍ ZAŘÍZENÍ
========================= */

function AddDeviceModal({
  object,
  onClose,
  onSave,
}) {
  const [type, setType] =
    useState("PRASKOVY");

  const [manufacturer, setManufacturer] =
    useState("");

  const [serial, setSerial] =
    useState("");

  const [manufactureYear, setManufactureYear] =
    useState("");

  const [lastPeriodicYear, setLastPeriodicYear] =
    useState("");

  const [hydrantNumber, setHydrantNumber] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [position, setPosition] =
    useState("");

  const isHydrant =
    type === "HYDRANT";

  function save() {
    if (!location.trim()) {
      alert(
        "Vyplň prosím umístění."
      );
      return;
    }

    if (!position.trim()) {
      alert(
        "Vyplň prosím pozici."
      );
      return;
    }

    if (isHydrant) {
      if (!hydrantNumber.trim()) {
        alert(
          "Vyplň prosím číslo hydrantu."
        );
        return;
      }

      if (
        !/^\d+$/.test(
          hydrantNumber.trim()
        )
      ) {
        alert(
          "Číslo hydrantu může obsahovat pouze čísla."
        );
        return;
      }

      const hydrantExists =
        object.devices.some(
          (device) =>
            device.type ===
              "HYDRANT" &&
            device.id ===
              hydrantNumber.trim()
        );

      if (hydrantExists) {
        alert(
          `Hydrant číslo ${hydrantNumber.trim()} už v tomto objektu existuje.`
        );
        return;
      }
    }

    if (
      !isHydrant &&
      !serial.trim()
    ) {
      alert(
        "Vyplň prosím výrobní číslo."
      );
      return;
    }

    if (
      !isHydrant &&
      !/^\d+$/.test(
        serial.trim()
      )
    ) {
      alert(
        "Výrobní číslo může obsahovat pouze čísla."
      );
      return;
    }

    if (
      !isHydrant &&
      object.devices.some(
        (device) =>
          device.type !==
            "HYDRANT" &&
          device.id ===
            serial.trim()
      )
    ) {
      alert(
        `Hasičák s výrobním číslem ${serial.trim()} už v tomto objektu existuje.`
      );
      return;
    }

    if (
      !isHydrant &&
      !manufactureYear
    ) {
      alert(
        "Vyplň rok výroby."
      );
      return;
    }

    if (
      !isHydrant &&
      !lastPeriodicYear
    ) {
      alert(
        "Vyplň rok poslední periodické zkoušky."
      );
      return;
    }

    const newId = isHydrant
      ? hydrantNumber.trim()
      : serial.trim();

    const newDevice = {
      id: newId,
      type,

      lastCheck: "—",
      nextCheck: "—",

      location:
        location.trim(),

      position:
        position.trim(),

      status:
        "V POŘÁDKU",

      history: [],
    };

    if (!isHydrant) {
      newDevice.manufacturer =
        manufacturer.trim();

      newDevice.serial =
        serial.trim();

      newDevice.manufactureYear =
        Number(
          manufactureYear
        );

      newDevice.lastPeriodicYear =
        Number(
          lastPeriodicYear
        );
    }

    onSave(newDevice);
  }

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background:
          "rgba(0,0,0,.45)",
        zIndex: 100,
        display: "flex",
        alignItems:
          "flex-end",
        justifyContent:
          "center",
      }}
    >
      <div
        style={{
          background:
            "white",
          width: "100%",
          maxWidth: 850,
          maxHeight:
            "90vh",
          overflowY:
            "auto",
          borderRadius:
            "20px 20px 0 0",
          padding: 20,
          boxSizing:
            "border-box",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems:
              "center",
            marginBottom: 18,
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
              }}
            >
              + Přidat zařízení
            </h2>

            <div
              style={
                mutedStyle
              }
            >
              {object.name}
            </div>
          </div>

          <button
            onPointerDown={
              onClose
            }
            style={{
              border: 0,
              background:
                "#f