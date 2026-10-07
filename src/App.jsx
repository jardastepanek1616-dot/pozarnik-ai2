import React, { useState } from "react";

/* =========================================================
   MENU
========================================================= */

const menu = [
  ["dashboard", "🏠", "Přehled"],
  ["objects", "🏢", "Objekty"],
  ["stock", "📦", "Sklad"],
  ["reports", "📄", "Zprávy"],
  ["controls", "📅", "Kontroly"],
  ["more", "•••", "Více"],
];

/* =========================================================
   PRAVIDLA
========================================================= */

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

/* =========================================================
   POMOCNÉ FUNKCE
========================================================= */

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

function formatDate(date = new Date()) {
  return date.toLocaleDateString("cs-CZ");
}

function getNextAnnualCheck(date = new Date()) {
  const next = new Date(date);
  next.setFullYear(next.getFullYear() + 1);

  return formatDate(next);
}

function getDeviceName(device) {
  if (device.type === "HYDRANT") {
    return `Hydrant ${device.id}`;
  }

  return LEGAL_RULES[device.type]?.name || "Hasicí přístroj";
}

function getDeviceIcon(device) {
  if (device.type === "HYDRANT") {
    return "🚒";
  }

  return LEGAL_RULES[device.type]?.icon || "🧯";
}

/* =========================================================
   TESTOVACÍ OBJEKTY
========================================================= */

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
        maintenance: null,
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
        status: "V POŘÁDKU",
        history: [],
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
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
        status: "V POŘÁDKU",
        history: [],
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
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
        maintenance: null,
      },
    ],
  },
];

/* =========================================================
   HLAVNÍ APP
========================================================= */

