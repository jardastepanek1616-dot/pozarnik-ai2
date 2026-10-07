function randomPart(length = 8) {
  const chars =
    "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";

  let result = "";

  for (let i = 0; i < length; i++) {
    result +=
      chars[
        Math.floor(
          Math.random() * chars.length
        )
      ];
  }

  return result;
}

export function createDeviceId(prefix = "DEV") {
  return `${prefix}-${randomPart(10)}`;
}

export function createObjectId() {
  return `OBJ-${randomPart(10)}`;
}

export function createCustomerId() {
  return `CUS-${randomPart(10)}`;
}