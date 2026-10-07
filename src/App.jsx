import React, { useMemo, useState } from "react";

import {
  initialCustomers,
  initialObjects,
} from "./data/initialData";

import {
  createCustomerId,
  createObjectId,
} from "./utils/deviceId";

const menu = [
  ["dashboard", "🏠", "Přehled"],
  ["objects", "🏢", "Objekty"],
  ["stock", "📦", "Sklad"],
  ["reports", "📄", "Zprávy"],
  ["controls", "📅", "Kontroly"],
  ["more", "•••", "Více"],
];

function App() {
  const [screen, setScreen] =
    useState("dashboard");

  const [customers, setCustomers] =
    useState(initialCustomers);

  const [objects, setObjects] =
    useState(initialObjects);

  const [selectedObjectId, setSelectedObjectId] =
    useState(null);

  const [showAddObject, setShowAddObject] =
    useState(false);

  const selectedObject = objects.find(
    (object) =>
      object.id === selectedObjectId
  );

  const selectedCustomer =
    selectedObject
      ? customers.find(
          (customer) =>
            customer.id ===
            selectedObject.customerId
        )
      : null;

  function openObject(object) {
    setSelectedObjectId(object.id);
  }

  function closeObject() {
    setSelectedObjectId(null);
  }

  function addObject(data) {
    const newObject = {
      id: createObjectId(),

      name: data.name.trim(),

      customerId:
        data.customerId,

      address:
        data.address.trim(),

      devices: [],
    };

    setObjects((current) => [
      ...current,
      newObject,
    ]);

    setShowAddObject(false);
  }

  function addCustomer(name) {
    const cleanName = name.trim();

    if (!cleanName) {
      return null;
    }

    const existing =
      customers.find(
        (customer) =>
          customer.name.toLowerCase() ===
          cleanName.toLowerCase()
      );

    if (existing) {
      return existing.id;
    }

    const newCustomer = {
      id: createCustomerId(),
      name: cleanName,
    };

    setCustomers((current) => [
      ...current,
      newCustomer,
    ]);

    return newCustomer.id;
  }

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <b style={{ fontSize: 21 }}>
          🧯 Požárník AI
        </b>

        <span style={mutedStyle}>
          Evidence
        </span>
      </header>

      <main style={mainStyle}>
        {screen === "dashboard" && (
          <Dashboard
            objects={objects}
            customers={customers}
          />
        )}

        {screen === "objects" &&
          !selectedObject && (
            <ObjectsScreen
              objects={objects}
              customers={customers}
              onOpenObject={openObject}
              onAddObject={() =>
                setShowAddObject(true)
              }
            />
          )}

        {screen === "objects" &&
          selectedObject && (
            <ObjectDetail
              object={selectedObject}
              customer={selectedCustomer}
              onBack={closeObject}
            />
          )}

        {screen !== "dashboard" &&
          screen !== "objects" && (
            <Placeholder
              screen={screen}
            />
          )}
      </main>

      <nav style={navStyle}>
        {menu.map(
          ([id, icon, name]) => (
            <button
              key={id}
              onPointerDown={() => {
                setScreen(id);
                setSelectedObjectId(null);
              }}
              style={{
                ...navButtonStyle,

                background:
                  screen === id
                    ? "#f3f4f6"
                    : "transparent",

                color:
                  screen === id
                    ? "#111827"
                    : "#6b7280",
              }}
            >
              <span
                style={{
                  fontSize: 20,
                }}
              >
                {icon}
              </span>

              <small>
                {name}
              </small>
            </button>
          )
        )}
      </nav>

      {showAddObject && (
        <AddObjectModal
          customers={customers}
          onClose={() =>
            setShowAddObject(false)
          }
          onAddCustomer={addCustomer}
          onSave={addObject}
        />
      )}
    </div>
  );
}

/* =========================================================
   PŘEHLED
========================================================= */

