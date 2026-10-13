
 // Požárník AI
// Výpočty termínů zařízení

export const LEGAL_RULES = {
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

  HYDRANT: {
    name: "Hydrant",
    icon: "🚒",
    periodicYears: null,
    lifeYears: null,
  },
};

export function getRule(type) {
  return LEGAL_RULES[type] || null;
}

export function calculatePeriodicYear(type, lastPeriodicYear) {
  const rule = getRule(type);
  const year = Number(lastPeriodicYear);

  if (
    !rule ||
    !rule.periodicYears ||
    !Number.isInteger(year) ||
    year <= 0
  ) {
    return null;
  }

  return year + rule.periodicYears;
}

export function calculateLifeEnd(type, manufactureYear) {
  const rule = getRule(type);
  const year = Number(manufactureYear);

  if (
    !rule ||
    !rule.lifeYears ||
    !Number.isInteger(year) ||
    year <= 0
  ) {
    return null;
  }

  return year + rule.lifeYears;
}

export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getNextAnnualCheck(lastCheck) {
  if (!lastCheck) {
    return null;
  }

  const date = new Date(lastCheck);

  if (Number.isNaN(date.getTime())) {
    return null;
  }

  return new Date(
    date.getFullYear() + 1,
    date.getMonth(),
    date.getDate()
  );
}

// Životnost skončila v některém z předchozích let.
export function isLifeExpired(device) {
  if (
    device?.lifeEndYear == null ||
    device.lifeEndYear === ""
  ) {
    return false;
  }

  return Number(device.lifeEndYear) < getCurrentYear();
}

// Konec životnosti připadá na aktuální rok.
export function isLifeEndingThisYear(device) {
  if (
    device?.lifeEndYear == null ||
    device.lifeEndYear === ""
  ) {
    return false;
  }

  return Number(device.lifeEndYear) === getCurrentYear();
}

// Periodická zkouška je splatná letos nebo už měla být provedena.
export function isPeriodicDue(device) {
  if (
    device?.nextPeriodicYear == null ||
    device.nextPeriodicYear === ""
  ) {
    return false;
  }

  return Number(device.nextPeriodicYear) <= getCurrentYear();
}

export function isPeriodicDueThisYear(device) {
  if (
    device?.nextPeriodicYear == null ||
    device.nextPeriodicYear === ""
  ) {
    return false;
  }

  return Number(device.nextPeriodicYear) === getCurrentYear();
}

export function getDeviceStatus(device) {
  if (!device) {
    return "V POŘÁDKU";
  }

  // Prošlá životnost má přednost před ostatními stavy.
  if (isLifeExpired(device)) {
    return "PO EXPIRACI";
  }

  // Ručně zadaná závada nebo nutná údržba.
  if (device.status === "MUSÍ NA ÚDRŽBU") {
    return "MUSÍ NA ÚDRŽBU";
  }

  // Upozorni už v roce konce životnosti.
  if (isLifeEndingThisYear(device)) {
    return "MUSÍ NA ÚDRŽBU";
  }

  if (isPeriodicDue(device)) {
    return "MUSÍ NA ÚDRŽBU";
  }

  return "V POŘÁDKU";
}

export function getStatusIcon(status) {
  switch (status) {
    case "PO EXPIRACI":
      return "🔴";

    case "MUSÍ NA ÚDRŽBU":
      return "🟠";

    default:
      return "🟢";
  }
}

export function formatYear(year) {
  if (year == null || year === "") {
    return "—";
  }

  return String(year);
}

export function formatDate(date) {
  if (!date) {
    return "—";
  }

  const d = new Date(date);

  if (Number.isNaN(d.getTime())) {
    return "—";
  }

  return d.toLocaleDateString("cs-CZ");
}
