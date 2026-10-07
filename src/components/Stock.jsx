import React, { useMemo, useState } from "react";

const TYPE_INFO = {
  VODNI: {
    name: "Vodní",
    icon: "💧",
  },
  PRASKOVY: {
    name: "Práškový",
    icon: "🧯",
  },
  CO2: {
    name: "CO₂",
    icon: "❄️",
  },
};

function typeName(type) {
  return TYPE_INFO[type]?.name || type;
}

function typeIcon(type) {
  return TYPE_INFO[type]?.icon || "🧯";
}

function formatDate(date) {
  if (!date) return "—";

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return "—";
  }

  return d.toLocaleDateString("cs-CZ");
}

export default function Stock({
  stock = [],
  maintenance = [],
  retired = [],
  objects = [],
  onReturnToObject,
  onSendToMaintenance,
  onReturnFromMaintenance,
  onMoveMaintenanceToStock,
  onRetireStock,
  onRetireMaintenance,
  onRestoreRetiredToStock,
  onRestoreRetiredToObject,
  onDeleteRetired,
}) {
  const [tab, setTab] = useState("stock");
  const [search, setSearch] = useState("");

  const filteredStock = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return stock;

    return stock.filter((item) =>
      [
        item.id,
        item.serial,
        item.manufacturer,
        item.model,
        typeName(item.type),
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(q)
        )
    );
  }, [stock, search]);

  const filteredMaintenance = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return maintenance;

    return maintenance.filter((item) =>
      [
        item.id,
        item.serial,
        item.manufacturer,
        item.model,
        typeName(item.type),
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(q)
        )
    );
  }, [maintenance, search]);

  const filteredRetired = useMemo(() => {
    const q = search.trim().toLowerCase();

    if (!q) return retired;

    return retired.filter((item) =>
      [
        item.id,
        item.serial,
        item.manufacturer,
        item.model,
        typeName(item.type),
      ]
        .filter(Boolean)
        .some((value) =>
          String(value).toLowerCase().includes(q)
        )
    );
  }, [retired, search]);

  const currentCount =
    tab === "stock"
      ? stock.length
      : tab === "maintenance"
        ? maintenance.length
        : retired.length;

  const currentItems =
    tab === "stock"
      ? filteredStock
      : tab === "maintenance"
        ? filteredMaintenance
        : filteredRetired;

  return (
    <div className="page">
      {/* HEADER */}
      <div className="page-header">
        <div>
          <h1>📦 Sklad</h1>
          <p>
            Přehled hasičáků mimo objekty a jejich stav.
          </p>
        </div>

        <div
          style={{
            background: "#111827",
            color: "#fff",
            borderRadius: 16,
            padding: "12px 18px",
            minWidth: 90,
            textAlign: "center",
          }}
        >
          <div
            style={{
              fontSize: 26,
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            {currentCount}
          </div>

          <div
            style={{
              fontSize: 12,
              opacity: 0.75,
              marginTop: 5,
            }}
          >
            {tab === "stock"
              ? "na skladě"
              : tab === "maintenance"
                ? "na údržbě"
                : "vyřazených"}
          </div>
        </div>
      </div>

      {/* TABS */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 8,
          marginBottom: 16,
        }}
      >
        <button
          type="button"
          onPointerDown={() => setTab("stock")}
          style={{
            border: "none",
            borderRadius: 14,
            padding: "13px 8px",
            fontWeight: 800,
            cursor: "pointer",
            background:
              tab === "stock" ? "#111827" : "#f3f4f6",
            color:
              tab === "stock" ? "#fff" : "#374151",
          }}
        >
          📦 Na skladě
          <div
            style={{
              fontSize: 12,
              marginTop: 3,
              opacity: 0.8,
            }}
          >
            {stock.length} ks
          </div>
        </button>

        <button
          type="button"
          onPointerDown={() => setTab("maintenance")}
          style={{
            border: "none",
            borderRadius: 14,
            padding: "13px 8px",
            fontWeight: 800,
            cursor: "pointer",
            background:
              tab === "maintenance"
                ? "#111827"
                : "#f3f4f6",
            color:
              tab === "maintenance"
                ? "#fff"
                : "#374151",
          }}
        >
          🔧 Údržba
          <div
            style={{
              fontSize: 12,
              marginTop: 3,
              opacity: 0.8,
            }}
          >
            {maintenance.length} ks
          </div>
        </button>

        <button
          type="button"
          onPointerDown={() => setTab("retired")}
          style={{
            border: "none",
            borderRadius: 14,
            padding: "13px 8px",
            fontWeight: 800,
            cursor: "pointer",
            background:
              tab === "retired"
                ? "#111827"
                : "#f3f4f6",
            color:
              tab === "retired"
                ? "#fff"
                : "#374151",
          }}
        >
          🗄️ Vyřazené
          <div
            style={{
              fontSize: 12,
              marginTop: 3,
              opacity: 0.8,
            }}
          >
            {retired.length} ks
          </div>
        </button>
      </div>

      {/* SEARCH */}
      <div style={{ marginBottom: 16 }}>
        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="🔎 Hledat podle ID, sériového čísla, modelu..."
          style={{
            width: "100%",
            boxSizing: "border-box",
            padding: "14px 16px",
            borderRadius: 14,
            border: "1px solid #d1d5db",
            fontSize: 15,
            outline: "none",
          }}
        />
      </div>

      {/* INFO */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 12,
        }}
      >
        <strong>
          {tab === "stock"
            ? "📦 Hasičáky na skladě"
            : tab === "maintenance"
              ? "🔧 Hasičáky na údržbě"
              : "🗄️ Vyřazené hasičáky"}
        </strong>

        <span
          style={{
            color: "#6b7280",
            fontSize: 13,
          }}
        >
          {currentItems.length} z {currentCount} ks
        </span>
      </div>

      {/* EMPTY */}
      {currentItems.length === 0 && (
        <div
          style={{
            background: "#fff",
            border: "1px solid #e5e7eb",
            borderRadius: 18,
            padding: 28,
            textAlign: "center",
            color: "#6b7280",
          }}
        >
          <div style={{ fontSize: 42, marginBottom: 8 }}>
            {tab === "stock"
              ? "📦"
              : tab === "maintenance"
                ? "🔧"
                : "🗄️"}
          </div>

          <strong>
            {search
              ? "Nic nenalezeno"
              : tab === "stock"
                ? "Sklad je prázdný"
                : tab === "maintenance"
                  ? "Momentálně není nic na údržbě"
                  : "Žádné vyřazené kusy"}
          </strong>

          {search && (
            <div style={{ marginTop: 5 }}>
              Zkus jiný výraz.
            </div>
          )}
        </div>
      )}

      {/* ITEMS */}
      <div
        style={{
          display: "grid",
          gap: 12,
        }}
      >
        {currentItems.map((item) => (
          <StockItem
            key={item.id}
            item={item}
            tab={tab}
            objects={objects}
            onReturnToObject={onReturnToObject}
            onSendToMaintenance={onSendToMaintenance}
            onReturnFromMaintenance={
              onReturnFromMaintenance
            }
            onMoveMaintenanceToStock={
              onMoveMaintenanceToStock
            }
            onRetireStock={onRetireStock}
            onRetireMaintenance={
              onRetireMaintenance
            }
            onRestoreRetiredToStock={
              onRestoreRetiredToStock
            }
            onRestoreRetiredToObject={
              onRestoreRetiredToObject
            }
            onDeleteRetired={onDeleteRetired}
          />
        ))}
      </div>
    </div>
  );
}