function Dashboard({
  objects,
  customers,
}) {
  return (
    <>
      <h1 style={{ marginTop: 0 }}>
        Přehled
      </h1>

      <div style={cardStyle}>
        <b style={{ fontSize: 18 }}>
          🧯 Požárník AI
        </b>

        <div style={mutedStyle}>
          Centrální evidence požární
          techniky
        </div>
      </div>

      <div style={statsGrid}>
        <Stat
          number={customers.length}
          text="zákazníků"
        />

        <Stat
          number={objects.length}
          text="objektů"
        />

        <Stat
          number={objects.reduce(
            (sum, object) =>
              sum +
              object.devices.length,
            0
          )}
          text="zařízení"
        />

        <Stat
          number={0}
          text="na údržbě"
        />
      </div>

      <div
        style={{
          ...cardStyle,
          marginTop: 14,
        }}
      >
        <b>
          👥 Zákazníci
        </b>

        {customers.map(
          (customer) => (
            <div
              key={customer.id}
              style={{
                padding:
                  "12px 0",
                borderBottom:
                  "1px solid #eee",
              }}
            >
              {customer.name}
            </div>
          )
        )}
      </div>
    </>
  );
}

/* =========================================================
   OBJEKTY
========================================================= */

function ObjectsScreen({
  objects,
  customers,
  onOpenObject,
  onAddObject,
}) {
  const [search, setSearch] =
    useState("");

  const [customerFilter, setCustomerFilter] =
    useState("ALL");

  const filteredObjects =
    useMemo(() => {
      return objects.filter(
        (object) => {
          const customer =
            customers.find(
              (item) =>
                item.id ===
                object.customerId
            );

          const text =
            `${object.name} ${object.address} ${
              customer?.name || ""
            }`.toLowerCase();

          const matchesSearch =
            text.includes(
              search.toLowerCase()
            );

          const matchesCustomer =
            customerFilter === "ALL" ||
            object.customerId ===
              customerFilter;

          return (
            matchesSearch &&
            matchesCustomer
          );
        }
      );
    }, [
      objects,
      customers,
      search,
      customerFilter,
    ]);

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
          onPointerDown={
            onAddObject
          }
          style={primaryButtonStyle}
        >
          + Objekt
        </button>
      </div>

      <input
        value={search}
        onChange={(event) =>
          setSearch(
            event.target.value
          )
        }
        placeholder="🔎 Hledat objekt..."
        style={inputStyle}
      />

      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          marginBottom: 14,
        }}
      >
        <FilterButton
          active={
            customerFilter ===
            "ALL"
          }
          onClick={() =>
            setCustomerFilter(
              "ALL"
            )
          }
        >
          Všichni
        </FilterButton>

        {customers.map(
          (customer) => (
            <FilterButton
              key={customer.id}
              active={
                customerFilter ===
                customer.id
              }
              onClick={() =>
                setCustomerFilter(
                  customer.id
                )
              }
            >
              {customer.name}
            </FilterButton>
          )
        )}
      </div>

      {filteredObjects.length ===
      0 ? (
        <EmptyBox
          icon="🏢"
          title="Žádné objekty"
          text="Zkus změnit hledání nebo přidat nový objekt."
        />
      ) : (
        filteredObjects.map(
          (object) => {
            const customer =
              customers.find(
                (item) =>
                  item.id ===
                  object.customerId
              );

            return (
              <div
                key={object.id}
                style={cardStyle}
              >
                <b>
                  🏢 {object.name}
                </b>

                <div
                  style={
                    mutedStyle
                  }
                >
                  👥{" "}
                  {customer?.name ||
                    "Bez zákazníka"}
                </div>

                <div
                  style={{
                    ...smallStyle,
                    marginTop: 5,
                  }}
                >
                  📍{" "}
                  {object.address}
                </div>

                <div
                  style={{
                    marginTop: 12,
                    color: "#4b5563",
                  }}
                >
                  🧯{" "}
                  {object.devices.filter(
                    (device) =>
                      device.type !==
                      "HYDRANT"
                  ).length}{" "}
                  hasičáků
                  {" • "}
                  🚒{" "}
                  {object.devices.filter(
                    (device) =>
                      device.type ===
                      "HYDRANT"
                  ).length}{" "}
                  hydrantů
                </div>

                <button
                  onPointerDown={() =>
                    onOpenObject(
                      object
                    )
                  }
                  style={{
                    ...secondaryButtonStyle,
                    marginTop: 12,
                  }}
                >
                  DETAIL OBJEKTU →
                </button>
              </div>
            );
          }
        )
      )}
    </>
  );
}

