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

  if (!rule || !rule.periodicYears || !lastPeriodicYear) {
    return null;
  }

  return Number(lastPeriodicYear) + rule.periodicYears;
}

export function calculateLifeEnd(type, manufactureYear) {
  const rule = getRule(type);

  if (
    !rule ||
    !rule.lifeYears ||
    !manufactureYear
  ) {
    return null;
  }

  return Number(manufactureYear) + rule.lifeYears;
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

export function isLifeExpired(device) {
  if (!device?.lifeEndYear) {
    return false;
  }

  return getCurrentYear() > Number(device.lifeEndYear);
}

export function isLifeEndingThisYear(device) {
  if (!device?.lifeEndYear) {
    return false;
  }

  return Number(device.lifeEndYear) === getCurrentYear();
}

export function isPeriodicDue(device) {
  if (!device?.nextPeriodicYear) {
    return false;
  }

  return Number(device.nextPeriodicYear) <= getCurrentYear();
}

export function isPeriodicDueThisYear(device) {
  if (!device?.nextPeriodicYear) {
    return false;
  }

  return Number(device.nextPeriodicYear) === getCurrentYear();
}

export function getDeviceStatus(device) {
  if (!device) {
    return "V POŘÁDKU";
  }

  if (device.status === "MUSÍ NA ÚDRŽBU") {
    return "MUSÍ NA ÚDRŽBU";
  }

  if (isLifeExpired(device)) {
    return "PO EXPIRACI";
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
  if (!year) {
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