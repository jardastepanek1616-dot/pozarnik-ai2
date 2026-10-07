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

function calculatePeriodicYear(
  type,
  lastPeriodicYear
) {
  const rule = LEGAL_RULES[type];

  if (!rule || !lastPeriodicYear) {
    return null;
  }

  return (
    Number(lastPeriodicYear) +
    rule.periodicYears
  );
}

function calculateLifeEnd(
  type,
  manufactureYear
) {
  const rule = LEGAL_RULES[type];

  if (!rule || !manufactureYear) {
    return null;
  }

  return (
    Number(manufactureYear) +
    rule.lifeYears
  );
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
        id: "Z-0001",
        type: "VODNI",
        manufacturer: "Příklad výrobce",
        serial: "VN-125-001",
        manufactureYear: 2020,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2023,
        location: "1. patro",
        position: "chodba",
        status: "V POŘÁDKU",
      },

      {
        id: "Z-0002",
        type: "PRASKOVY",
        manufacturer: "Příklad výrobce",
        serial: "PR-125-002",
        manufactureYear: 2018,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2021,
        location: "2. patro",
        position: "chodba",
        status: "MUSÍ NA ÚDRŽBU",
      },

      {
        id: "Z-0003",
        type: "CO2",
        manufacturer: "Příklad výrobce",
        serial: "CO2-125-003",
        manufactureYear: 2024,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2024,
        location: "přízemí",
        position: "elektro rozvodna",
        status: "V POŘÁDKU",
      },

      {
        id: "Z-0004",
        type: "HYDRANT",
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        location: "3. patro",
        position: "chodba",
        status: "V POŘÁDKU",
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
        id: "Z-0101",
        type: "PRASKOVY",
        manufacturer: "Příklad výrobce",
        serial: "PR-127-001",
        manufactureYear: 2017,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2021,
        location: "1. patro",
        position: "chodba",
        status: "MUSÍ NA ÚDRŽBU",
      },

      {
        id: "Z-0102",
        type: "PRASKOVY",
        manufacturer: "Příklad výrobce",
        serial: "PR-127-002",
        manufactureYear: 2021,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2021,
        location: "2. patro",
        position: "chodba",
        status: "V POŘÁDKU",
      },

      {
        id: "Z-0103",
        type: "CO2",
        manufacturer: "Příklad výrobce",
        serial: "CO2-127-001",
        manufactureYear: 2019,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2024,
        location: "přízemí",
        position: "elektro rozvodna",
        status: "V POŘÁDKU",
      },

      {
        id: "Z-0104",
        type: "VODNI",
        manufacturer: "Příklad výrobce",
        serial: "VN-127-001",
        manufactureYear: 2022,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2022,
        location: "3. patro",
        position: "chodba",
        status: "V POŘÁDKU",
      },

      {
        id: "Z-0105",
        type: "PRASKOVY",
        manufacturer: "Příklad výrobce",
        serial: "PR-127-003",
        manufactureYear: 2016,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2021,
        location: "4. patro",
        position: "chodba",
        status: "V POŘÁDKU",
      },

      {
        id: "Z-0106",
        type: "HYDRANT",
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        location: "1. patro",
        position: "chodba",
        status: "V POŘÁDKU",
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
        id: "Z-0201",
        type: "VODNI",
        manufacturer: "Příklad výrobce",
        serial: "VN-129-001",
        manufactureYear: 2006,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2023,
        location: "1. patro",
        position: "chodba",
        status: "PO EXPIRACI",
      },

      {
        id: "Z-0202",
        type: "PRASKOVY",
        manufacturer: "Příklad výrobce",
        serial: "PR-129-001",
        manufactureYear: 2021,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2021,
        location: "2. patro",
        position: "chodba",
        status: "V POŘÁDKU",
      },

      {
        id: "Z-0203",
        type: "CO2",
        manufacturer: "Příklad výrobce",
        serial: "CO2-129-001",
        manufactureYear: 2020,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2025,
        location: "přízemí",
        position: "elektro rozvodna",
        status: "V POŘÁDKU",
      },

      {
        id: "Z-0204",
        type: "HYDRANT",
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        location: "3. patro",
        position: "chodba",
        status: "V POŘÁDKU",
      },

      {
        id: "Z-0205",
        type: "HYDRANT",
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        location: "4. patro",
        position: "chodba",
        status: "V POŘÁDKU",
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
        id: "Z-0301",
        type: "PRASKOVY",
        manufacturer: "Příklad výrobce",
        serial: "PR-131-001",
        manufactureYear: 2022,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2022,
        location: "1. patro",
        position: "chodba",
        status: "V POŘÁDKU",
      },

      {
        id: "Z-0302",
        type: "CO2",
        manufacturer: "Příklad výrobce",
        serial: "CO2-131-001",
        manufactureYear: 2023,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2023,
        location: "přízemí",
        position: "elektro rozvodna",
        status: "V POŘÁDKU",
      },

      {
        id: "Z-0303",
        type: "VODNI",
        manufacturer: "Příklad výrobce",
        serial: "VN-131-001",
        manufactureYear: 2021,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2021,
        location: "2. patro",
        position: "chodba",
        status: "V POŘÁDKU",
      },

      {
        id: "Z-0304",
        type: "HYDRANT",
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        location: "2. patro",
        position: "chodba",
        status: "V POŘÁDKU",
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
        id: "Z-0401",
        type: "PRASKOVY",
        manufacturer: "Příklad výrobce",
        serial: "PR-133-001",
        manufactureYear: 2022,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2022,
        location: "1. patro",
        position: "chodba",
        status: "V POŘÁDKU",
      },

      {
        id: "Z-0402",
        type: "VODNI",
        manufacturer: "Příklad výrobce",
        serial: "VN-133-001",
        manufactureYear: 2023,
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        lastPeriodicYear: 2023,
        location: "2. patro",
        position: "chodba",
        status: "V POŘÁDKU",
      },

      {
        id: "Z-0403",
        type: "HYDRANT",
        lastCheck: "15. 4. 2026",
        nextCheck: "15. 4. 2027",
        location: "2. patro",
        position: "chodba",
        status: "V POŘÁDKU",
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

  const selectedObject =
    objects.find(
      (object) =>
        object.id ===
        selectedObjectId
    );

  const selectedDevice =
    selectedObject?.devices.find(
      (device) =>
        device.id ===
        selectedDeviceId
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
            object.id !==
            selectedObjectId
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
          🔧 Z-0002 —
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
          ⏳ Z-0003 —
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

    const prefix =
      type === "HYDRANT"
        ? "H"
        : type === "CO2"
        ? "C"
        : type === "VODNI"
        ? "V"
        : "P";

    const newId =
      `${prefix}-${Date.now()
        .toString()
        .slice(-6)}`;

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
                "#f3f4f6",
              borderRadius: 10,
              padding:
                "9px 12px",
              fontSize: 18,
            }}
          >
            ✕
          </button>
        </div>

        <label
          style={labelStyle}
        >
          Typ zařízení
        </label>

        <div
          style={{
            display: "grid",
            gridTemplateColumns:
              "repeat(2, 1fr)",
            gap: 8,
            marginBottom: 16,
          }}
        >
          {[
            ["PRASKOVY", "🧯 Práškový"],
            ["VODNI", "💧 Vodní"],
            ["CO2", "❄️ CO₂"],
            ["HYDRANT", "🚒 Hydrant"],
          ].map(
            ([value, label]) => (
              <button
                key={value}
                onPointerDown={() =>
                  setType(value)
                }
                style={{
                  padding: 13,
                  border:
                    type === value
                      ? "2px solid #111827"
                      : "1px solid #e5e7eb",
                  background:
                    type === value
                      ? "#f3f4f6"
                      : "white",
                  borderRadius: 11,
                  fontWeight: 700,
                }}
              >
                {label}
              </button>
            )
          )}
        </div>

        {!isHydrant && (
          <>
            <label
              style={labelStyle}
            >
              Výrobce
            </label>

            <input
              value={
                manufacturer
              }
              onChange={(e) =>
                setManufacturer(
                  e.target.value
                )
              }
              placeholder="Např. Kovové výrobky"
              style={
                inputStyle
              }
            />

            <label
              style={labelStyle}
            >
              Výrobní číslo
            </label>

            <input
              value={serial}
              onChange={(e) =>
                setSerial(
                  e.target.value
                )
              }
              placeholder="Např. ABC123456"
              style={
                inputStyle
              }
            />

            <label
              style={labelStyle}
            >
              Rok výroby
            </label>

            <input
              type="number"
              inputMode="numeric"
              value={
                manufactureYear
              }
              onChange={(e) =>
                setManufactureYear(
                  e.target.value
                )
              }
              placeholder="Např. 2020"
              style={
                inputStyle
              }
            />

            <label
              style={labelStyle}
            >
              Poslední periodická zkouška
            </label>

            <input
              type="number"
              inputMode="numeric"
              value={
                lastPeriodicYear
              }
              onChange={(e) =>
                setLastPeriodicYear(
                  e.target.value
                )
              }
              placeholder="Např. 2025"
              style={
                inputStyle
              }
            />

            {manufactureYear &&
              lastPeriodicYear && (
                <div
                  style={{
                    background:
                      "#f3f4f6",
                    borderRadius: 12,
                    padding: 13,
                    marginBottom: 15,
                    fontSize: 14,
                  }}
                >
                  <b>
                    Automaticky
                    vypočítáno:
                  </b>

                  <div
                    style={{
                      marginTop: 7,
                    }}
                  >
                    🔧 Další periodická
                    zkouška:{" "}
                    <b>
                      {
                        calculatePeriodicYear(
                          type,
                          lastPeriodicYear
                        )
                      }
                    </b>
                  </div>

                  <div
                    style={{
                      marginTop: 5,
                    }}
                  >
                    ⏳ Konec životnosti:{" "}
                    <b>
                      {
                        calculateLifeEnd(
                          type,
                          manufactureYear
                        )
                      }
                    </b>
                  </div>
                </div>
              )}
          </>
        )}

        <label
          style={labelStyle}
        >
          Patro / umístění
        </label>

        <input
          value={location}
          onChange={(e) =>
            setLocation(
              e.target.value
            )
          }
          placeholder="Např. 2. patro"
          style={
            inputStyle
          }
        />

        <label
          style={labelStyle}
        >
          Přesné místo
        </label>

        <input
          value={position}
          onChange={(e) =>
            setPosition(
              e.target.value
            )
          }
          placeholder="Např. chodba"
          style={
            inputStyle
          }
        />

        <button
          onPointerDown={save}
          style={{
            width: "100%",
            background:
              "#111827",
            color: "white",
            border: 0,
            borderRadius: 12,
            padding: 16,
            fontSize: 16,
            fontWeight: 700,
            marginTop: 8,
          }}
        >
          ✅ Přidat zařízení
        </button>
      </div>
    </div>
  );
}

