import React, { useMemo, useState } from "react";

import {
  initialCustomers,
  initialObjects,
  initialStock,
  initialMaintenance,
  initialRetired,
} from "./data/initialData";

import {
  createObjectId,
  createCustomerId,
  createDeviceId,
} from "./utils/deviceId";

import {
  LEGAL_RULES,
  calculatePeriodicYear,
  calculateLifeEnd,
  getDeviceStatus,
  getStatusIcon,
  formatDate,
} from "./utils/deadlines";

const menu = [
  ["dashboard", "🏠", "Přehled"],
  ["objects", "🏢", "Objekty"],
  ["stock", "📦", "Sklad"],
  ["reports", "📄", "Zprávy"],
  ["controls", "📅", "Kontroly"],
  ["more", "•••", "Více"],
];

const FAULTS = [
  ["PLAST", "🔩", "Poškozený plášť"],
  ["PLOMBA", "🔒", "Chybí plomba"],
  ["HADICE", "💦", "Poškozená hadice / tryska"],
  ["TLAK", "📉", "Nízký tlak"],
  ["DRZAK", "🧱", "Poškozený držák"],
  ["PRISTUP", "🚧", "Špatně přístupný"],
  ["JINA", "📝", "Jiná závada"],
];

function App() {
  const [screen, setScreen] = useState("dashboard");

  const [customers, setCustomers] = useState(initialCustomers);
  const [objects, setObjects] = useState(initialObjects);
  const [stock, setStock] = useState(initialStock);
  const [maintenance, setMaintenance] =
    useState(initialMaintenance);
  const [retired, setRetired] = useState(initialRetired);

  const [selectedObjectId, setSelectedObjectId] =
    useState(null);

  const [selectedDeviceId, setSelectedDeviceId] =
    useState(null);

  const [showAddObject, setShowAddObject] =
    useState(false);

  const [showAddDevice, setShowAddDevice] =
    useState(false);

  const [showInspection, setShowInspection] =
    useState(false);

  const [showAddStock, setShowAddStock] =
    useState(false);

  const [controlYear, setControlYear] =
    useState(2027);

  const [octoberObjects, setOctoberObjects] =
    useState([]);

  const selectedObject = objects.find(
    (object) => object.id === selectedObjectId
  );

  const selectedDevice = selectedObject?.devices?.find(
    (device) => device.id === selectedDeviceId
  );

  function goTo(nextScreen) {
    setScreen(nextScreen);
    setSelectedObjectId(null);
    setSelectedDeviceId(null);
  }

  function openObject(object) {
    setSelectedObjectId(object.id);
    setSelectedDeviceId(null);
    setScreen("objects");
  }

  function openDevice(objectId, deviceId) {
    setSelectedObjectId(objectId);
    setSelectedDeviceId(deviceId);
    setScreen("objects");
  }

  function closeDevice() {
    setSelectedDeviceId(null);
  }

  function addObject(data) {
    const newObject = {
      id: createObjectId(),
      name: data.name.trim(),
      customerId: data.customerId,
      address: data.address.trim(),
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

    const existing = customers.find(
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

  function addDevice(data) {
    if (!selectedObject) {
      return;
    }

    const isHydrant =
      data.type === "HYDRANT";

    const newDevice = {
      id: createDeviceId(
        isHydrant ? "HYD" : "POZ"
      ),

      type: data.type,

      serial:
        data.serial?.trim() || "",

      number:
        data.number?.trim() || "",

      manufacturer:
        data.manufacturer?.trim() || "",

      model:
        data.model?.trim() || "",

      manufactureYear:
        data.manufactureYear
          ? Number(data.manufactureYear)
          : null,

      location:
        data.location?.trim() || "",

      note:
        data.note?.trim() || "",

      status: "V POŘÁDKU",

      history: [],

      lastCheck: null,
      nextCheck: null,

      lastPeriodicYear: null,
      nextPeriodicYear: null,

      lifeEndYear:
        isHydrant
          ? null
          : calculateLifeEnd(
              data.type,
              data.manufactureYear
            ),
    };

    setObjects((current) =>
      current.map((object) => {
        if (object.id !== selectedObject.id) {
          return object;
        }

        return {
          ...object,
          devices: [
            ...object.devices,
            newDevice,
          ],
        };
      })
    );

    setShowAddDevice(false);
  }

  function finishInspection(result) {
    if (!selectedObject || !selectedDevice) {
      return;
    }

    const today = new Date()
      .toISOString()
      .slice(0, 10);

    const faults = result.faults || [];

    const hasFault =
      faults.length > 0 ||
      Boolean(result.note?.trim());

    const isHydrant =
      selectedDevice.type === "HYDRANT";

    let nextPeriodicYear =
      selectedDevice.nextPeriodicYear;

    if (
      !isHydrant &&
      result.periodicYear
    ) {
      nextPeriodicYear =
        calculatePeriodicYear(
          selectedDevice.type,
          Number(result.periodicYear)
        );
    }

    const nextCheckDate =
      new Date(today);

    nextCheckDate.setFullYear(
      nextCheckDate.getFullYear() + 1
    );

    const nextCheck =
      nextCheckDate
        .toISOString()
        .slice(0, 10);

    const historyItem = {
      id: `HIS-${Date.now()}`,
      date: today,
      result: hasFault
        ? "ZÁVADA"
        : "V POŘÁDKU",
      faults,
      note: result.note?.trim() || "",
      photo: result.photo || null,
      type: isHydrant
        ? "KONTROLA HYDRANTU"
        : "KONTROLA HASICÍHO PŘÍSTROJE",
    };

    setObjects((current) =>
      current.map((object) => {
        if (object.id !== selectedObject.id) {
          return object;
        }

        return {
          ...object,

          devices: object.devices.map(
            (device) => {
              if (
                device.id !==
                selectedDevice.id
              ) {
                return device;
              }

              return {
                ...device,

                history: [
                  ...(device.history || []),
                  historyItem,
                ],

                lastCheck: today,
                nextCheck,

                lastPeriodicYear:
                  result.periodicYear
                    ? Number(
                        result.periodicYear
                      )
                    : device.lastPeriodicYear,

                nextPeriodicYear,

                status: hasFault
                  ? "MUSÍ NA ÚDRŽBU"
                  : "V POŘÁDKU",

                activeFaults:
                  hasFault
                    ? faults
                    : [],
              };
            }
          ),
        };
      })
    );

    setShowInspection(false);
  }

  function sendDeviceToMaintenance() {
    if (!selectedObject || !selectedDevice) {
      return;
    }

    const status =
      getDeviceStatus(selectedDevice);

    if (
      status !== "MUSÍ NA ÚDRŽBU" &&
      status !== "PO EXPIRACI"
    ) {
      alert(
        "Tento hasičák momentálně nepotřebuje údržbu."
      );
      return;
    }

    const maintenanceItem = {
      ...selectedDevice,

      originalObjectId:
        selectedObject.id,

      originalObjectName:
        selectedObject.name,

      originalLocation:
        selectedDevice.location || "",

      maintenanceSince:
        new Date()
          .toISOString()
          .slice(0, 10),

      maintenanceReason:
        selectedDevice.activeFaults?.length
          ? "Závada"
          : "Údržba / periodická zkouška",
    };

    setMaintenance((current) => [
      ...current,
      maintenanceItem,
    ]);

    setObjects((current) =>
      current.map((object) =>
        object.id === selectedObject.id
          ? {
              ...object,
              devices:
                object.devices.filter(
                  (device) =>
                    device.id !==
                    selectedDevice.id
                ),
            }
          : object
      )
    );

    setSelectedDeviceId(null);
  }

  function returnMaintenanceToObject(
    item,
    targetObjectId = null,
    targetLocation = null
  ) {
    const objectId =
      targetObjectId ||
      item.originalObjectId;

    if (!objectId) {
      alert(
        "Není vybraný cílový objekt."
      );
      return;
    }

    const restoredDevice = {
      ...item,

      status: "V POŘÁDKU",

      location:
        targetLocation ||
        item.originalLocation ||
        "",

      maintenanceSince: null,
      maintenanceReason: null,
      originalObjectId: null,
      originalObjectName: null,
      originalLocation: null,
    };

    setObjects((current) =>
      current.map((object) =>
        object.id === objectId
          ? {
              ...object,
              devices: [
                ...object.devices,
                restoredDevice,
              ],
            }
          : object
      )
    );

    setMaintenance((current) =>
      current.filter(
        (device) =>
          device.id !== item.id
      )
    );
  }

  function moveMaintenanceToStock(item) {
    const stockItem = {
      ...item,

      status: "NA SKLADĚ",

      maintenanceSince: null,
      maintenanceReason: null,
    };

    setStock((current) => [
      ...current,
      stockItem,
    ]);

    setMaintenance((current) =>
      current.filter(
        (device) =>
          device.id !== item.id
      )
    );
  }

  function returnStockToObject(
    item,
    targetObjectId = null,
    targetLocation = null
  ) {
    const objectId =
      targetObjectId ||
      item.originalObjectId;

    if (!objectId) {
      alert(
        "Vyber objekt, kam se má hasičák vrátit."
      );
      return;
    }

    const restoredDevice = {
      ...item,

      status: "V POŘÁDKU",

      location:
        targetLocation ||
        item.originalLocation ||
        "",
    };

    setObjects((current) =>
      current.map((object) =>
        object.id === objectId
          ? {
              ...object,
              devices: [
                ...object.devices,
                restoredDevice,
              ],
            }
          : object
      )
    );

    setStock((current) =>
      current.filter(
        (device) =>
          device.id !== item.id
      )
    );
  }

  function retireStock(item) {
    setRetired((current) => [
      ...current,
      {
        ...item,

        retiredAt:
          new Date()
            .toISOString()
            .slice(0, 10),

        retiredFrom: "SKLAD",
      },
    ]);

    setStock((current) =>
      current.filter(
        (device) =>
          device.id !== item.id
      )
    );
  }

  function retireMaintenance(item) {
    setRetired((current) => [
      ...current,
      {
        ...item,

        retiredAt:
          new Date()
            .toISOString()
            .slice(0, 10),

        retiredFrom: "ÚDRŽBA",
      },
    ]);

    setMaintenance((current) =>
      current.filter(
        (device) =>
          device.id !== item.id
      )
    );
  }

  function retireObjectDevice() {
    if (!selectedObject || !selectedDevice) {
      return;
    }

    setRetired((current) => [
      ...current,
      {
        ...selectedDevice,

        originalObjectId:
          selectedObject.id,

        originalObjectName:
          selectedObject.name,

        originalLocation:
          selectedDevice.location || "",

        retiredAt:
          new Date()
            .toISOString()
            .slice(0, 10),

        retiredFrom: "OBJEKT",
      },
    ]);

    setObjects((current) =>
      current.map((object) =>
        object.id === selectedObject.id
          ? {
              ...object,
              devices:
                object.devices.filter(
                  (device) =>
                    device.id !==
                    selectedDevice.id
                ),
            }
          : object
      )
    );

    setSelectedDeviceId(null);
  }

  function restoreRetiredToStock(item) {
    setStock((current) => [
      ...current,
      {
        ...item,

        status: "NA SKLADĚ",

        retiredAt: null,
        retiredFrom: null,
      },
    ]);

    setRetired((current) =>
      current.filter(
        (device) =>
          device.id !== item.id
      )
    );
  }

  function restoreRetiredToObject(item) {
    if (!item.originalObjectId) {
      alert(
        "Původní objekt už není uložen."
      );
      return;
    }

    setObjects((current) =>
      current.map((object) =>
        object.id ===
        item.originalObjectId
          ? {
              ...object,
              devices: [
                ...object.devices,
                {
                  ...item,
                  status: "V POŘÁDKU",
                  retiredAt: null,
                  retiredFrom: null,
                },
              ],
            }
          : object
      )
    );

    setRetired((current) =>
      current.filter(
        (device) =>
          device.id !== item.id
      )
    );
  }

  function permanentlyDelete(item) {
    const yes = window.confirm(
      `Opravdu trvale smazat ${item.id}?`
    );

    if (!yes) {
      return;
    }

    setRetired((current) =>
      current.filter(
        (device) =>
          device.id !== item.id
      )
    );
  }

  function addStock(data) {
    const item = {
      id: createDeviceId("POZ"),

      type: data.type,

      serial:
        data.serial?.trim() || "",

      manufacturer:
        data.manufacturer?.trim() || "",

      model:
        data.model?.trim() || "",

      manufactureYear:
        data.manufactureYear
          ? Number(data.manufactureYear)
          : null,

      receivedDate:
        data.receivedDate ||
        new Date()
          .toISOString()
          .slice(0, 10),

      note:
        data.note?.trim() || "",

      status: "NA SKLADĚ",

      originalObjectId: null,
      originalObjectName: null,
      originalLocation: null,

      history: [],

      lifeEndYear:
        calculateLifeEnd(
          data.type,
          data.manufactureYear
        ),
    };

    setStock((current) => [
      ...current,
      item,
    ]);

    setShowAddStock(false);
  }

  const totalExtinguishers =
    objects.reduce(
      (sum, object) =>
        sum +
        object.devices.filter(
          (device) =>
            device.type !== "HYDRANT"
        ).length,
      0
    );

  const totalHydrants =
    objects.reduce(
      (sum, object) =>
        sum +
        object.devices.filter(
          (device) =>
            device.type === "HYDRANT"
        ).length,
      0
    );

  const activeFaults =
    objects.reduce(
      (sum, object) =>
        sum +
        object.devices.filter(
          (device) =>
            device.status ===
            "MUSÍ NA ÚDRŽBU"
        ).length,
      0
    );

  const lifeEndingThisYear =
    objects.reduce(
      (sum, object) =>
        sum +
        object.devices.filter(
          (device) =>
            Number(device.lifeEndYear) ===
            new Date().getFullYear()
        ).length,
      0
    );

  return (
    <div style={pageStyle}>
      <header style={headerStyle}>
        <div>
          <b style={{ fontSize: 21 }}>
            🧯 Požárník AI
          </b>

          <div style={mutedStyle}>
            Centrální evidence požární techniky
          </div>
        </div>
      </header>

      <main style={mainStyle}>
        {screen === "dashboard" && (
          <Dashboard
            objects={objects}
            totalExtinguishers={
              totalExtinguishers
            }
            totalHydrants={
              totalHydrants
            }
            stock={stock}
            maintenance={maintenance}
            activeFaults={
              activeFaults
            }
            lifeEndingThisYear={
              lifeEndingThisYear
            }
            onOpenObject={openObject}
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
          selectedObject &&
          !selectedDevice && (
            <ObjectDetail
              object={selectedObject}
              customer={
                customers.find(
                  (customer) =>
                    customer.id ===
                    selectedObject.customerId
                )
              }
              onBack={() =>
                setSelectedObjectId(null)
              }
              onOpenDevice={(deviceId) =>
                openDevice(
                  selectedObject.id,
                  deviceId
                )
              }
              onAddDevice={() =>
                setShowAddDevice(true)
              }
            />
          )}

        {screen === "objects" &&
          selectedObject &&
          selectedDevice && (
            <DeviceDetail
              object={selectedObject}
              device={selectedDevice}
              onBack={closeDevice}
              onInspect={() =>
                setShowInspection(true)
              }
              onMaintenance={
                sendDeviceToMaintenance
              }
              onRetire={
                retireObjectDevice
              }
            />
          )}

        {screen === "stock" && (
          <StockScreen
            stock={stock}
            objects={objects}
            onAdd={() =>
              setShowAddStock(true)
            }
            onReturn={returnStockToObject}
            onRetire={retireStock}
          />
        )}

        {screen === "reports" && (
          <ReportsScreen
            objects={objects}
          />
        )}

        {screen === "controls" && (
          <ControlsScreen
            objects={objects}
            year={controlYear}
            setYear={setControlYear}
            octoberObjects={
              octoberObjects
            }
            setOctoberObjects={
              setOctoberObjects
            }
          />
        )}

        {screen === "more" && (
          <MoreScreen
            maintenance={maintenance}
            retired={retired}
            objects={objects}
            onMaintenanceToObject={
              returnMaintenanceToObject
            }
            onMaintenanceToStock={
              moveMaintenanceToStock
            }
            onMaintenanceRetire={
              retireMaintenance
            }
            onRestoreStock={
              restoreRetiredToStock
            }
            onRestoreObject={
              restoreRetiredToObject
            }
            onDelete={
              permanentlyDelete
            }
          />
        )}
      </main>

      <nav style={navStyle}>
        {menu.map(
          ([id, icon, name]) => (
            <button
              key={id}
              onPointerDown={() =>
                goTo(id)
              }
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

              <small>{name}</small>
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

      {showAddDevice && (
        <AddDeviceModal
          onClose={() =>
            setShowAddDevice(false)
          }
          onSave={addDevice}
        />
      )}

      {showInspection && (
        <InspectionModal
          device={selectedDevice}
          onClose={() =>
            setShowInspection(false)
          }
          onSave={finishInspection}
        />
      )}

      {showAddStock && (
        <AddStockModal
          onClose={() =>
            setShowAddStock(false)
          }
          onSave={addStock}
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
  totalExtinguishers,
  totalHydrants,
  stock,
  maintenance,
  activeFaults,
  lifeEndingThisYear,
  onOpenObject,
}) {
  const attention = [];

  objects.forEach((object) => {
    object.devices.forEach((device) => {
      const status =
        getDeviceStatus(device);

      if (
        status === "PO EXPIRACI" ||
        status === "MUSÍ NA ÚDRŽBU"
      ) {
        attention.push({
          object,
          device,
          status,
        });
      }

      if (
        device.nextPeriodicYear &&
        Number(device.nextPeriodicYear) ===
          new Date().getFullYear()
      ) {
        attention.push({
          object,
          device,
          status: "PERIODICKÁ ZKOUŠKA",
        });
      }

      if (
        device.lifeEndYear &&
        Number(device.lifeEndYear) ===
          new Date().getFullYear()
      ) {
        attention.push({
          object,
          device,
          status: "KONEC ŽIVOTNOSTI",
        });
      }
    });
  });

  const uniqueAttention =
    attention.filter(
      (item, index, array) =>
        array.findIndex(
          (other) =>
            other.device.id ===
            item.device.id
        ) === index
    );

  return (
    <>
      <h1 style={{ marginTop: 0 }}>
        Přehled
      </h1>

      <div style={statsGrid}>
        <Stat
          icon="🏢"
          number={objects.length}
          text="objektů"
        />

        <Stat
          icon="🧯"
          number={totalExtinguishers}
          text="hasičáků"
        />

        <Stat
          icon="🚒"
          number={totalHydrants}
          text="hydrantů"
        />

        <Stat
          icon="📦"
          number={stock.length}
          text="na skladě"
        />

        <Stat
          icon="🔧"
          number={maintenance.length}
          text="na údržbě"
        />

        <Stat
          icon="🗄️"
          number={0}
          text="vyřazených"
        />

        <Stat
          icon="⚠️"
          number={activeFaults}
          text="aktivních závad"
        />
      </div>

      <div style={cardStyle}>
        <b>⏳ Letos končí životnost</b>

        <div
          style={{
            fontSize: 28,
            fontWeight: 800,
            marginTop: 8,
          }}
        >
          {lifeEndingThisYear}
        </div>

        <div style={mutedStyle}>
          hasicích přístrojů
        </div>
      </div>

      <div style={cardStyle}>
        <b>⚠️ Co potřebuje pozornost</b>

        {uniqueAttention.length === 0 ? (
          <div
            style={{
              color: "#15803d",
              marginTop: 12,
            }}
          >
            🟢 Aktuálně nic kritického.
          </div>
        ) : (
          uniqueAttention.map(
            ({
              object,
              device,
              status,
            }) => (
              <button
                key={device.id}
                onPointerDown={() =>
                  onOpenObject(object)
                }
                style={{
                  width: "100%",
                  textAlign: "left",
                  background: "#f9fafb",
                  border:
                    "1px solid #e5e7eb",
                  borderRadius: 12,
                  padding: 12,
                  marginTop: 10,
                }}
              >
                <b>
                  {getDeviceIcon(device)}{" "}
                  {device.id}
                </b>

                <div style={smallStyle}>
                  {object.name}
                </div>

                <div
                  style={{
                    marginTop: 5,
                    fontWeight: 700,
                  }}
                >
                  {status ===
                  "KONEC ŽIVOTNOSTI"
                    ? "⏳ Končí životnost"
                    : status ===
                      "PERIODICKÁ ZKOUŠKA"
                    ? "🔧 Bude muset na periodickou zkoušku"
                    : `${getStatusIcon(
                        getDeviceStatus(
                          device
                        )
                      )} ${getDeviceStatus(
                        device
                      )}`}
                </div>
              </button>
            )
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

          return (
            text.includes(
              search.toLowerCase()
            ) &&
            (customerFilter === "ALL" ||
              object.customerId ===
                customerFilter)
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
            customerFilter === "ALL"
          }
          onClick={() =>
            setCustomerFilter("ALL")
          }
        >
          Vše
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

          const status =
            getObjectStatus(
              object
            );

          return (
            <div
              key={object.id}
              style={cardStyle}
            >
              <b>
                🏢 {object.name}
              </b>

              <div style={mutedStyle}>
                👥{" "}
                {customers.find(
                  (c) =>
                    c.id ===
                    object.customerId
                )?.name || ""}
              </div>

              <div style={smallStyle}>
                📍 {object.address}
              </div>

              <div
                style={{
                  marginTop: 12,
                  color: "#4b5563",
                }}
              >
                🧯{" "}
                {extinguishers.length}{" "}
                hasičáků
                {" • "}
                🚒 {hydrants.length}{" "}
                hydrantů
              </div>

              <div
                style={{
                  marginTop: 10,
                  fontWeight: 700,
                  color:
                    status ===
                    "PO EXPIRACI"
                      ? "#dc2626"
                      : status ===
                        "MUSÍ NA ÚDRŽBU"
                      ? "#d97706"
                      : "#15803d",
                }}
              >
                {getStatusIcon(status)}{" "}
                {status}
              </div>

              <button
                onPointerDown={() =>
                  onOpenObject(object)
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
      )}

      {filteredObjects.length === 0 && (
        <EmptyBox
          icon="🏢"
          title="Žádné objekty"
          text="Zkus změnit hledání."
        />
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

  return (
    <>
      <button
        onPointerDown={onBack}
        style={backButtonStyle}
      >
        ← Objekty
      </button>

      <h1>
        🏢 {object.name}
      </h1>

      <div style={cardStyle}>
        <div style={mutedStyle}>
          👥 {customer?.name || ""}
        </div>

        <div style={mutedStyle}>
          📍 {object.address}
        </div>
      </div>

      <div style={statsGrid}>
        <Stat
          icon="🧯"
          number={extinguishers.length}
          text="hasičáků"
        />

        <Stat
          icon="🚒"
          number={hydrants.length}
          text="hydrantů"
        />
      </div>

      <button
        onPointerDown={onAddDevice}
        style={{
          ...primaryButtonStyle,
          width: "100%",
          marginBottom: 20,
        }}
      >
        + Přidat zařízení
      </button>

      {/* HASIČÁKY */}

      <div
        style={{
          marginBottom: 24,
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 20,
              }}
            >
              🧯 Hasicí přístroje
            </h2>

            <div style={smallStyle}>
              {extinguishers.length}{" "}
              celkem
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          {extinguishers.length === 0 ? (
            <div style={mutedStyle}>
              Žádné hasičáky.
            </div>
          ) : (
            extinguishers.map(
              (device) => (
                <DeviceRow
                  key={device.id}
                  device={device}
                  onClick={() =>
                    onOpenDevice(
                      device.id
                    )
                  }
                />
              )
            )
          )}
        </div>
      </div>

      {/* HYDRANTY */}

      <div>
        <div
          style={{
            display: "flex",
            justifyContent:
              "space-between",
            alignItems: "center",
            marginBottom: 8,
          }}
        >
          <div>
            <h2
              style={{
                margin: 0,
                fontSize: 20,
              }}
            >
              🚒 Hydranty
            </h2>

            <div style={smallStyle}>
              {hydrants.length}{" "}
              celkem
            </div>
          </div>
        </div>

        <div style={cardStyle}>
          {hydrants.length === 0 ? (
            <div style={mutedStyle}>
              Žádné hydranty.
            </div>
          ) : (
            hydrants.map(
              (device) => (
                <DeviceRow
                  key={device.id}
                  device={device}
                  onClick={() =>
                    onOpenDevice(
                      device.id
                    )
                  }
                />
              )
            )
          )}
        </div>
      </div>
    </>
  );
}

/* =========================================================
   DETAIL ZAŘÍZENÍ
========================================================= */

function DeviceDetail({
  object,
  device,
  onBack,
  onInspect,
  onMaintenance,
  onRetire,
}) {
  const status =
    getDeviceStatus(device);

  const isHydrant =
    device.type === "HYDRANT";

  return (
    <>
      <button
        onPointerDown={onBack}
        style={backButtonStyle}
      >
        ← Zpět
      </button>

      <h1>
        {getDeviceIcon(device)}{" "}
        {device.id}
      </h1>

      <div style={cardStyle}>
        <div
          style={{
            fontSize: 18,
            fontWeight: 800,
            color:
              status ===
              "PO EXPIRACI"
                ? "#dc2626"
                : status ===
                  "MUSÍ NA ÚDRŽBU"
                ? "#d97706"
                : "#15803d",
          }}
        >
          {getStatusIcon(status)}{" "}
          {status}
        </div>

        <div style={{ marginTop: 12 }}>
          Objekt: <b>{object.name}</b>
        </div>

        <div>
          Umístění:{" "}
          <b>
            {device.location || "—"}
          </b>
        </div>

        {!isHydrant && (
          <>
            <div>
              Výrobce:{" "}
              <b>
                {device.manufacturer ||
                  "—"}
              </b>
            </div>

            <div>
              Model:{" "}
              <b>
                {device.model || "—"}
              </b>
            </div>

            <div>
              Výrobní číslo:{" "}
              <b>
                {device.serial || "—"}
              </b>
            </div>

            <div>
              Rok výroby:{" "}
              <b>
                {device.manufactureYear ||
                  "—"}
              </b>
            </div>

            <div>
              Další kontrola:{" "}
              <b>
                {formatDate(
                  device.nextCheck
                )}
              </b>
            </div>

            <div>
              Periodická zkouška:{" "}
              <b>
                {device.nextPeriodicYear ||
                  "—"}
              </b>
            </div>

            <div>
              Konec životnosti:{" "}
              <b>
                {device.lifeEndYear ||
                  "—"}
              </b>
            </div>
          </>
        )}
      </div>

      <div style={cardStyle}>
        <b>Akce</b>

        <button
          onPointerDown={onInspect}
          style={{
            ...primaryButtonStyle,
            width: "100%",
            marginTop: 12,
          }}
        >
          📋 Provést kontrolu
        </button>

        {!isHydrant && (
          <button
            onPointerDown={
              onMaintenance
            }
            style={{
              ...secondaryButtonStyle,
              marginTop: 10,
            }}
          >
            🔧 Poslat na údržbu
          </button>
        )}

        <button
          onPointerDown={onRetire}
          style={{
            ...secondaryButtonStyle,
            marginTop: 10,
            color: "#b91c1c",
          }}
        >
          🗄️ Vyřadit
        </button>
      </div>

      <div style={cardStyle}>
        <b>📜 Historie</b>

        {!device.history?.length ? (
          <div style={mutedStyle}>
            Zatím bez historie.
          </div>
        ) : (
          [...device.history]
            .reverse()
            .map((item) => (
              <div
                key={item.id}
                style={{
                  borderBottom:
                    "1px solid #eee",
                  padding:
                    "12px 0",
                }}
              >
                <b>
                  {formatDate(
                    item.date
                  )}
                </b>

                <div
                  style={smallStyle}
                >
                  {item.result}
                </div>

                {item.faults?.length >
                  0 && (
                  <div
                    style={{
                      marginTop: 5,
                      color: "#b91c1c",
                    }}
                  >
                    {item.faults
                      .map(
                        (fault) =>
                          fault.label
                      )
                      .join(", ")}
                  </div>
                )}

                {item.note && (
                  <div
                    style={{
                      marginTop: 5,
                    }}
                  >
                    📝 {item.note}
                  </div>
                )}

                {item.photo && (
                  <img
                    src={item.photo}
                    alt="Fotografie závady"
                    style={{
                      width: "100%",
                      maxHeight: 220,
                      objectFit: "cover",
                      borderRadius: 12,
                      marginTop: 10,
                    }}
                  />
                )}
              </div>
            ))
        )}
      </div>
    </>
  );
}

/* =========================================================
   SKLAD
========================================================= */

function StockScreen({
  stock,
  objects,
  onAdd,
  onReturn,
  onRetire,
}) {
  const [tab, setTab] =
    useState("stock");

  const [selectedObject, setSelectedObject] =
    useState("");

  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent:
            "space-between",
          alignItems: "center",
          marginBottom: 16,
        }}
      >
        <h1 style={{ margin: 0 }}>
          📦 Sklad
        </h1>

        <button
          onPointerDown={onAdd}
          style={primaryButtonStyle}
        >
          + Hasičák
        </button>
      </div>

      {/* PŘEPÍNÁNÍ SKLADU */}

      <div
        style={{
          display: "flex",
          gap: 8,
          overflowX: "auto",
          marginBottom: 16,
        }}
      >
        <FilterButton
          active={tab === "stock"}
          onClick={() =>
            setTab("stock")
          }
        >
          📦 Sklad ({stock.length})
        </FilterButton>

        <FilterButton
          active={tab === "maintenance"}
          onClick={() =>
            setTab("maintenance")
          }
        >
          🔧 Údržba ({maintenance.length})
        </FilterButton>

        <FilterButton
          active={tab === "retired"}
          onClick={() =>
            setTab("retired")
          }
        >
          🗄️ Vyřazené ({retired.length})
        </FilterButton>
      </div>

      {tab === "stock" && (
        <>
          <div style={cardStyle}>
            <b>📦 Celkem na skladě</b>

            <div
              style={{
                fontSize: 34,
                fontWeight: 800,
                marginTop: 6,
              }}
            >
              {stock.length}
            </div>

            <div style={mutedStyle}>
              pouze hasicí přístroje
            </div>
          </div>

          {stock.map((item) => (
            <div
              key={item.id}
              style={cardStyle}
            >
              <b>
                {getDeviceIcon(item)}{" "}
                {item.id}
              </b>

              <div style={smallStyle}>
                {getTypeName(
                  item.type
                )}
              </div>

              <div style={smallStyle}>
                Výrobní číslo:{" "}
                {item.serial || "—"}
              </div>

              <div style={smallStyle}>
                Rok výroby:{" "}
                {item.manufactureYear ||
                  "—"}
              </div>

              <div
                style={{
                  marginTop: 10,
                  padding: 10,
                  background: "#f9fafb",
                  borderRadius: 10,
                }}
              >
                <b>Kam vrátit?</b>

                <select
                  value={
                    selectedObject
                  }
                  onChange={(event) =>
                    setSelectedObject(
                      event.target.value
                    )
                  }
                  style={{
                    ...inputStyle,
                    marginTop: 8,
                    marginBottom: 0,
                  }}
                >
                  <option value="">
                    Vyber objekt
                  </option>

                  {objects.map(
                    (object) => (
                      <option
                        key={object.id}
                        value={object.id}
                      >
                        {object.name}
                      </option>
                    )
                  )}
                </select>
              </div>

              <button
                onPointerDown={() => {
                  if (
                    !selectedObject
                  ) {
                    alert(
                      "Vyber objekt."
                    );
                    return;
                  }

                  onReturn(
                    item,
                    selectedObject,
                    item.originalLocation
                  );

                  setSelectedObject("");
                }}
                style={{
                  ...secondaryButtonStyle,
                  marginTop: 10,
                }}
              >
                🏢 Vrátit do objektu
              </button>

              <button
                onPointerDown={() =>
                  onRetire(item)
                }
                style={{
                  ...secondaryButtonStyle,
                  marginTop: 8,
                  color: "#b91c1c",
                }}
              >
                🗄️ Vyřadit
              </button>
            </div>
          ))}

          {stock.length === 0 && (
            <EmptyBox
              icon="📦"
              title="Sklad je prázdný"
              text="Zatím zde nejsou žádné hasicí přístroje."
            />
          )}
        </>
      )}

      {tab === "maintenance" && (
        <MaintenanceTab
          maintenance={maintenance}
          objects={objects}
          onReturn={onReturn}
        />
      )}

      {tab === "retired" && (
        <RetiredTab
          retired={retired}
        />
      )}
    </>
  );
}

/* =========================================================
   ÚDRŽBA
========================================================= */

function MaintenanceTab({
  maintenance,
  objects,
  onReturn,
}) {
  return (
    <>
      <div style={cardStyle}>
        <b>🔧 Hasičáky na údržbě</b>

        <div
          style={{
            fontSize: 34,
            fontWeight: 800,
            marginTop: 6,
          }}
        >
          {maintenance.length}
        </div>

        <div style={mutedStyle}>
          přesný počet kusů
        </div>
      </div>

      {maintenance.map((item) => (
        <div
          key={item.id}
          style={cardStyle}
        >
          <b>
            🔧 {item.id}
          </b>

          <div style={smallStyle}>
            {getTypeName(item.type)}
          </div>

          <div style={smallStyle}>
            Původní objekt:{" "}
            {item.originalObjectName ||
              "—"}
          </div>

          <div style={smallStyle}>
            Umístění:{" "}
            {item.originalLocation ||
              "—"}
          </div>

          <div
            style={{
              marginTop: 9,
              fontWeight: 700,
            }}
          >
            Důvod:{" "}
            {item.maintenanceReason ||
              "Údržba"}
          </div>

          <div style={smallStyle}>
            Na údržbě od:{" "}
            {formatDate(
              item.maintenanceSince
            )}
          </div>

          <button
            onPointerDown={() =>
              onReturn(item)
            }
            style={{
              ...secondaryButtonStyle,
              marginTop: 12,
            }}
          >
            🏢 Vrátit na původní místo
          </button>
        </div>
      ))}

      {maintenance.length === 0 && (
        <EmptyBox
          icon="🔧"
          title="Údržba je prázdná"
          text="Aktuálně není žádný hasicí přístroj na údržbě."
        />
      )}
    </>
  );
}

/* =========================================================
   VYŘAZENÉ
========================================================= */

function RetiredTab({
  retired,
}) {
  return (
    <>
      <div style={cardStyle}>
        <b>🗄️ Vyřazené hasičáky</b>

        <div
          style={{
            fontSize: 34,
            fontWeight: 800,
            marginTop: 6,
          }}
        >
          {retired.length}
        </div>

        <div style={mutedStyle}>
          přesný počet vyřazených kusů
        </div>
      </div>

      {retired.map((item) => (
        <div
          key={item.id}
          style={cardStyle}
        >
          <b>
            🗄️ {item.id}
          </b>

          <div style={smallStyle}>
            {getTypeName(item.type)}
          </div>

          <div style={smallStyle}>
            Vyřazeno:{" "}
            {formatDate(
              item.retiredAt
            )}
          </div>

          <div style={smallStyle}>
            Vyřazeno z:{" "}
            {item.retiredFrom ||
              "—"}
          </div>
        </div>
      ))}

      {retired.length === 0 && (
        <EmptyBox
          icon="🗄️"
          title="Nic není vyřazené"
          text="Historie vyřazených zařízení je prázdná."
        />
      )}
    </>
  );
}

/* =========================================================
   VÍCE
========================================================= */

function MoreScreen({
  maintenance,
  retired,
  objects,
  onMaintenanceToObject,
  onMaintenanceToStock,
  onMaintenanceRetire,
  onRestoreStock,
  onRestoreObject,
  onDelete,
}) {
  const [tab, setTab] =
    useState("maintenance");

  return (
    <>
      <h1>••• Více</h1>

      <div
        style={{
          display: "flex",
          gap: 8,
          marginBottom: 14,
        }}
      >
        <FilterButton
          active={
            tab === "maintenance"
          }
          onClick={() =>
            setTab("maintenance")
          }
        >
          🔧 Údržba ({maintenance.length})
        </FilterButton>

        <FilterButton
          active={
            tab === "retired"
          }
          onClick={() =>
            setTab("retired")
          }
        >
          🗄️ Vyřazené ({retired.length})
        </FilterButton>
      </div>

      {tab === "maintenance" && (
        <>
          {maintenance.map(
            (item) => (
              <div
                key={item.id}
                style={cardStyle}
              >
                <b>
                  🔧 {item.id}
                </b>

                <div style={smallStyle}>
                  {getTypeName(
                    item.type
                  )}
                </div>

                <div
                  style={{
                    marginTop: 8,
                  }}
                >
                  Důvod:{" "}
                  {item.maintenanceReason ||
                    "Údržba"}
                </div>

                <div style={smallStyle}>
                  Od:{" "}
                  {formatDate(
                    item.maintenanceSince
                  )}
                </div>

                <button
                  onPointerDown={() =>
                    onMaintenanceToObject(
                      item
                    )
                  }
                  style={{
                    ...secondaryButtonStyle,
                    marginTop: 10,
                  }}
                >
                  🏢 Vrátit do objektu
                </button>

                <button
                  onPointerDown={() =>
                    onMaintenanceToStock(
                      item
                    )
                  }
                  style={{
                    ...secondaryButtonStyle,
                    marginTop: 8,
                  }}
                >
                  📦 Dát na sklad
                </button>

                <button
                  onPointerDown={() =>
                    onMaintenanceRetire(
                      item
                    )
                  }
                  style={{
                    ...secondaryButtonStyle,
                    marginTop: 8,
                    color: "#b91c1c",
                  }}
                >
                  🗄️ Vyřadit
                </button>
              </div>
            )
          )}

          {maintenance.length ===
            0 && (
            <EmptyBox
              icon="🔧"
              title="Nic není na údržbě"
              text="Aktuálně není žádný hasicí přístroj na údržbě."
            />
          )}
        </>
      )}

      {tab === "retired" && (
        <>
          {retired.map(
            (item) => (
              <div
                key={item.id}
                style={cardStyle}
              >
                <b>
                  🗄️ {item.id}
                </b>

                <div style={smallStyle}>
                  {getTypeName(
                    item.type
                  )}
                </div>

                <div style={smallStyle}>
                  Vyřazeno:{" "}
                  {formatDate(
                    item.retiredAt
                  )}
                </div>

                <button
                  onPointerDown={() =>
                    onRestoreObject(
                      item
                    )
                  }
                  style={{
                    ...secondaryButtonStyle,
                    marginTop: 10,
                  }}
                >
                  ♻️ Obnovit do objektu
                </button>

                <button
                  onPointerDown={() =>
                    onRestoreStock(
                      item
                    )
                  }
                  style={{
                    ...secondaryButtonStyle,
                    marginTop: 8,
                  }}
                >
                  📦 Vrátit na sklad
                </button>

                <button
                  onPointerDown={() =>
                    onDelete(item)
                  }
                  style={{
                    ...secondaryButtonStyle,
                    marginTop: 8,
                    color: "#b91c1c",
                  }}
                >
                  🗑️ Trvale smazat
                </button>
              </div>
            )
          )}

          {retired.length === 0 && (
            <EmptyBox
              icon="🗄️"
              title="Nic není vyřazené"
              text="Historie vyřazených zařízení je prázdná."
            />
          )}
        </>
      )}
    </>
  );
}

/* =========================================================
   KONTROLY
========================================================= */

function ControlsScreen({
  objects,
  year,
  setYear,
  octoberObjects,
  setOctoberObjects,
}) {
  const aprilObjects =
    objects.filter(
      (object) =>
        !octoberObjects.includes(
          object.id
        )
    );

  const aprilCompleted =
    aprilObjects.filter(
      (object) =>
        object.devices.length > 0 &&
        object.devices.every(
          (device) =>
            device.lastCheck &&
            new Date(
              device.lastCheck
            ).getFullYear() === year
        )
    );

  const octoberCompleted =
    objects.filter(
      (object) =>
        octoberObjects.includes(
          object.id
        ) &&
        object.devices.length > 0 &&
        object.devices.every(
          (device) =>
            device.lastCheck &&
            new Date(
              device.lastCheck
            ).getFullYear() === year
        )
    );

  function toggleOctober(id) {
    if (
      octoberObjects.includes(id)
    ) {
      setOctoberObjects(
        octoberObjects.filter(
          (item) => item !== id
        )
      );
      return;
    }

    if (octoberObjects.length >= 2) {
      alert(
        "V říjnu mohou být vybrané pouze 2 objekty."
      );
      return;
    }

    setOctoberObjects([
      ...octoberObjects,
      id,
    ]);
  }

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent:
            "space-between",
        }}
      >
        <h1>📅 Kontroly</h1>

        <div
          style={{
            display: "flex",
            gap: 6,
          }}
        >
          <button
            onPointerDown={() =>
              setYear(year - 1)
            }
            style={backButtonStyle}
          >
            ◀️
          </button>

          <b
            style={{
              padding: "10px 6px",
            }}
          >
            {year}
          </b>

          <button
            onPointerDown={() =>
              setYear(year + 1)
            }
            style={backButtonStyle}
          >
            ▶️
          </button>
        </div>
      </div>

      <div style={cardStyle}>
        <b>🌸 Duben</b>

        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            marginTop: 8,
          }}
        >
          {aprilCompleted.length} /{" "}
          {aprilObjects.length} hotovo
        </div>

        <div style={mutedStyle}>
          Zbývá{" "}
          {Math.max(
            0,
            aprilObjects.length -
              aprilCompleted.length
          )}{" "}
          objektů
        </div>

        <ProgressBar
          value={
            aprilObjects.length
              ? (aprilCompleted.length /
                  aprilObjects.length) *
                100
              : 0
          }
        />

        {aprilObjects.map(
          (object) => {
            const done =
              aprilCompleted.some(
                (item) =>
                  item.id ===
                  object.id
              );

            return (
              <div
                key={object.id}
                style={{
                  padding:
                    "10px 0",
                  borderBottom:
                    "1px solid #eee",
                  display: "flex",
                  justifyContent:
                    "space-between",
                }}
              >
                <span>
                  🏢 {object.name}
                </span>

                <b
                  style={{
                    color: done
                      ? "#15803d"
                      : "#d97706",
                  }}
                >
                  {done
                    ? "HOTOVO"
                    : "ČEKÁ"}
                </b>
              </div>
            );
          }
        )}
      </div>

      <div style={cardStyle}>
        <b>🍂 Říjen</b>

        <div
          style={{
            fontSize: 24,
            fontWeight: 800,
            marginTop: 8,
          }}
        >
          {octoberCompleted.length} / 2
          {" "}hotovo
        </div>

        <div style={mutedStyle}>
          Vybrané objekty:{" "}
          {octoberObjects.length} / 2
        </div>

        <ProgressBar
          value={
            (octoberCompleted.length /
              2) *
            100
          }
        />

        <div
          style={{
            marginTop: 12,
            fontWeight: 700,
          }}
        >
          Vyber přesně 2 objekty:
        </div>

        {objects.map((object) => {
          const selected =
            octoberObjects.includes(
              object.id
            );

          return (
            <button
              key={object.id}
              onPointerDown={() =>
                toggleOctober(
                  object.id
                )
              }
              style={{
                width: "100%",
                textAlign: "left",
                marginTop: 8,
                padding: 12,
                borderRadius: 10,
                border: selected
                  ? "2px solid #111827"
                  : "1px solid #e5e7eb",
                background: selected
                  ? "#f3f4f6"
                  : "white",
              }}
            >
              {selected
                ? "✅"
                : "⬜"}{" "}
              {object.name}
            </button>
          );
        })}
      </div>
    </>
  );
}

/* =========================================================
   ZPRÁVY
========================================================= */

function ReportsScreen({
  objects,
}) {
  const reports = [];

  objects.forEach((object) => {
    object.devices.forEach(
      (device) => {
        (device.history || []).forEach(
          (history) => {
            reports.push({
              ...history,
              device,
              object,
            });
          }
        );
      }
    );
  });

  reports.sort(
    (a, b) =>
      new Date(b.date) -
      new Date(a.date)
  );

  return (
    <>
      <h1>📄 Zprávy</h1>

      <div style={cardStyle}>
        <b>
          📋 Provedené kontroly
        </b>

        {reports.length === 0 ? (
          <div style={mutedStyle}>
            Zatím nebyla provedena
            žádná kontrola.
          </div>
        ) : (
          reports.map((report) => (
            <div
              key={report.id}
              style={{
                padding:
                  "12px 0",
                borderBottom:
                  "1px solid #eee",
              }}
            >
              <b>
                {formatDate(
                  report.date
                )}
              </b>

              <div
                style={smallStyle}
              >
                {getDeviceIcon(
                  report.device
                )}{" "}
                {report.device.id}
                {" • "}
                {report.object.name}
              </div>

              <div
                style={{
                  marginTop: 5,
                  fontWeight: 700,
                  color:
                    report.result ===
                    "ZÁVADA"
                      ? "#dc2626"
                      : "#15803d",
                }}
              >
                {report.result}
              </div>
            </div>
          ))
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
        "Vyplň adresu."
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

    onSave({
      name,
      address,
      customerId:
        finalCustomerId,
    });
  }

  return (
    <Modal>
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
        onChange={(e) =>
          setName(e.target.value)
        }
        placeholder="Např. Panelový dům 135"
        style={inputStyle}
      />

      <label style={labelStyle}>
        Adresa
      </label>

      <input
        value={address}
        onChange={(e) =>
          setAddress(e.target.value)
        }
        placeholder="Např. Bílina, Ulice 135"
        style={inputStyle}
      />

      <label style={labelStyle}>
        Skupina objektů
      </label>

      <select
        value={customerId}
        onChange={(e) =>
          setCustomerId(e.target.value)
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
          marginBottom: 10,
        }}
      >
        nebo vytvoř novou skupinu
      </div>

      <input
        value={newCustomer}
        onChange={(e) =>
          setNewCustomer(
            e.target.value
          )
        }
        placeholder="Např. SVJ Bílina"
        style={inputStyle}
      />

      <button
        onPointerDown={save}
        style={primaryButtonStyle}
      >
        ✅ Vytvořit objekt
      </button>
    </Modal>
  );
}

/* =========================================================
   PŘIDAT ZAŘÍZENÍ
========================================================= */

function AddDeviceModal({
  onClose,
  onSave,
}) {
  const [type, setType] =
    useState("PRASKOVY");

  const [serial, setSerial] =
    useState("");

  const [number, setNumber] =
    useState("");

  const [manufacturer, setManufacturer] =
    useState("");

  const [model, setModel] =
    useState("");

  const [manufactureYear, setManufactureYear] =
    useState("");

  const [location, setLocation] =
    useState("");

  const [note, setNote] =
    useState("");

  const isHydrant =
    type === "HYDRANT";

  function save() {
    if (!location.trim()) {
      alert(
        "Vyplň umístění."
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

    onSave({
      type,
      serial,
      number,
      manufacturer,
      model,
      manufactureYear,
      location,
      note,
    });
  }

  return (
    <Modal>
      <ModalHeader
        title="➕ Přidat zařízení"
        subtitle="Hasicí přístroj nebo hydrant"
        onClose={onClose}
      />

      <label style={labelStyle}>
        Typ
      </label>

      <select
        value={type}
        onChange={(e) =>
          setType(e.target.value)
        }
        style={inputStyle}
      >
        <option value="VODNI">
          💧 Vodní
        </option>

        <option value="PRASKOVY">
          🧯 Práškový
        </option>

        <option value="CO2">
          ❄️ CO₂
        </option>

        <option value="HYDRANT">
          🚒 Hydrant
        </option>
      </select>

      {isHydrant ? (
        <>
          <label style={labelStyle}>
            Číslo hydrantu
          </label>

          <input
            value={number}
            onChange={(e) =>
              setNumber(
                e.target.value
              )
            }
            placeholder="Např. 1"
            style={inputStyle}
          />
        </>
      ) : (
        <>
          <label style={labelStyle}>
            Výrobní číslo
          </label>

          <input
            value={serial}
            onChange={(e) =>
              setSerial(
                e.target.value
              )
            }
            placeholder="Výrobní číslo"
            style={inputStyle}
          />

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
            placeholder="Výrobce"
            style={inputStyle}
          />

          <label style={labelStyle}>
            Model
          </label>

          <input
            value={model}
            onChange={(e) =>
              setModel(e.target.value)
            }
            placeholder="Model"
            style={inputStyle}
          />

          <label style={labelStyle}>
            Rok výroby
          </label>

          <input
            type="number"
            value={manufactureYear}
            onChange={(e) =>
              setManufactureYear(
                e.target.value
              )
            }
            placeholder="2024"
            style={inputStyle}
          />
        </>
      )}

      <label style={labelStyle}>
        Umístění
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
        Poznámka
      </label>

      <textarea
        value={note}
        onChange={(e) =>
          setNote(e.target.value)
        }
        placeholder="Poznámka..."
        style={{
          ...inputStyle,
          minHeight: 90,
        }}
      />

      <button
        onPointerDown={save}
        style={primaryButtonStyle}
      >
        ✅ Přidat zařízení
      </button>
    </Modal>
  );
}

/* =========================================================
   SKLAD – PŘIDAT
========================================================= */

function AddStockModal({
  onClose,
  onSave,
}) {
  const [type, setType] =
    useState("PRASKOVY");

  const [serial, setSerial] =
    useState("");

  const [manufacturer, setManufacturer] =
    useState("");

  const [model, setModel] =
    useState("");

  const [manufactureYear, setManufactureYear] =
    useState("");

  const [receivedDate, setReceivedDate] =
    useState(
      new Date()
        .toISOString()
        .slice(0, 10)
    );

  const [note, setNote] =
    useState("");

  function save() {
    if (!manufactureYear) {
      alert(
        "Vyplň rok výroby."
      );
      return;
    }

    onSave({
      type,
      serial,
      manufacturer,
      model,
      manufactureYear,
      receivedDate,
      note,
    });
  }

  return (
    <Modal>
      <ModalHeader
        title="📦 Přidat na sklad"
        subtitle="Nový hasicí přístroj"
        onClose={onClose}
      />

      <label style={labelStyle}>
        Typ
      </label>

      <select
        value={type}
        onChange={(e) =>
          setType(e.target.value)
        }
        style={inputStyle}
      >
        <option value="VODNI">
          💧 Vodní
        </option>

        <option value="PRASKOVY">
          🧯 Práškový
        </option>

        <option value="CO2">
          ❄️ CO₂
        </option>
      </select>

      <label style={labelStyle}>
        Výrobní číslo
      </label>

      <input
        value={serial}
        onChange={(e) =>
          setSerial(e.target.value)
        }
        style={inputStyle}
      />

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
        style={inputStyle}
      />

      <label style={labelStyle}>
        Model
      </label>

      <input
        value={model}
        onChange={(e) =>
          setModel(e.target.value)
        }
        style={inputStyle}
      />

      <label style={labelStyle}>
        Rok výroby
      </label>

      <input
        type="number"
        value={manufactureYear}
        onChange={(e) =>
          setManufactureYear(
            e.target.value
          )
        }
        style={inputStyle}
      />

      <label style={labelStyle}>
        Datum přijetí
      </label>

      <input
        type="date"
        value={receivedDate}
        onChange={(e) =>
          setReceivedDate(
            e.target.value
          )
        }
        style={inputStyle}
      />

      <label style={labelStyle}>
        Poznámka
      </label>

      <textarea
        value={note}
        onChange={(e) =>
          setNote(e.target.value)
        }
        style={{
          ...inputStyle,
          minHeight: 80,
        }}
      />

      <button
        onPointerDown={save}
        style={primaryButtonStyle}
      >
        📦 Přidat na sklad
      </button>
    </Modal>
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
  const [selectedFaults, setSelectedFaults] =
    useState([]);

  const [note, setNote] =
    useState("");

  const [photo, setPhoto] =
    useState(null);

  const [periodicYear, setPeriodicYear] =
    useState(
      device?.lastPeriodicYear ||
        ""
    );

  function toggleFault(code) {
    const fault =
      FAULTS.find(
        (item) => item[0] === code
      );

    if (!fault) {
      return;
    }

    setSelectedFaults(
      (current) => {
        const exists =
          current.some(
            (item) =>
              item.code === code
          );

        if (exists) {
          return current.filter(
            (item) =>
              item.code !== code
          );
        }

        return [
          ...current,
          {
            code,
            label: fault[2],
          },
        ];
      }
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
      setPhoto(
        reader.result
      );
    };

    reader.readAsDataURL(file);
  }

  function save() {
    onSave({
      faults: selectedFaults,
      note,
      photo,
      periodicYear,
    });
  }

  const isHydrant =
    device?.type === "HYDRANT";

  return (
    <Modal>
      <ModalHeader
        title="📋 Kontrola"
        subtitle={`${getDeviceIcon(
          device
        )} ${device?.id || ""}`}
        onClose={onClose}
      />

      <div style={cardInnerStyle}>
        <b>
          Co bylo zjištěno?
        </b>

        <div
          style={{
            marginTop: 10,
          }}
        >
          {FAULTS.map(
            ([code, icon, label]) => (
              <button
                key={code}
                onPointerDown={() =>
                  toggleFault(code)
                }
                style={{
                  width: "100%",
                  textAlign: "left",
                  border:
                    selectedFaults.some(
                      (fault) =>
                        fault.code ===
                        code
                    )
                      ? "2px solid #dc2626"
                      : "1px solid #e5e7eb",
                  background:
                    selectedFaults.some(
                      (fault) =>
                        fault.code ===
                        code
                    )
                      ? "#fef2f2"
                      : "white",
                  borderRadius: 10,
                  padding: 11,
                  marginTop: 7,
                }}
              >
                {selectedFaults.some(
                  (fault) =>
                    fault.code ===
                    code
                )
                  ? "☑️"
                  : "⬜"}{" "}
                {icon} {label}
              </button>
            )
          )}
        </div>
      </div>

      {!isHydrant && (
        <div style={cardInnerStyle}>
          <b>
            🔧 Periodická zkouška
          </b>

          <div
            style={smallStyle}
          >
            Pokud byla provedena,
            zadej rok poslední
            periodické zkoušky.
          </div>

          <input
            type="number"
            value={periodicYear}
            onChange={(e) =>
              setPeriodicYear(
                e.target.value
              )
            }
            placeholder="Např. 2025"
            style={{
              ...inputStyle,
              marginTop: 10,
            }}
          />
        </div>
      )}

      <label style={labelStyle}>
        📝 Poznámka
      </label>

      <textarea
        value={note}
        onChange={(e) =>
          setNote(e.target.value)
        }
        placeholder="Poznámka ke kontrole..."
        style={{
          ...inputStyle,
          minHeight: 100,
        }}
      />

      <label style={labelStyle}>
        📸 Fotografie
      </label>

      <input
        type="file"
        accept="image/*"
        capture="environment"
        onChange={handlePhoto}
        style={{
          marginBottom: 12,
        }}
      />

      {photo && (
        <img
          src={photo}
          alt="Náhled"
          style={{
            width: "100%",
            maxHeight: 220,
            objectFit: "cover",
            borderRadius: 12,
            marginBottom: 12,
          }}
        />
      )}

      <button
        onPointerDown={save}
        style={primaryButtonStyle}
      >
        ✅ Dokončit kontrolu
      </button>
    </Modal>
  );
}

/* =========================================================
   ZAŘÍZENÍ – BEZPEČNÉ KLIKÁNÍ
========================================================= */

function DeviceRow({
  device,
  onClick,
}) {
  const status =
    getDeviceStatus(device);

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 10,
        padding: "14px 0",
        borderBottom:
          "1px solid #eee",
      }}
    >
      <div
        style={{
          flex: 1,
          minWidth: 0,
          pointerEvents: "none",
        }}
      >
        <div>
          <b>
            {getDeviceIcon(device)}{" "}
            {device.id}
          </b>
        </div>

        <div style={smallStyle}>
          {getTypeName(device.type)}
          {" • "}
          {device.location ||
            "Bez umístění"}
        </div>

        <div
          style={{
            marginTop: 5,
            fontWeight: 700,
            color:
              status ===
              "PO EXPIRACI"
                ? "#dc2626"
                : status ===
                  "MUSÍ NA ÚDRŽBU"
                ? "#d97706"
                : "#15803d",
          }}
        >
          {getStatusIcon(status)}{" "}
          {status}
        </div>
      </div>

      <button
        onPointerDown={(event) => {
          event.stopPropagation();
          onClick();
        }}
        style={{
          flexShrink: 0,
          border:
            "1px solid #d1d5db",
          background: "#f9fafb",
          borderRadius: 10,
          padding:
            "10px 11px",
          fontWeight: 700,
          color: "#111827",
        }}
      >
        DETAIL →
      </button>
    </div>
  );
}

/* =========================================================
   POMOCNÉ KOMPONENTY
========================================================= */

function Stat({
  icon,
  number,
  text,
}) {
  return (
    <div style={cardStyle}>
      <div
        style={{
          fontSize: 20,
        }}
      >
        {icon}
      </div>

      <strong
        style={{
          display: "block",
          fontSize: 27,
          marginTop: 3,
        }}
      >
        {number}
      </strong>

      <div
        style={{
          color: "#6b7280",
          fontSize: 13,
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

function ProgressBar({
  value,
}) {
  return (
    <div
      style={{
        height: 9,
        background: "#e5e7eb",
        borderRadius: 99,
        overflow: "hidden",
        marginTop: 12,
        marginBottom: 10,
      }}
    >
      <div
        style={{
          width: `${Math.min(
            100,
            Math.max(0, value)
          )}%`,
          height: "100%",
          background: "#111827",
          borderRadius: 99,
        }}
      />
    </div>
  );
}

function Modal({
  children,
}) {
  return (
    <div style={modalOverlayStyle}>
      <div style={modalStyle}>
        {children}
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

/* =========================================================
   POMOCNÉ FUNKCE
========================================================= */

function getDeviceIcon(device) {
  if (!device) {
    return "🧯";
  }

  if (device.type === "VODNI") {
    return "💧";
  }

  if (device.type === "PRASKOVY") {
    return "🧯";
  }

  if (device.type === "CO2") {
    return "❄️";
  }

  if (device.type === "HYDRANT") {
    return "🚒";
  }

  return "🧯";
}

function getTypeName(type) {
  return (
    LEGAL_RULES[type]?.name ||
    (type === "HYDRANT"
      ? "Hydrant"
      : type)
  );
}

function getObjectStatus(object) {
  const devices =
    object.devices || [];

  const statuses =
    devices.map((device) =>
      getDeviceStatus(device)
    );

  if (
    statuses.includes(
      "PO EXPIRACI"
    )
  ) {
    return "PO EXPIRACI";
  }

  if (
    statuses.includes(
      "MUSÍ NA ÚDRŽBU"
    )
  ) {
    return "MUSÍ NA ÚDRŽBU";
  }

  return "V POŘÁDKU";
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
  padding: "15px 18px",
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

const cardInnerStyle = {
  background: "#f9fafb",
  border:
    "1px solid #e5e7eb",
  borderRadius: 14,
  padding: 14,
  marginBottom: 12,
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