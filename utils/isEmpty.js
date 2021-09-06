export function isEmpty(val) {
  if (typeof val === "string") {
    return val.trim().length === 0;
  } else if (typeof val === "object") {
    return !Object.keys(val).length;
  } else if (typeof val === "undefined") {
    return true;
  }
}