function App() {
  const [screen, setScreen] = useState("dashboard");

  const [objects, setObjects] = useState(initialObjects);

  const [maintenance, setMaintenance] = useState([]);

  const [stock, setStock] = useState([]);

  const [retired, setRetired] = useState([]);

  const [selectedObjectId, setSelectedObjectId] =
    useState(null);

  const [selectedDeviceId, setSelectedDeviceId] =
    useState(null);

  const [showAddDevice, setShowAddDevice] =
    useState(false);

  const [showInspection, setShowInspection] =
    useState(false);

  /* =====================================================
     VYBRANÝ OBJEKT / ZAŘÍZENÍ
  ===================================================== */

  const selectedObject = objects.find(
    (object) => object.id === selectedObjectId
  );

  const selectedDevice = selectedObject?.devices.find(
    (device) => device.id === selectedDeviceId
  );

  /* =====================================================
     NAVIGACE
  ===================================================== */

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

  /* =====================================================
     PŘIDÁNÍ ZAŘÍZENÍ
  ===================================================== */

  function addDevice(device) {
    setObjects((currentObjects) =>
      currentObjects.map((object) => {
        if (object.id !== selectedObjectId) {
          return object;
        }

        return {
          ...object,
          devices: [...object.devices, device],
        };
      })
    );

    setShowAddDevice(false);
  }

  /* =====================================================
     KONTROLA
  ===================================================== */

  function finishInspection(result) {
    const today = new Date();

    const historyItem = {
      id: Date.now(),
      date: formatDate(today),
      type: "ROČNÍ KONTROLA",

      result:
        result.faults.length > 0 || result.note.trim()
          ? "ZÁVADA"
          : "V POŘÁDKU",

      faults: result.faults,
      note: result.note,
      photo: result.photo || null,
    };

    setObjects((currentObjects) =>
      currentObjects.map((object) => {
        if (object.id !== selectedObjectId) {
          return object;
        }

        return {
          ...object,

          devices: object.devices.map((device) => {
            if (device.id !== selectedDeviceId) {
              return device;
            }

            const history = Array.isArray(device.history)
              ? device.history
              : [];

            const hasFault =
              result.faults.length > 0 ||
              result.note.trim();

            return {
              ...device,

              lastCheck: formatDate(today),

              nextCheck: getNextAnnualCheck(today),

              status: hasFault
                ? "MUSÍ NA ÚDRŽBU"
                : "V POŘÁDKU",

              maintenance: hasFault
                ? {
                    date: formatDate(today),
                    reason:
                      result.note ||
                      "Zjištěná závada při kontrole",
                    faults: result.faults,
                    fromObjectId: object.id,
                    fromObjectName: object.name,
                    fromLocation: device.location,
                    fromPosition: device.position,
                  }
                : null,

              history: [historyItem, ...history],
            };
          }),
        };
      })
    );

    setShowInspection(false);
  }

  /* =====================================================
     ODESLÁNÍ NA ÚDRŽBU
  ===================================================== */

  function sendToMaintenance() {
    if (!selectedObject || !selectedDevice) {
      return;
    }

    const today = new Date();

    const maintenanceItem = {
      ...selectedDevice,

      maintenanceId: `${selectedDevice.id}-${Date.now()}`,

      maintenanceDate: formatDate(today),

      fromObjectId: selectedObject.id,

      fromObjectName: selectedObject.name,

      fromLocation: selectedDevice.location,

      fromPosition: selectedDevice.position,

      status: "NA ÚDRŽBĚ",
    };

    setMaintenance((current) => [
      ...current,
      maintenanceItem,
    ]);

    setObjects((currentObjects) =>
      currentObjects.map((object) => {
        if (object.id !== selectedObject.id) {
          return object;
        }

        return {
          ...object,

          devices: object.devices.filter(
            (device) => device.id !== selectedDevice.id
          ),
        };
      })
    );

    const deviceId = selectedDevice.id;

    setSelectedDeviceId(null);

    alert(
      `🔧 Hasičák ${deviceId} byl odeslán na údržbu.`
    );
  }

  /* =====================================================
     ÚDRŽBA → PŮVODNÍ OBJEKT
  ===================================================== */

  function returnMaintenanceToObject(item) {
    const targetObject = objects.find(
      (object) => object.id === item.fromObjectId
    );

    if (!targetObject) {
      alert("Původní objekt už nebyl nalezen.");
      return;
    }

    const restoredDevice = {
      ...item,

      status: "V POŘÁDKU",

      maintenance: null,

      location: item.fromLocation,

      position: item.fromPosition,

      maintenanceId: undefined,
      maintenanceDate: undefined,

      fromObjectId: undefined,
      fromObjectName: undefined,
      fromLocation: undefined,
      fromPosition: undefined,
    };

    setObjects((currentObjects) =>
      currentObjects.map((object) => {
        if (object.id !== targetObject.id) {
          return object;
        }

        return {
          ...object,
          devices: [...object.devices, restoredDevice],
        };
      })
    );

    setMaintenance((current) =>
      current.filter(
        (maintenanceItem) =>
          maintenanceItem.maintenanceId !== item.maintenanceId
      )
    );

    alert(
      `🏢 ${item.id} byl vrácen do objektu ${targetObject.name}.`
    );
  }

  /* =====================================================
     ÚDRŽBA → SKLAD
  ===================================================== */

  function moveMaintenanceToStock(item) {
    const stockItem = {
      ...item,

      status: "SKLAD",

      stockDate: formatDate(new Date()),

      originalObjectId: item.fromObjectId,

      originalObjectName: item.fromObjectName,

      originalLocation: item.fromLocation,

      originalPosition: item.fromPosition,

      maintenanceId: undefined,
      maintenanceDate: undefined,

      fromObjectId: undefined,
      fromObjectName: undefined,
      fromLocation: undefined,
      fromPosition: undefined,
    };

    setStock((current) => [...current, stockItem]);

    setMaintenance((current) =>
      current.filter(
        (maintenanceItem) =>
          maintenanceItem.maintenanceId !== item.maintenanceId
      )
    );

    alert(`📦 ${item.id} byl přesunut na sklad.`);
  }

  /* =====================================================
     SKLAD → PŮVODNÍ OBJEKT
  ===================================================== */

  function returnStockToOriginalObject(item) {
    if (!item.originalObjectId) {
      alert(
        "U tohoto hasičáku není uložen původní objekt."
      );
      return;
    }

    const targetObject = objects.find(
      (object) => object.id === item.originalObjectId
    );

    if (!targetObject) {
      alert("Původní objekt nebyl nalezen.");
      return;
    }

    const restoredDevice = {
      ...item,

      status: "V POŘÁDKU",

      maintenance: null,

      location: item.originalLocation || item.location,

      position: item.originalPosition || item.position,

      stockDate: undefined,

      originalObjectId: undefined,
      originalObjectName: undefined,
      originalLocation: undefined,
      originalPosition: undefined,
    };

    setObjects((currentObjects) =>
      currentObjects.map((object) => {
        if (object.id !== targetObject.id) {
          return object;
        }

        return {
          ...object,
          devices: [...object.devices, restoredDevice],
        };
      })
    );

    setStock((current) =>
      current.filter((stockItem) => stockItem.id !== item.id)
    );

    alert(
      `🏢 ${item.id} byl vrácen do ${targetObject.name}.`
    );
  }

  /* =====================================================
     VYŘAZENÍ ZE SKLADU
  ===================================================== */

  function retireFromStock(item) {
    const retiredItem = {
      ...item,

      status: "VYŘAZENO",

      retiredDate: formatDate(new Date()),

      retiredFrom: "SKLAD",

      originalObjectId:
        item.originalObjectId ||
        item.fromObjectId ||
        null,

      originalObjectName:
        item.originalObjectName ||
        item.fromObjectName ||
        null,

      originalLocation:
        item.originalLocation ||
        item.fromLocation ||
        item.location ||
        null,

      originalPosition:
        item.originalPosition ||
        item.fromPosition ||
        item.position ||
        null,
    };

    setRetired((current) => [
      ...current,
      retiredItem,
    ]);

    setStock((current) =>
      current.filter((stockItem) => stockItem.id !== item.id)
    );

    alert(`🗄️ ${item.id} byl vyřazen.`);
  }

  /* =====================================================
     VYŘAZENÍ Z ÚDRŽBY
  ===================================================== */

  function retireFromMaintenance(item) {
    const retiredItem = {
      ...item,

      status: "VYŘAZENO",

      retiredDate: formatDate(new Date()),

      retiredFrom: "ÚDRŽBA",

      originalObjectId:
        item.originalObjectId ||
        item.fromObjectId ||
        null,

      originalObjectName:
        item.originalObjectName ||
        item.fromObjectName ||
        null,

      originalLocation:
        item.originalLocation ||
        item.fromLocation ||
        item.location ||
        null,

      originalPosition:
        item.originalPosition ||
        item.fromPosition ||
        item.position ||
        null,
    };

    setRetired((current) => [
      ...current,
      retiredItem,
    ]);

    setMaintenance((current) =>
      current.filter(
        (maintenanceItem) =>
          maintenanceItem.maintenanceId !== item.maintenanceId
      )
    );

    alert(`🗄️ ${item.id} byl vyřazen.`);
  }

  /* =====================================================
     VYŘAZENÍ Z OBJEKTU
  ===================================================== */

  function retireFromObject(device, object) {
    const retiredItem = {
      ...device,

      status: "VYŘAZENO",

      retiredDate: formatDate(new Date()),

      retiredFrom: "OBJEKT",

      originalObjectId: object.id,

      originalObjectName: object.name,

      originalLocation: device.location,

      originalPosition: device.position,
    };

    setRetired((current) => [
      ...current,
      retiredItem,
    ]);

    setObjects((currentObjects) =>
      currentObjects.map((currentObject) => {
        if (currentObject.id !== object.id) {
          return currentObject;
        }

        return {
          ...currentObject,

          devices: currentObject.devices.filter(
            (currentDevice) =>
              currentDevice.id !== device.id
          ),
        };
      })
    );

    setSelectedDeviceId(null);

    alert(`🗄️ ${device.id} byl vyřazen.`);
  }

  /* =====================================================
     VYŘAZENÉ → SKLAD
  ===================================================== */

  function restoreRetiredToStock(item) {
    const restored = {
      ...item,

      status: "SKLAD",

      retiredDate: undefined,
      retiredFrom: undefined,
    };

    setStock((current) => [
      ...current,
      restored,
    ]);

    setRetired((current) =>
      current.filter(
        (retiredItem) => retiredItem.id !== item.id
      )
    );

    alert(`📦 ${item.id} byl vrácen na sklad.`);
  }

  /* =====================================================
     VYŘAZENÉ → OBJEKT
  ===================================================== */

  function restoreRetiredToObject(item) {
    if (!item.originalObjectId) {
      alert(
        "U tohoto kusu není uložen původní objekt."
      );
      return;
    }

    const targetObject = objects.find(
      (object) => object.id === item.originalObjectId
    );

    if (!targetObject) {
      alert("Původní objekt nebyl nalezen.");
      return;
    }

    const restored = {
      ...item,

      status: "V POŘÁDKU",

      location:
        item.originalLocation ||
        item.location,

      position:
        item.originalPosition ||
        item.position,

      retiredDate: undefined,
      retiredFrom: undefined,

      originalObjectId: undefined,
      originalObjectName: undefined,
      originalLocation: undefined,
      originalPosition: undefined,
    };

    setObjects((currentObjects) =>
      currentObjects.map((object) => {
        if (object.id !== targetObject.id) {
          return object;
        }

        return {
          ...object,

          devices: [
            ...object.devices,
            restored,
          ],
        };
      })
    );

    setRetired((current) =>
      current.filter(
        (retiredItem) => retiredItem.id !== item.id
      )
    );

    alert(
      `♻️ ${item.id} byl obnoven do ${targetObject.name}.`
    );
  }

  /* =====================================================
     TRVALÉ SMAZÁNÍ
  ===================================================== */

  function permanentlyDelete(item) {
    const confirmed = window.confirm(
      `Opravdu chceš trvale smazat ${item.id}?`
    );

    if (!confirmed) {
      return;
    }

    setRetired((current) =>
      current.filter(
        (retiredItem) => retiredItem.id !== item.id
      )
    );
  }

  /* =====================================================
     RENDER
  ===================================================== */

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
        <b style={{ fontSize: 21 }}>
          🧯 Požárník AI
        </b>

        <span
          style={{
            color: "#6b7280",
            fontSize: 13,
          }}
        >
          Evidence
        </span>
      </header>

      <main
        style={{
          maxWidth: 850,
          margin: "auto",
          padding: "22px 16px",
        }}
      >
        {screen === "dashboard" && (
          <Dashboard
            objects={objects}
            maintenance={maintenance}
            stock={stock}
          />
        )}

        {screen === "objects" &&
          !selectedObject && (
            <Objects
              objects={objects}
              onOpenObject={openObject}
            />
          )}

        {screen === "objects" &&
          selectedObject &&
          !selectedDevice && (
            <ObjectDetail
              object={selectedObject}
              onBack={backToObjects}
              onOpenDevice={openDevice}
              onAddDevice={() =>
                setShowAddDevice(true)
              }
            />
          )}

        {screen === "objects" &&
          selectedObject &&
          selectedDevice && (
            <DeviceDetail
              device={selectedDevice}
              object={selectedObject}
              onBack={backToObject}
              onInspection={() =>
                setShowInspection(true)
              }
              onSendToMaintenance={
                sendToMaintenance
              }
              onRetire={() =>
                retireFromObject(
                  selectedDevice,
                  selectedObject
                )
              }
            />
          )}

        {screen === "stock" && (
          <StockScreen
            stock={stock}
            maintenance={maintenance}
            retired={retired}
            onReturnToObject={
              returnStockToOriginalObject
            }
            onRetire={retireFromStock}
            onReturnMaintenance={
              returnMaintenanceToObject
            }
            onMoveMaintenanceToStock={
              moveMaintenanceToStock
            }
            onRetireMaintenance={
              retireFromMaintenance
            }
            onRestoreRetiredToStock={
              restoreRetiredToStock
            }
            onRestoreRetiredToObject={
              restoreRetiredToObject
            }
            onDeleteRetired={
              permanentlyDelete
            }
          />
        )}

        {screen !== "dashboard" &&
          screen !== "objects" &&
          screen !== "stock" && (
            <SimplePlaceholder
              screen={screen}
            />
          )}
      </main>

      {/* =================================================
          SPODNÍ MENU
      ================================================= */}

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
            onPointerDown={() => {
              setScreen(id);
              setSelectedObjectId(null);
              setSelectedDeviceId(null);
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
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 3,
              padding: 8,
            }}
          >
            <span style={{ fontSize: 20 }}>
              {icon}
            </span>

            <small style={{ fontSize: 10 }}>
              {name}
            </small>
          </button>
        ))}
      </nav>

      {showAddDevice &&
        selectedObject && (
          <AddDeviceModal
            object={selectedObject}
            onClose={() =>
              setShowAddDevice(false)
            }
            onSave={addDevice}
          />
        )}

      {showInspection &&
        selectedObject &&
        selectedDevice && (
          <InspectionModal
            device={selectedDevice}
            onClose={() =>
              setShowInspection(false)
            }
            onSave={finishInspection}
          />
        )}
    </div>
  );
}