/* =========================================================
   DETAIL OBJEKTU
========================================================= */

function ObjectDetail({
  object,
  customer,
  onBack,
}) {
  return (
    <>
      <button
        onPointerDown={onBack}
        style={backButtonStyle}
      >
        ← Zpět na objekty
      </button>

      <h1>
        🏢 {object.name}
      </h1>

      <div style={cardStyle}>
        <b>
          👥{" "}
          {customer?.name ||
            "Bez zákazníka"}
        </b>

        <div style={mutedStyle}>
          📍 {object.address}
        </div>
      </div>

      <div style={statsGrid}>
        <Stat
          number={
            object.devices.filter(
              (device) =>
                device.type !==
                "HYDRANT"
            ).length
          }
          text="hasičáků"
        />

        <Stat
          number={
            object.devices.filter(
              (device) =>
                device.type ===
                "HYDRANT"
            ).length
          }
          text="hydrantů"
        />
      </div>

      <div style={cardStyle}>
        <b>
          🧯 Zařízení
        </b>

        {object.devices.length ===
        0 ? (
          <div
            style={{
              color: "#6b7280",
              marginTop: 12,
            }}
          >
            Zatím zde nejsou žádná
            zařízení.
          </div>
        ) : (
          object.devices.map(
            (device) => (
              <div
                key={device.id}
                style={{
                  padding:
                    "12px 0",
                  borderBottom:
                    "1px solid #eee",
                }}
              >
                {device.type ===
                "HYDRANT"
                  ? "🚒"
                  : "🧯"}{" "}
                {device.id}
              </div>
            )
          )
        )}
      </div>
    </>
  );
}

/* =========================================================
   PŘIDAT OBJEKT
========================================================= */

function AddObjectModal({
  customers,
  onClose,
  onAddCustomer,
  onSave,
}) {
  const [name, setName] =
    useState("");

  const [address, setAddress] =
    useState("");

  const [customerId, setCustomerId] =
    useState(
      customers[0]?.id || ""
    );

  const [newCustomer, setNewCustomer] =
    useState("");

  function save() {
    if (!name.trim()) {
      alert(
        "Vyplň název objektu."
      );
      return;
    }

    if (!address.trim()) {
      alert(
        "Vyplň adresu objektu."
      );
      return;
    }

    let finalCustomerId =
      customerId;

    if (newCustomer.trim()) {
      finalCustomerId =
        onAddCustomer(
          newCustomer
        );
    }

    if (!finalCustomerId) {
      alert(
        "Vyber zákazníka nebo vytvoř nového."
      );
      return;
    }

    onSave({
      name,
      address,
      customerId:
        finalCustomerId,
    });
  }

  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        <ModalHeader
          title="🏢 Přidat objekt"
          subtitle="Nový objekt do evidence"
          onClose={onClose}
        />

        <label style={labelStyle}>
          Název objektu
        </label>

        <input
          value={name}
          onChange={(event) =>
            setName(
              event.target.value
            )
          }
          placeholder="Např. Panelový dům 135"
          style={inputStyle}
        />

        <label style={labelStyle}>
          Adresa
        </label>

        <input
          value={address}
          onChange={(event) =>
            setAddress(
              event.target.value
            )
          }
          placeholder="Např. Bílina, Ulice 135"
          style={inputStyle}
        />

        <label style={labelStyle}>
          Zákazník
        </label>

        <select
          value={customerId}
          onChange={(event) =>
            setCustomerId(
              event.target.value
            )
          }
          style={inputStyle}
        >
          {customers.map(
            (customer) => (
              <option
                key={customer.id}
                value={customer.id}
              >
                {customer.name}
              </option>
            )
          )}
        </select>

        <div
          style={{
            textAlign: "center",
            color: "#6b7280",
            margin:
              "0 0 12px",
          }}
        >
          nebo vytvoř nového
          zákazníka
        </div>

        <input
          value={newCustomer}
          onChange={(event) =>
            setNewCustomer(
              event.target.value
            )
          }
          placeholder="Např. SVJ Nová Bílina"
          style={inputStyle}
        />

        <button
          onPointerDown={save}
          style={primaryButtonStyle}
        >
          ✅ Vytvořit objekt
        </button>
      </div>
    </div>
  );
}