/* =========================
   KARTA ZAŘÍZENÍ
========================= */

function DeviceCard({
  device,
  onOpen,
}) {
  const rule =
    LEGAL_RULES[
      device.type
    ];

  const icon =
    device.type ===
    "HYDRANT"
      ? "🚒"
      : rule?.icon ||
        "🧯";

  const name =
    device.type ===
    "HYDRANT"
      ? "Hydrant"
      : rule?.name ||
        "Hasicí přístroj";

  return (
    <div
      style={{
        ...cardStyle,
        marginBottom: 10,
      }}
    >
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
            {icon}{" "}
            {device.id}
          </b>

          <div
            style={
              mutedStyle
            }
          >
            {name}
          </div>

          <div
            style={
              smallStyle
            }
          >
            {
              device.location
            }{" "}
            •{" "}
            {
              device.position
            }
          </div>
        </div>

        <ObjectStatus
          status={
            device.status
          }
        />
      </div>

      <button
        onPointerDown={
          onOpen
        }
        style={{
          width: "100%",
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
        DETAIL ZAŘÍZENÍ →
      </button>
    </div>
  );
}

/* =========================
   DETAIL ZAŘÍZENÍ
========================= */

function DeviceDetail({
  device,
  object,
  onBack,
}) {
  const isHydrant =
    device.type ===
    "HYDRANT";

  const rule =
    LEGAL_RULES[
      device.type
    ];

  const nextPeriodicYear =
    calculatePeriodicYear(
      device.type,
      device.lastPeriodicYear
    );

  const lifeEndYear =
    calculateLifeEnd(
      device.type,
      device.manufactureYear
    );

  return (
    <>
      <button
        onPointerDown={onBack}
        style={
          backButtonStyle
        }
      >
        ← Zpět na objekt
      </button>

      <h1
        style={{
          marginTop: 12,
        }}
      >
        {isHydrant
          ? "🚒"
          : rule?.icon}{" "}
        {device.id}
      </h1>

      <div style={cardStyle}>
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            gap: 12,
          }}
        >
          <div>
            <b
              style={{
                fontSize: 18,
              }}
            >
              {isHydrant
                ? "Hydrant"
                : rule?.name}
            </b>

            <div
              style={
                mutedStyle
              }
            >
              🏢{" "}
              {object.name}
            </div>
          </div>

          <ObjectStatus
            status={
              device.status
            }
          />
        </div>
      </div>

      <h2>📋 Informace</h2>

      <div style={cardStyle}>
        <InfoRow
          label="ID zařízení"
          value={
            device.id
          }
        />

        {!isHydrant && (
          <>
            <InfoRow
              label="Výrobce"
              value={
                device.manufacturer
              }
            />

            <InfoRow
              label="Výrobní číslo"
              value={
                device.serial
              }
            />

            <InfoRow
              label="Rok výroby"
              value={
                device.manufactureYear
              }
            />
          </>
        )}

        <InfoRow
          label="Umístění"
          value={`${device.location} • ${device.position}`}
        />
      </div>

      <h2>
        📅 Kontroly a lhůty
      </h2>

      <div style={cardStyle}>
        <InfoRow
          label="Poslední kontrola"
          value={
            device.lastCheck
          }
        />

        <InfoRow
          label="Další kontrola"
          value={
            device.nextCheck
          }
        />

        {!isHydrant && (
          <>
            <InfoRow
              label="Poslední periodická zkouška"
              value={
                device.lastPeriodicYear
              }
            />

            <InfoRow
              label="Další periodická zkouška"
              value={
                nextPeriodicYear
              }
            />

            <InfoRow
              label="Konec životnosti"
              value={
                lifeEndYear
              }
            />
          </>
        )}
      </div>

      <h2>📍 Umístění</h2>

      <div style={cardStyle}>
        <b>
          {object.name}
        </b>

        <div
          style={
            mutedStyle
          }
        >
          {object.address}
        </div>

        <div
          style={{
            marginTop: 10,
          }}
        >
          {device.location}
        </div>

        <div
          style={
            smallStyle
          }
        >
          {device.position}
        </div>
      </div>

      <h2>⚙️ Akce</h2>

      <div style={cardStyle}>
        <button
          style={
            actionButtonStyle
          }
        >
          🟢 V pořádku
        </button>

        {!isHydrant && (
          <button
            style={
              actionButtonStyle
            }
          >
            🔧 Poslat na údržbu
          </button>
        )}

        <button
          style={
            actionButtonStyle
          }
        >
          ⚠️ Nahlásit závadu
        </button>

        <button
          style={
            actionButtonStyle
          }
        >
          📷 Přidat fotografii
        </button>
      </div>
    </>
  );
}