/* =========================================================
   DASHBOARD
========================================================= */

function Dashboard({
  objects,
  maintenance,
  stock,
}) {
  const allDevices = objects.flatMap(
    (object) => object.devices
  );

  const maintenanceCount =
    maintenance.length;

  const expiredCount =
    allDevices.filter(
      (device) =>
        device.status === "PO EXPIRACI"
    ).length;

  return (
    <>
      <h1 style={{ margin: "0 0 18px" }}>
        Přehled
      </h1>

      <div style={cardStyle}>
        <b style={{ fontSize: 18 }}>
          Požární evidence
        </b>

        <div style={mutedStyle}>
          SBD Bílina • SVJ Bílina
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
          number={objects.length}
          text="objektů"
        />

        <DashboardStat
          number={
            allDevices.length +
            maintenance.length +
            stock.length
          }
          text="zařízení"
        />

        <DashboardStat
          number={maintenanceCount}
          text="na údržbě"
        />

        <DashboardStat
          number={expiredCount}
          text="po expiraci"
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
          QR kód otevře konkrétní zařízení.
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
        <b>🔧 Kontroly a údržba</b>

        <div
          style={{
            marginTop: 5,
            color: "#6b7280",
            fontSize: 13,
          }}
        >
          Aktuálně na údržbě:{" "}
          <b>{maintenance.length}</b>
        </div>
      </div>

      <div
        style={{
          background: "#f5f3ff",
          border: "1px solid #ddd6fe",
          borderRadius: 14,
          padding: 15,
        }}
      >
        <b>⏳ Konec životnosti</b>

        <div
          style={{
            marginTop: 5,
            color: "#6b7280",
            fontSize: 13,
          }}
        >
          Hlídat zařízení s blížícím se
          koncem životnosti.
        </div>
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
          color: "#6b7280",
          fontSize: 13,
        }}
      >
        {text}
      </span>
    </div>
  );
}

/* =========================================================
   OBJEKTY
========================================================= */

function Objects({
  objects,
  onOpenObject,
}) {
  const [customer, setCustomer] =
    useState("Všichni");

  const [search, setSearch] =
    useState("");

  const filteredObjects =
    objects.filter((object) => {
      const matchesCustomer =
        customer === "Všichni" ||
        object.customer === customer;

      const text =
        `${object.name} ${object.address} ${object.customer}`
          .toLowerCase();

      return (
        matchesCustomer &&
        text.includes(
          search.toLowerCase()
        )
      );
    });

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          gap: 10,
          marginBottom: 18,
        }}
      >
        <h1 style={{ margin: 0 }}>
          🏢 Objekty
        </h1>

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
              onPointerDown={() =>
                setCustomer(name)
              }
              style={{
                background:
                  customer === name
                    ? "#111827"
                    : "#f3f4f6",
                color:
                  customer === name
                    ? "white"
                    : "#111827",
                border:
                  "1px solid #e5e7eb",
                borderRadius: 10,
                padding: "10px 13px",
                whiteSpace:
                  "nowrap",
              }}
            >
              {name}
            </button>
          ))}
        </div>
      </div>

      <input
        value={search}
        onChange={(e) =>
          setSearch(e.target.value)
        }
        placeholder="🔎 Hledat objekt..."
        style={{
          width: "100%",
          padding: 14,
          border: "1px solid #d1d5db",
          borderRadius: 12,
          marginBottom: 14,
          fontSize: 16,
          background: "white",
          boxSizing: "border-box",
        }}
      />

      {filteredObjects.map(
        (object) => {
          const extinguishers =
            object.devices.filter(
              (device) =>
                device.type !== "HYDRANT"
            );

          const hydrants =
            object.devices.filter(
              (device) =>
                device.type === "HYDRANT"
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
                    🏢 {object.name}
                  </b>

                  <div
                    style={
                      mutedStyle
                    }
                  >
                    {object.customer}
                  </div>

                  <div
                    style={
                      smallStyle
                    }
                  >
                    {object.address}
                  </div>
                </div>

                <ObjectStatus
                  status={status}
                />
              </div>

              <div
                style={{
                  borderTop:
                    "1px solid #eee",
                  marginTop: 14,
                  paddingTop: 12,
                  color: "#4b5563",
                }}
              >
                🧯 {extinguishers.length}{" "}
                hasičáků • 🚒{" "}
                {hydrants.length} hydrantů
              </div>

              <button
                onPointerDown={() =>
                  onOpenObject(object)
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
                DETAIL OBJEKTU →
              </button>
            </div>
          );
        }
      )}
    </>
  );
}