/* =========================================================
   POMOCNÉ KOMPONENTY
========================================================= */

function Stat({
  number,
  text,
}) {
  return (
    <div style={cardStyle}>
      <strong
        style={{
          fontSize: 26,
        }}
      >
        {number}
      </strong>

      <div
        style={{
          color: "#6b7280",
          fontSize: 13,
          marginTop: 3,
        }}
      >
        {text}
      </div>
    </div>
  );
}

function FilterButton({
  active,
  onClick,
  children,
}) {
  return (
    <button
      onPointerDown={onClick}
      style={{
        border:
          "1px solid #e5e7eb",
        borderRadius: 10,
        padding:
          "10px 13px",
        background: active
          ? "#111827"
          : "white",
        color: active
          ? "white"
          : "#111827",
        whiteSpace:
          "nowrap",
      }}
    >
      {children}
    </button>
  );
}

function Placeholder({
  screen,
}) {
  const item =
    menu.find(
      (entry) =>
        entry[0] === screen
    );

  return (
    <>
      <h1>
        {item?.[1]}{" "}
        {item?.[2]}
      </h1>

      <div style={cardStyle}>
        Tuhle část teď napojíme na
        další modul. 😎
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
          padding:
            "9px 12px",
          fontSize: 18,
        }}
      >
        ✕
      </button>
    </div>
  );
}

/* =========================================================
   STYLY
========================================================= */

const pageStyle = {
  minHeight: "100vh",
  background: "#f4f6f8",
  color: "#111827",
  fontFamily:
    "Arial, Helvetica, sans-serif",
  paddingBottom: 90,
};

const headerStyle = {
  position: "sticky",
  top: 0,
  zIndex: 10,
  background: "white",
  borderBottom:
    "1px solid #e5e7eb",
  padding: "16px 18px",
  display: "flex",
  justifyContent:
    "space-between",
  alignItems: "center",
};

const mainStyle = {
  maxWidth: 850,
  margin: "auto",
  padding: "22px 16px",
};

const navStyle = {
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
};

const navButtonStyle = {
  border: 0,
  minWidth: 55,
  borderRadius: 12,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent:
    "center",
  gap: 3,
  padding: 8,
};

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

const statsGrid = {
  display: "grid",
  gridTemplateColumns:
    "repeat(2, 1fr)",
  gap: 10,
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

const primaryButtonStyle = {
  background: "#111827",
  color: "white",
  border: 0,
  borderRadius: 10,
  padding:
    "11px 14px",
  fontWeight: 700,
};

const secondaryButtonStyle = {
  width: "100%",
  background: "#f3f4f6",
  border:
    "1px solid #e5e7eb",
  borderRadius: 10,
  padding: 11,
  fontWeight: 700,
};

const backButtonStyle = {
  background: "#f3f4f6",
  border:
    "1px solid #e5e7eb",
  borderRadius: 10,
  padding:
    "10px 13px",
  fontWeight: 700,
};

const inputStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: 13,
  border:
    "1px solid #d1d5db",
  borderRadius: 10,
  fontSize: 16,
  marginBottom: 15,
  background: "white",
};

const labelStyle = {
  display: "block",
  fontWeight: 700,
  fontSize: 14,
  marginBottom: 7,
};

const modalOverlayStyle = {
  position: "fixed",
  inset: 0,
  background:
    "rgba(0,0,0,.5)",
  zIndex: 200,
  display: "flex",
  alignItems: "flex-end",
  justifyContent:
    "center",
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
  boxSizing:
    "border-box",
};

export default App;