function StockItem({
  item,
  tab,
  objects,
  onReturnToObject,
  onSendToMaintenance,
  onReturnFromMaintenance,
  onMoveMaintenanceToStock,
  onRetireStock,
  onRetireMaintenance,
  onRestoreRetiredToStock,
  onRestoreRetiredToObject,
  onDeleteRetired,
}) {
  const [showObjects, setShowObjects] =
    useState(false);

  const [selectedObjectId, setSelectedObjectId] =
    useState(
      item.originalObjectId ||
        objects[0]?.id ||
        ""
    );

  const object = objects.find(
    (obj) => obj.id === selectedObjectId
  );

  const location =
    item.originalLocation || "Neuvedeno";

  return (
    <div
      style={{
        background: "#fff",
        border: "1px solid #e5e7eb",
        borderRadius: 18,
        padding: 16,
        boxShadow:
          "0 3px 12px rgba(0,0,0,0.04)",
      }}
    >
      {/* TOP */}
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        <div style={{ minWidth: 0 }}>
          <div
            style={{
              fontSize: 18,
              fontWeight: 800,
            }}
          >
            {typeIcon(item.type)}{" "}
            {typeName(item.type)}
          </div>

          <div
            style={{
              marginTop: 5,
              color: "#374151",
              fontWeight: 600,
            }}
          >
            {item.model || "Bez modelu"}
          </div>
        </div>

        <div
          style={{
            background: "#f3f4f6",
            borderRadius: 10,
            padding: "7px 9px",
            fontSize: 11,
            fontWeight: 800,
            whiteSpace: "nowrap",
          }}
        >
          {item.id}
        </div>
      </div>

      {/* DETAILS */}
      <div
        style={{
          marginTop: 14,
          display: "grid",
          gap: 6,
          fontSize: 13,
          color: "#4b5563",
        }}
      >
        <div>
          <strong>Sériové číslo:</strong>{" "}
          {item.serial || "—"}
        </div>

        <div>
          <strong>Výrobce:</strong>{" "}
          {item.manufacturer || "—"}
        </div>

        {item.manufactureYear && (
          <div>
            <strong>Rok výroby:</strong>{" "}
            {item.manufactureYear}
          </div>
        )}

        {tab === "stock" && (
          <div>
            <strong>Přijato:</strong>{" "}
            {formatDate(item.receivedDate)}
          </div>
        )}

        {tab === "maintenance" && (
          <>
            <div>
              <strong>Na údržbě od:</strong>{" "}
              {formatDate(item.maintenanceDate)}
            </div>

            {item.maintenanceReason && (
              <div>
                <strong>Důvod:</strong>{" "}
                {item.maintenanceReason}
              </div>
            )}
          </>
        )}

        {item.originalObjectId && (
          <div>
            <strong>Původní objekt:</strong>{" "}
            {objects.find(
              (obj) =>
                obj.id === item.originalObjectId
            )?.name || "—"}
          </div>
        )}

        {item.originalLocation && (
          <div>
            <strong>Původní umístění:</strong>{" "}
            {item.originalLocation}
          </div>
        )}

        {tab === "retired" && (
          <div>
            <strong>Vyřazeno:</strong>{" "}
            {formatDate(item.retiredDate)}
          </div>
        )}
      </div>

      {/* ACTIONS */}
      <div
        style={{
          marginTop: 16,
          display: "grid",
          gap: 8,
        }}
      >
        {tab === "stock" && (
          <>
            <button
              type="button"
              onPointerDown={() =>
                setShowObjects(!showObjects)
              }
              style={primaryButtonStyle}
            >
              🏢 Vrátit do objektu
            </button>

            {showObjects && (
              <div
                style={{
                  background: "#f9fafb",
                  borderRadius: 14,
                  padding: 12,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  Vyber objekt
                </div>

                <select
                  value={selectedObjectId}
                  onChange={(e) =>
                    setSelectedObjectId(
                      e.target.value
                    )
                  }
                  style={selectStyle}
                >
                  {objects.map((obj) => (
                    <option
                      key={obj.id}
                      value={obj.id}
                    >
                      {obj.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  disabled={!object}
                  onPointerDown={() => {
                    if (!object) return;

                    onReturnToObject?.(
                      item.id,
                      object.id,
                      item.originalLocation ||
                        ""
                    );

                    setShowObjects(false);
                  }}
                  style={{
                    ...primaryButtonStyle,
                    marginTop: 8,
                    opacity: object ? 1 : 0.5,
                  }}
                >
                  🏢 Potvrdit objekt
                </button>
              </div>
            )}

            <button
              type="button"
              onPointerDown={() =>
                onSendToMaintenance?.(item.id)
              }
              style={secondaryButtonStyle}
            >
              🔧 Poslat na údržbu
            </button>

            <button
              type="button"
              onPointerDown={() =>
                onRetireStock?.(item.id)
              }
              style={dangerButtonStyle}
            >
              🗄️ Vyřadit
            </button>
          </>
        )}

        {tab === "maintenance" && (
          <>
            <button
              type="button"
              onPointerDown={() =>
                setShowObjects(!showObjects)
              }
              style={primaryButtonStyle}
            >
              🏢 Vrátit do objektu
            </button>

            {showObjects && (
              <div
                style={{
                  background: "#f9fafb",
                  borderRadius: 14,
                  padding: 12,
                }}
              >
                <div
                  style={{
                    fontWeight: 700,
                    marginBottom: 8,
                  }}
                >
                  Vyber objekt
                </div>

                <select
                  value={selectedObjectId}
                  onChange={(e) =>
                    setSelectedObjectId(
                      e.target.value
                    )
                  }
                  style={selectStyle}
                >
                  {objects.map((obj) => (
                    <option
                      key={obj.id}
                      value={obj.id}
                    >
                      {obj.name}
                    </option>
                  ))}
                </select>

                <button
                  type="button"
                  disabled={!object}
                  onPointerDown={() => {
                    if (!object) return;

                    onReturnFromMaintenance?.(
                      item.id,
                      object.id,
                      item.originalLocation ||
                        ""
                    );

                    setShowObjects(false);
                  }}
                  style={{
                    ...primaryButtonStyle,
                    marginTop: 8,
                    opacity: object ? 1 : 0.5,
                  }}
                >
                  🏢 Potvrdit objekt
                </button>
              </div>
            )}

            <button
              type="button"
              onPointerDown={() =>
                onMoveMaintenanceToStock?.(
                  item.id
                )
              }
              style={secondaryButtonStyle}
            >
              📦 Dát na sklad
            </button>

            <button
              type="button"
              onPointerDown={() =>
                onRetireMaintenance?.(
                  item.id
                )
              }
              style={dangerButtonStyle}
            >
              🗄️ Vyřadit
            </button>
          </>
        )}

        {tab === "retired" && (
          <>
            <button
              type="button"
              onPointerDown={() =>
                onRestoreRetiredToObject?.(
                  item.id,
                  item.originalObjectId,
                  item.originalLocation
                )
              }
              style={primaryButtonStyle}
            >
              ♻️ Obnovit do původního objektu
            </button>

            <button
              type="button"
              onPointerDown={() =>
                onRestoreRetiredToStock?.(
                  item.id
                )
              }
              style={secondaryButtonStyle}
            >
              📦 Vrátit na sklad
            </button>

            <button
              type="button"
              onPointerDown={() => {
                const confirmed =
                  window.confirm(
                    "Opravdu chceš tento kus trvale smazat?"
                  );

                if (confirmed) {
                  onDeleteRetired?.(
                    item.id
                  );
                }
              }}
              style={dangerButtonStyle}
            >
              🗑️ Trvale smazat
            </button>
          </>
        )}
      </div>
    </div>
  );
}

const primaryButtonStyle = {
  width: "100%",
  border: "none",
  borderRadius: 12,
  padding: "12px 14px",
  background: "#111827",
  color: "#fff",
  fontWeight: 800,
  cursor: "pointer",
};

const secondaryButtonStyle = {
  width: "100%",
  border: "1px solid #d1d5db",
  borderRadius: 12,
  padding: "12px 14px",
  background: "#fff",
  color: "#111827",
  fontWeight: 800,
  cursor: "pointer",
};

const dangerButtonStyle = {
  width: "100%",
  border: "1px solid #fecaca",
  borderRadius: 12,
  padding: "12px 14px",
  background: "#fff1f2",
  color: "#b91c1c",
  fontWeight: 800,
  cursor: "pointer",
};

const selectStyle = {
  width: "100%",
  boxSizing: "border-box",
  padding: "12px",
  borderRadius: 10,
  border: "1px solid #d1d5db",
  background: "#fff",
  fontSize: 14,
};