/* =========================================================
   DETAIL OBJEKTU
========================================================= */

function ObjectDetail({
  object,
  onBack,
  onOpenDevice,
  onAddDevice,
}) {
  const extinguishers =
    object.devices.filter(
      (device) =>
        device.type !== "HYDRANT"
    );

  const hydrants =
    object.devices.filter(
      (device) =>
        device.type === "HYDRANT"
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
        style={backButtonStyle}
      >
        ← Zpět na objekty
      </button>

      <h1 style={{ marginTop: 12 }}>
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
              {object.customer}
            </b>

            <div
              style={mutedStyle}
            >
              📍 {object.address}
            </div>
          </div>

          <ObjectStatus
            status={status}
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
          number={hydrants.length}
          text="hydrantů"
        />
      </div>

      <button
        onPointerDown={
          onAddDevice
        }
        style={{
          width: "100%",
          background: "#111827",
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

      <h2 style={{ marginTop: 28 }}>
        🧯 Hasicí přístroje
      </h2>

      {extinguishers.length ===
      0 ? (
        <div style={cardStyle}>
          <div
            style={{
              textAlign: "center",
              color: "#6b7280",
              padding: 10,
            }}
          >
            V objektu momentálně
            nejsou žádné hasicí
            přístroje.
          </div>
        </div>
      ) : (
        extinguishers.map(
          (device) => (
            <DeviceCard
              key={device.id}
              device={device}
              onOpen={() =>
                onOpenDevice(device)
              }
            />
          )
        )
      )}

      <h2 style={{ marginTop: 28 }}>
        🚒 Hydranty
      </h2>

      {hydrants.map(
        (device) => (
          <DeviceCard
            key={device.id}
            device={device}
            onOpen={() =>
              onOpenDevice(device)
            }
          />
        )
      )}
    </>
  );
}

/* =========================================================
   KARTA ZAŘÍZENÍ
========================================================= */

function DeviceCard({
  device,
  onOpen,
}) {
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
            {getDeviceIcon(device)}{" "}
            {device.id}
          </b>

          <div style={mutedStyle}>
            {getDeviceName(device)}
          </div>

          <div style={smallStyle}>
            {device.location} •{" "}
            {device.position}
          </div>
        </div>

        <ObjectStatus
          status={device.status}
        />
      </div>

      <button
        onPointerDown={onOpen}
        style={{
          width: "100%",
          marginTop: 12,
          background: "#f3f4f6",
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

/* =========================================================
   DETAIL ZAŘÍZENÍ
========================================================= */

function DeviceDetail({
  device,
  object,
  onBack,
  onInspection,
  onSendToMaintenance,
  onRetire,
}) {
  const isHydrant =
    device.type === "HYDRANT";

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

  const history =
    Array.isArray(device.history)
      ? device.history
      : [];

  return (
    <>
      <button
        onPointerDown={onBack}
        style={backButtonStyle}
      >
        ← Zpět na objekt
      </button>

      <h1 style={{ marginTop: 12 }}>
        {getDeviceIcon(device)}{" "}
        {isHydrant
          ? `Hydrant ${device.id}`
          : device.id}
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
              {getDeviceName(device)}
            </b>

            <div style={mutedStyle}>
              🏢 {object.name}
            </div>
          </div>

          <ObjectStatus
            status={device.status}
          />
        </div>
      </div>

      <h2>📋 Informace</h2>

      <div style={cardStyle}>
        <InfoRow
          label="ID zařízení"
          value={device.id}
        />

        {!isHydrant && (
          <>
            <InfoRow
              label="Výrobce"
              value={
                device.manufacturer ||
                "—"
              }
            />

            <InfoRow
              label="Výrobní číslo"
              value={
                device.serial ||
                "—"
              }
            />

            <InfoRow
              label="Rok výroby"
              value={
                device.manufactureYear ||
                "—"
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
          value={device.lastCheck || "—"}
        />

        <InfoRow
          label="Další kontrola"
          value={device.nextCheck || "—"}
        />

        {!isHydrant && (
          <>
            <InfoRow
              label="Poslední periodická zkouška"
              value={
                device.lastPeriodicYear ||
                "—"
              }
            />

            <InfoRow
              label="Další periodická zkouška"
              value={
                nextPeriodicYear ||
                "—"
              }
            />

            <InfoRow
              label="Konec životnosti"
              value={
                lifeEndYear ||
                "—"
              }
            />
          </>
        )}
      </div>

      <h2>📍 Umístění</h2>

      <div style={cardStyle}>
        <b>{object.name}</b>

        <div style={mutedStyle}>
          {object.address}
        </div>

        <div style={{ marginTop: 10 }}>
          {device.location}
        </div>

        <div style={smallStyle}>
          {device.position}
        </div>
      </div>

      {!isHydrant && (
        <>
          <h2>🔍 Kontrola</h2>

          <div style={cardStyle}>
            <button
              onPointerDown={
                onInspection
              }
              style={
                primaryButtonStyle
              }
            >
              🔍 Provést kontrolu
            </button>
          </div>
        </>
      )}

      <h2>📜 Historie kontrol</h2>

      {history.length === 0 ? (
        <div style={cardStyle}>
          <div
            style={{
              color: "#6b7280",
              textAlign: "center",
              padding: 8,
            }}
          >
            Zatím není žádná
            uložená kontrola.
          </div>
        </div>
      ) : (
        history.map((item) => (
          <HistoryCard
            key={item.id}
            item={item}
          />
        ))
      )}

      {!isHydrant &&
        device.status ===
          "MUSÍ NA ÚDRŽBU" && (
          <>
            <h2>🔧 Údržba</h2>

            <div
              style={{
                ...cardStyle,
                background:
                  "#fff7ed",
                border:
                  "1px solid #fed7aa",
              }}
            >
              <b>
                ⚠️ Zařízení má závadu
              </b>

              <div
                style={{
                  color: "#9a3412",
                  fontSize: 13,
                  marginTop: 6,
                }}
              >
                Po odeslání na
                údržbu bude
                hasičák odebrán
                z tohoto objektu.
              </div>

              <button
                onPointerDown={
                  onSendToMaintenance
                }
                style={{
                  ...primaryButtonStyle,
                  marginTop: 12,
                  background:
                    "#ea580c",
                }}
              >
                🔧 Poslat na údržbu
              </button>
            </div>
          </>
        )}

      <h2>🗄️ Vyřazení</h2>

      <div style={cardStyle}>
        <div
          style={{
            color: "#6b7280",
            fontSize: 13,
            marginBottom: 10,
          }}
        >
          Vyřazení je vždy ruční. Aplikace
          sama zařízení nevyřadí.
        </div>

        <button
          onPointerDown={onRetire}
          style={{
            ...actionButtonStyle,
            color: "#991b1b",
            marginBottom: 0,
          }}
        >
          🗄️ Vyřadit zařízení
        </button>
      </div>
    </>
  );
}

/* =========================================================
   PŘIDÁNÍ ZAŘÍZENÍ
========================================================= */

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
      alert("Vyplň prosím umístění.");
      return;
    }

    if (!position.trim()) {
      alert("Vyplň prosím pozici.");
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

      const exists =
        object.devices.some(
          (device) =>
            device.type ===
              "HYDRANT" &&
            device.id ===
              hydrantNumber.trim()
        );

      if (exists) {
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

    const newId =
      isHydrant
        ? hydrantNumber.trim()
        : serial.trim();

    const newDevice = {
      id: newId,
      type,
      lastCheck: "—",
      nextCheck: "—",
      location: location.trim(),
      position: position.trim(),
      status: "V POŘÁDKU",
      history: [],
      maintenance: null,
    };

    if (!isHydrant) {
      newDevice.manufacturer =
        manufacturer.trim();

      newDevice.serial =
        serial.trim();

      newDevice.manufactureYear =
        Number(manufactureYear);

      newDevice.lastPeriodicYear =
        Number(lastPeriodicYear);
    }

    onSave(newDevice);
  }

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <ModalHeader
          title="+ Přidat zařízení"
          subtitle={object.name}
          onClose={onClose}
        />

        <label style={labelStyle}>
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
            <label style={labelStyle}>
              Výrobce
            </label>

            <input
              value={manufacturer}
              onChange={(e) =>
                setManufacturer(
                  e.target.value
                )
              }
              placeholder="Např. Kovové výrobky"
              style={inputStyle}
            />

            <label style={labelStyle}>
              Výrobní číslo
            </label>

            <input
              type="text"
              inputMode="numeric"
              value={serial}
              onChange={(e) =>
                setSerial(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              placeholder="Např. 12345678"
              style={inputStyle}
            />

            <div style={helperStyle}>
              Výrobní číslo bude
              zároveň ID hasičáku.
            </div>

            <label style={labelStyle}>
              Rok výroby
            </label>

            <input
              type="number"
              inputMode="numeric"
              value={manufactureYear}
              onChange={(e) =>
                setManufactureYear(
                  e.target.value
                )
              }
              placeholder="Např. 2020"
              style={inputStyle}
            />

            <label style={labelStyle}>
              Poslední periodická zkouška
            </label>

            <input
              type="number"
              inputMode="numeric"
              value={lastPeriodicYear}
              onChange={(e) =>
                setLastPeriodicYear(
                  e.target.value
                )
              }
              placeholder="Např. 2025"
              style={inputStyle}
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
                    Automaticky vypočítáno:
                  </b>

                  <div
                    style={{
                      marginTop: 7,
                    }}
                  >
                    🔧 Další periodická
                    zkouška:{" "}
                    <b>
                      {calculatePeriodicYear(
                        type,
                        lastPeriodicYear
                      )}
                    </b>
                  </div>

                  <div
                    style={{
                      marginTop: 5,
                    }}
                  >
                    ⏳ Konec životnosti:{" "}
                    <b>
                      {calculateLifeEnd(
                        type,
                        manufactureYear
                      )}
                    </b>
                  </div>
                </div>
              )}
          </>
        )}

        {isHydrant && (
          <>
            <label style={labelStyle}>
              Číslo hydrantu
            </label>

            <input
              type="text"
              inputMode="numeric"
              value={hydrantNumber}
              onChange={(e) =>
                setHydrantNumber(
                  e.target.value.replace(
                    /\D/g,
                    ""
                  )
                )
              }
              placeholder="Např. 1"
              style={inputStyle}
            />
          </>
        )}

        <label style={labelStyle}>
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
          style={inputStyle}
        />

        <label style={labelStyle}>
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
          style={inputStyle}
        />

        <button
          onPointerDown={save}
          style={primaryButtonStyle}
        >
          ✅ Přidat zařízení
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   KONTROLA
========================================================= */

function InspectionModal({
  device,
  onClose,
  onSave,
}) {
  const [faults, setFaults] =
    useState([]);

  const [note, setNote] =
    useState("");

  const [photo, setPhoto] =
    useState(null);

  const faultOptions = [
    {
      id: "PLAST",
      label: "🧯 Poškozený plášť",
    },
    {
      id: "TLAK",
      label: "📉 Nízký tlak",
    },
    {
      id: "HADICE",
      label: "💦 Poškozená hadice",
    },
    {
      id: "PLOMBA",
      label:
        "🔒 Chybí plomba / problém s pojistkou",
    },
    {
      id: "PRISTUP",
      label: "📍 Špatně přístupný",
    },
  ];

  function toggleFault(id) {
    setFaults((current) =>
      current.includes(id)
        ? current.filter(
            (item) => item !== id
          )
        : [...current, id]
    );
  }

  function handlePhoto(event) {
    const file =
      event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader =
      new FileReader();

    reader.onload = () => {
      setPhoto(reader.result);
    };

    reader.readAsDataURL(file);
  }

  function save() {
    const finalFaults = [...faults];

    if (
      note.trim() &&
      !finalFaults.includes(
        "VLASTNI"
      )
    ) {
      finalFaults.push(
        "VLASTNI"
      );
    }

    onSave({
      faults: finalFaults,
      note: note.trim(),
      photo,
    });
  }

  const hasProblem =
    faults.length > 0 ||
    note.trim();

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <ModalHeader
          title="🔍 Kontrola hasičáku"
          subtitle={`${device.id} • ${getDeviceName(
            device
          )}`}
          onClose={onClose}
        />

        <div
          style={{
            background: "#f9fafb",
            border:
              "1px solid #e5e7eb",
            borderRadius: 13,
            padding: 14,
            marginBottom: 18,
          }}
        >
          <b>📍 Umístění</b>

          <div
            style={{
              marginTop: 5,
              color: "#6b7280",
            }}
          >
            {device.location} •{" "}
            {device.position}
          </div>
        </div>

        <h3
          style={{
            marginBottom: 10,
          }}
        >
          Zjištěné závady
        </h3>

        <div
          style={{
            display: "grid",
            gap: 9,
          }}
        >
          {faultOptions.map(
            (fault) => {
              const active =
                faults.includes(
                  fault.id
                );

              return (
                <button
                  key={fault.id}
                  onPointerDown={() =>
                    toggleFault(
                      fault.id
                    )
                  }
                  style={{
                    width: "100%",
                    textAlign:
                      "left",
                    padding: 14,
                    border:
                      active
                        ? "2px solid #dc2626"
                        : "1px solid #e5e7eb",
                    background:
                      active
                        ? "#fef2f2"
                        : "white",
                    borderRadius: 11,
                    fontWeight: 700,
                    color:
                      active
                        ? "#991b1b"
                        : "#111827",
                  }}
                >
                  {fault.label}

                  <span
                    style={{
                      float: "right",
                      fontSize: 18,
                    }}
                  >
                    {active
                      ? "☑️"
                      : "⬜"}
                  </span>
                </button>
              );
            }
          )}
        </div>

        <h3
          style={{
            marginTop: 22,
            marginBottom: 8,
          }}
        >
          📝 Poznámka /
          vlastní závada
        </h3>

        <textarea
          value={note}
          onChange={(e) =>
            setNote(
              e.target.value
            )
          }
          placeholder="Např. poškozená rukojeť, uvolněný držák..."
          rows={4}
          style={{
            width: "100%",
            boxSizing: "border-box",
            border:
              "1px solid #d1d5db",
            borderRadius: 11,
            padding: 13,
            fontSize: 15,
            resize: "vertical",
          }}
        />

        <h3
          style={{
            marginTop: 22,
            marginBottom: 8,
          }}
        >
          📷 Fotografie
        </h3>

        <div
          style={{
            color: "#6b7280",
            fontSize: 13,
            marginBottom: 10,
          }}
        >
          Fotografie je nepovinná.
        </div>

        <label
          style={{
            display: "block",
            border:
              "1px dashed #9ca3af",
            borderRadius: 12,
            padding: 16,
            textAlign: "center",
            background: "#f9fafb",
            cursor: "pointer",
            fontWeight: 700,
          }}
        >
          📷 Přidat fotografii

          <input
            type="file"
            accept="image/*"
            capture="environment"
            onChange={handlePhoto}
            style={{
              display: "none",
            }}
          />
        </label>

        {photo && (
          <div
            style={{
              marginTop: 12,
              position: "relative",
            }}
          >
            <img
              src={photo}
              alt="Fotografie kontroly"
              style={{
                width: "100%",
                maxHeight: 300,
                objectFit: "contain",
                borderRadius: 12,
                border:
                  "1px solid #e5e7eb",
                background:
                  "#f3f4f6",
              }}
            />

            <button
              onPointerDown={() =>
                setPhoto(null)
              }
              style={{
                position: "absolute",
                top: 8,
                right: 8,
                border: 0,
                background:
                  "rgba(0,0,0,.7)",
                color: "white",
                borderRadius: 999,
                width: 34,
                height: 34,
                fontSize: 16,
              }}
            >
              ✕
            </button>
          </div>
        )}

        <div
          style={{
            marginTop: 22,
            background:
              hasProblem
                ? "#fef2f2"
                : "#f0fdf4",
            border:
              hasProblem
                ? "1px solid #fecaca"
                : "1px solid #bbf7d0",
            borderRadius: 12,
            padding: 14,
          }}
        >
          <b>
            {hasProblem
              ? "⚠️ Kontrola se závadou"
              : "✅ Kontrola bez závad"}
          </b>

          <div
            style={{
              marginTop: 5,
              fontSize: 13,
              color: "#6b7280",
            }}
          >
            {hasProblem
              ? "Po dokončení bude zařízení označeno jako MUSÍ NA ÚDRŽBU."
              : "Po dokončení bude zařízení označeno jako V POŘÁDKU."}
          </div>
        </div>

        <button
          onPointerDown={save}
          style={{
            ...primaryButtonStyle,
            marginTop: 16,
          }}
        >
          ✅ Dokončit kontrolu
        </button>

        <button
          onPointerDown={onClose}
          style={{
            width: "100%",
            background: "#f3f4f6",
            color: "#111827",
            border:
              "1px solid #e5e7eb",
            borderRadius: 12,
            padding: 14,
            fontSize: 15,
            fontWeight: 700,
            marginTop: 9,
          }}
        >
          Zrušit
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   SKLAD
========================================================= */

function StockScreen({
  stock,
  maintenance,
  retired,
  onReturnToObject,
  onRetire,
  onReturnMaintenance,
  onMoveMaintenanceToStock,
  onRetireMaintenance,
  onRestoreRetiredToStock,
  onRestoreRetiredToObject,
  onDeleteRetired,
}) {
  const [
    section,
    setSection,
  ] = useState("stock");

  return (
    <>
      <h1 style={{ marginTop: 0 }}>
        📦 Sklad
      </h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns:
            "repeat(3, 1fr)",
          gap: 7,
          marginBottom: 18,
        }}
      >
        <button
          onPointerDown={() =>
            setSection("stock")
          }
          style={{
            padding: 11,
            borderRadius: 10,
            border:
              "1px solid #e5e7eb",
            background:
              section === "stock"
                ? "#111827"
                : "white",
            color:
              section === "stock"
                ? "white"
                : "#111827",
            fontWeight: 700,
          }}
        >
          📦 Sklad
        </button>

        <button
          onPointerDown={() =>
            setSection(
              "maintenance"
            )
          }
          style={{
            padding: 11,
            borderRadius: 10,
            border:
              "1px solid #e5e7eb",
            background:
              section === "maintenance"
                ? "#111827"
                : "white",
            color:
              section === "maintenance"
                ? "white"
                : "#111827",
            fontWeight: 700,
          }}
        >
          🔧 Údržba
        </button>

        <button
          onPointerDown={() =>
            setSection("retired")
          }
          style={{
            padding: 11,
            borderRadius: 10,
            border:
              "1px solid #e5e7eb",
            background:
              section === "retired"
                ? "#111827"
                : "white",
            color:
              section === "retired"
                ? "white"
                : "#111827",
            fontWeight: 700,
          }}
        >
          🗄️ Vyřazené
        </button>
      </div>

      {section === "stock" && (
        <StockList
          stock={stock}
          onReturnToObject={
            onReturnToObject
          }
          onRetire={onRetire}
        />
      )}

      {section ===
        "maintenance" && (
        <MaintenanceList
          maintenance={
            maintenance
          }
          onReturnToObject={
            onReturnMaintenance
          }
          onMoveToStock={
            onMoveMaintenanceToStock
          }
          onRetire={
            onRetireMaintenance
          }
        />
      )}

      {section === "retired" && (
        <RetiredList
          retired={retired}
          onRestoreStock={
            onRestoreRetiredToStock
          }
          onRestoreObject={
            onRestoreRetiredToObject
          }
          onDelete={
            onDeleteRetired
          }
        />
      )}
    </>
  );
}

/* =========================================================
   SKLAD - SEZNAM
========================================================= */

function StockList({
  stock,
  onReturnToObject,
  onRetire,
}) {
  return (
    <>
      <div style={cardStyle}>
        <b
          style={{
            fontSize: 18,
          }}
        >
          📦 {stock.length} hasičáků
          na skladě
        </b>
      </div>

      {stock.length === 0 ? (
        <EmptyBox
          icon="📦"
          title="Sklad je prázdný"
          text="Zatím zde nejsou žádné hasicí přístroje."
        />
      ) : (
        stock.map((item) => (
          <StockItemCard
            key={item.id}
            item={item}
            onReturn={() =>
              onReturnToObject(item)
            }
            onRetire={() =>
              onRetire(item)
            }
          />
        ))
      )}
    </>
  );
}

/* =========================================================
   KARTA SKLAD
========================================================= */

function StockItemCard({
  item,
  onReturn,
  onRetire,
}) {
  return (
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
            {getDeviceIcon(item)}{" "}
            {item.id}
          </b>

          <div style={mutedStyle}>
            {getDeviceName(item)}
          </div>
        </div>

        <Badge
          text="SKLAD"
          background="#dcfce7"
          color="#166534"
        />
      </div>

      <div
        style={{
          marginTop: 12,
        }}
      >
        <InfoRow
          label="Výrobce"
          value={
            item.manufacturer || "—"
          }
        />

        <InfoRow
          label="Výrobní číslo"
          value={
            item.serial || item.id
          }
        />

        <InfoRow
          label="Odkud"
          value={
            item.originalObjectName ||
            "Neuvedeno"
          }
        />

        <InfoRow
          label="Rok výroby"
          value={
            item.manufactureYear ||
            "—"
          }
        />
      </div>

      <button
        onPointerDown={onReturn}
        style={{
          ...primaryButtonStyle,
          marginTop: 10,
        }}
      >
        🏢 Vrátit do objektu
      </button>

      <button
        onPointerDown={onRetire}
        style={{
          ...actionButtonStyle,
          color: "#991b1b",
          marginTop: 9,
        }}
      >
        🗄️ Vyřadit
      </button>
    </div>
  );
}

/* =========================================================
   ÚDRŽBA
========================================================= */

function MaintenanceList({
  maintenance,
  onReturnToObject,
  onMoveToStock,
  onRetire,
}) {
  return (
    <>
      <div
        style={{
          ...cardStyle,
          background: "#fff7ed",
          border:
            "1px solid #fed7aa",
        }}
      >
        <b style={{ fontSize: 18 }}>
          🔧 {maintenance.length} hasičáků
          na údržbě
        </b>

        <div
          style={{
            color: "#9a3412",
            fontSize: 13,
            marginTop: 5,
          }}
        >
          Tyto kusy jsou dočasně
          odebrané z objektů.
        </div>
      </div>

      {maintenance.length === 0 ? (
        <EmptyBox
          icon="✅"
          title="Nic není na údržbě"
          text="Všechny evidované kusy jsou mimo údržbu."
        />
      ) : (
        maintenance.map(
          (item) => (
            <MaintenanceItemCard
              key={
                item.maintenanceId
              }
              item={item}
              onReturn={() =>
                onReturnToObject(
                  item
                )
              }
              onStock={() =>
                onMoveToStock(
                  item
                )
              }
              onRetire={() =>
                onRetire(item)
              }
            />
          )
        )
      )}
    </>
  );
}

/* =========================================================
   KARTA ÚDRŽBA
========================================================= */

function MaintenanceItemCard({
  item,
  onReturn,
  onStock,
  onRetire,
}) {
  return (
    <div
      style={{
        ...cardStyle,
        borderLeft:
          "4px solid #f97316",
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
          <b style={{ fontSize: 18 }}>
            🔧 {item.id}
          </b>

          <div style={mutedStyle}>
            {getDeviceName(item)}
          </div>
        </div>

        <Badge
          text="NA ÚDRŽBĚ"
          background="#ffedd5"
          color="#9a3412"
        />
      </div>

      <div
        style={{
          marginTop: 14,
          background: "#f9fafb",
          borderRadius: 11,
          padding: 12,
        }}
      >
        <b>🏢 Původní objekt</b>

        <div style={{ marginTop: 5 }}>
          {item.fromObjectName ||
            item.originalObjectName ||
            "—"}
        </div>

        <div style={smallStyle}>
          {item.fromLocation ||
            item.originalLocation ||
            item.location ||
            "—"}{" "}
          •{" "}
          {item.fromPosition ||
            item.originalPosition ||
            item.position ||
            "—"}
        </div>
      </div>

      <div
        style={{
          marginTop: 10,
          background: "#fff7ed",
          border:
            "1px solid #fed7aa",
          borderRadius: 11,
          padding: 12,
        }}
      >
        <b>⚠️ Důvod údržby</b>

        <div
          style={{
            marginTop: 5,
            fontSize: 14,
          }}
        >
          {item.maintenance?.reason ||
            item.history?.[0]?.note ||
            "Zjištěná závada"}
        </div>
      </div>

      <div
        style={{
          marginTop: 10,
          color: "#6b7280",
          fontSize: 13,
        }}
      >
        📅 Odesláno:{" "}
        {item.maintenanceDate || "—"}
      </div>

      <button
        onPointerDown={onReturn}
        style={{
          ...primaryButtonStyle,
          marginTop: 14,
        }}
      >
        🏢 Vrátit do objektu
      </button>

      <button
        onPointerDown={onStock}
        style={{
          ...actionButtonStyle,
          marginTop: 9,
        }}
      >
        📦 Dát na sklad
      </button>

      <button
        onPointerDown={onRetire}
        style={{
          ...actionButtonStyle,
          color: "#991b1b",
          marginTop: 0,
        }}
      >
        🗄️ Vyřadit
      </button>
    </div>
  );
}

/* =========================================================
   VYŘAZENÉ
========================================================= */

function RetiredList({
  retired,
  onRestoreStock,
  onRestoreObject,
  onDelete,
}) {
  return (
    <>
      <div style={cardStyle}>
        <b style={{ fontSize: 18 }}>
          🗄️ {retired.length} vyřazených
        </b>
      </div>

      {retired.length === 0 ? (
        <EmptyBox
          icon="🗄️"
          title="Nic není vyřazené"
          text="Vyřazené hasičáky se zobrazí zde."
        />
      ) : (
        retired.map((item) => (
          <div
            key={`${item.id}-${item.retiredDate}`}
            style={cardStyle}
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
                  {getDeviceIcon(item)}{" "}
                  {item.id}
                </b>

                <div style={mutedStyle}>
                  {getDeviceName(item)}
                </div>
              </div>

              <Badge
                text="VYŘAZENO"
                background="#fee2e2"
                color="#991b1b"
              />
            </div>

            <div
              style={{
                marginTop: 12,
                fontSize: 13,
                color: "#6b7280",
              }}
            >
              📅 Vyřazeno:{" "}
              {item.retiredDate || "—"}
            </div>

            <div
              style={{
                marginTop: 8,
                fontSize: 13,
                color: "#6b7280",
              }}
            >
              🏢 Původní objekt:{" "}
              {item.originalObjectName ||
                item.fromObjectName ||
                "Neuvedeno"}
            </div>

            <button
              onPointerDown={() =>
                onRestoreObject(item)
              }
              style={{
                ...primaryButtonStyle,
                marginTop: 12,
              }}
            >
              ♻️ Obnovit do objektu
            </button>

            <button
              onPointerDown={() =>
                onRestoreStock(item)
              }
              style={{
                ...actionButtonStyle,
                marginTop: 9,
              }}
            >
              📦 Vrátit na sklad
            </button>

            <button
              onPointerDown={() =>
                onDelete(item)
              }
              style={{
                ...actionButtonStyle,
                color: "#991b1b",
              }}
            >
              🗑️ Trvale smazat
            </button>
          </div>
        ))
      )}
    </>
  );
}

/* =========================================================
   HISTORIE
========================================================= */

function HistoryCard({
  item,
}) {
  const hasFault =
    item.result === "ZÁVADA";

  const faultNames = {
    PLAST: "Poškozený plášť",
    TLAK: "Nízký tlak",
    HADICE: "Poškozená hadice",
    PLOMBA:
      "Chybí plomba / problém s pojistkou",
    PRISTUP: "Špatně přístupný",
    VLASTNI: "Vlastní závada",
  };

  return (
    <div
      style={{
        ...cardStyle,
        borderLeft: hasFault
          ? "4px solid #dc2626"
          : "4px solid #16a34a",
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
            {hasFault
              ? "⚠️ Kontrola se závadou"
              : "✅ Kontrola bez závad"}
          </b>

          <div style={mutedStyle}>
            {item.date}
          </div>
        </div>

        <Badge
          text={item.result}
          background={
            hasFault
              ? "#fee2e2"
              : "#dcfce7"
          }
          color={
            hasFault
              ? "#991b1b"
              : "#166534"
          }
        />
      </div>

      {item.faults?.length > 0 && (
        <div style={{ marginTop: 12 }}>
          <b>Zjištěné závady:</b>

          {item.faults.map(
            (fault, index) => (
              <div
                key={index}
                style={{
                  marginTop: 5,
                  color: "#991b1b",
                }}
              >
                •{" "}
                {faultNames[fault] ||
                  fault}
              </div>
            )
          )}
        </div>
      )}

      {item.note && (
        <div
          style={{
            marginTop: 12,
            background: "#f9fafb",
            borderRadius: 10,
            padding: 10,
          }}
        >
          <b>📝 Poznámka:</b>

          <div style={{ marginTop: 4 }}>
            {item.note}
          </div>
        </div>
      )}

      {item.photo && (
        <img
          src={item.photo}
          alt="Fotografie kontroly"
          style={{
            width: "100%",
            maxHeight: 280,
            objectFit: "contain",
            borderRadius: 10,
            marginTop: 12,
            background: "#f3f4f6",
          }}
        />
      )}
    </div>
  );
}

/* =========================================================
   OSTATNÍ
========================================================= */

function SimplePlaceholder({
  screen,
}) {
  const item = menu.find(
    (entry) => entry[0] === screen
  );

  return (
    <>
      <h1>
        {item?.[1]} {item?.[2]}
      </h1>

      <div style={cardStyle}>
        Tuhle část ještě postupně
        doplníme. 😎
      </div>
    </>
  );
}

function EmptyBox({
  icon,
  title,
  text,
}) {
  return (
    <div style={cardStyle}>
      <div
        style={{
          textAlign: "center",
          padding: 20,
        }}
      >
        <div
          style={{
            fontSize: 40,
          }}
        >
          {icon}
        </div>

        <b
          style={{
            display: "block",
            marginTop: 8,
          }}
        >
          {title}
        </b>

        <div
          style={{
            color: "#6b7280",
            fontSize: 13,
            marginTop: 5,
          }}
        >
          {text}
        </div>
      </div>
    </div>
  );
}

function ModalHeader({
  title,
  subtitle,
  onClose,
}) {
  return (
    <div
      style={{
        display: "flex",
        justifyContent:
          "space-between",
        alignItems: "center",
        marginBottom: 18,
      }}
    >
      <div>
        <h2 style={{ margin: 0 }}>
          {title}
        </h2>

        <div style={mutedStyle}>
          {subtitle}
        </div>
      </div>

      <button
        onPointerDown={onClose}
        style={{
          border: 0,
          background: "#f3f4f6",
          borderRadius: 10,
          padding: "9px 12px",
          fontSize: 18,
        }}
      >
        ✕
      </button>
    </div>
  );
}

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
        padding: "11px 0",
        borderBottom:
          "1px solid #eee",
      }}
    >
      <span
        style={{
          color: "#6b7280",
        }}
      >
        {label}
      </span>

      <b
        style={{
          textAlign: "right",
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

  if (status === "NA ÚDRŽBĚ") {
    background = "#ffedd5";
    color = "#9a3412";
  }

  if (status === "SKLAD") {
    background = "#dcfce7";
    color = "#166534";
  }

  if (status === "VYŘAZENO") {
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
        padding: "6px 9px",
        borderRadius: 999,
        fontSize: 10,
        fontWeight: 800,
        whiteSpace: "nowrap",
        height: "fit-content",
      }}
    >
      {text}
    </span>
  );
}

/* =========================================================
   STYLY
========================================================= */

const cardStyle = {
  background: "white",
  border: "1px solid #e5e7eb",
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
  background: "#f3f4f6",
  border: "1px solid #e5e7eb",
  borderRadius: 10,
  padding: "10px 13px",
  fontWeight: 700,
};

const actionButtonStyle = {
  width: "100%",
  padding: 14,
  marginBottom: 9,
  border: "1px solid #e5e7eb",
  background: "#f9fafb",
  borderRadius: 11,
  textAlign: "left",
  fontWeight: 700,
  fontSize: 15,
};

const primaryButtonStyle = {
  width: "100%",
  background: "#111827",
  color: "white",
  border: 0,
  borderRadius: 12,
  padding: 16,
  fontSize: 16,
  fontWeight: 700,
};

const labelStyle = {
  display: "block",
  fontWeight: 700,
  fontSize: 14,
  marginBottom: 7,
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: 13,
  border: "1px solid #d1d5db",
  borderRadius: 10,
  fontSize: 16,
  marginBottom: 15,
  background: "white",
};

const helperStyle = {
  color: "#6b7280",
  fontSize: 12,
  marginTop: -9,
  marginBottom: 15,
};

const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  background: "rgba(0,0,0,.5)",
  zIndex: 200,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
};

const modalStyle = {
  width: "100%",
  maxWidth: 850,
  maxHeight: "94vh",
  overflowY: "auto",
  background: "white",
  borderRadius:
    "20px 20px 0 0",
  padding: 20,
  boxSizing: "border-box",
};

export default App;