/* =========================
   POMOCNÉ
========================= */

function InfoRow({
  label,
  value,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        gap: 15,
        padding:
          "11px 0",
        borderBottom:
          "1px solid #eee",
      }}
    >
      <span
        style={{
          color:
            "#6b7280",
        }}
      >
        {label}
      </span>

      <b
        style={{
          textAlign:
            "right",
        }}
      >
        {value}
      </b>
    </div>
  );
}

function ObjectStatus({
  status,
}) {
  let background =
    "#dcfce7";

  let color =
    "#166534";

  if (
    status ===
    "MUSÍ NA ÚDRŽBU"
  ) {
    background =
      "#fef3c7";

    color =
      "#92400e";
  }

  if (
    status ===
    "PO EXPIRACI"
  ) {
    background =
      "#fee2e2";

    color =
      "#991b1b";
  }

  return (
    <span
      style={{
        background,
        color,
        padding:
          "6px 9px",
        borderRadius:
          999,
        fontSize: 10,
        fontWeight: 800,
        whiteSpace:
          "nowrap",
        height:
          "fit-content",
      }}
    >
      {status}
    </span>
  );
}

function Badge({
  text,
  background,
  color,
}) {
  return (
    <span
      style={{
        background,
        color,
        padding:
          "6px 9px",
        borderRadius:
          999,
        fontSize: 10,
        fontWeight: 800,
        whiteSpace:
          "nowrap",
      }}
    >
      {text}
    </span>
  );
}

/* =========================
   STYLY
========================= */

const cardStyle = {
  background: "white",
  border:
    "1px solid #e5e7eb",
  borderRadius: 16,
  padding: 16,
  marginBottom: 14,
  boxShadow:
    "0 2px 8px rgba(0,0,0,.04)",
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

const backButtonStyle = {
  background:
    "#f3f4f6",
  border:
    "1px solid #e5e7eb",
  borderRadius: 10,
  padding:
    "10px 13px",
  fontWeight: 700,
};

const actionButtonStyle = {
  width: "100%",
  padding: 14,
  marginBottom: 9,
  border:
    "1px solid #e5e7eb",
  background:
    "#f9fafb",
  borderRadius: 11,
  textAlign:
    "left",
  fontWeight: 700,
  fontSize: 15,
};

const labelStyle = {
  display: "block",
  fontWeight: 700,
  fontSize: 14,
  marginBottom: 7,
};

const inputStyle = {
  width: "100%",
  boxSizing:
    "border-box",
  padding: 13,
  border:
    "1px solid #d1d5db",
  borderRadius: 10,
  fontSize: 16,
  marginBottom: 15,
  background:
    "white",
};

export default App;