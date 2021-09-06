export function getHoursAndMinutes(datestring) {
  const date = new Date(datestring);

  if (isNaN(date)) {
    throw new Error("Date string is not valid");
  }

  const hours = date.getHours();
  const minutes = date.getMinutes();

  return ("0" + hours).slice(-2) + ":" + ("0" + minutes).slice(-2);
}

export function getDate(datestring) {
  const date = new Date(datestring);

  if (isNaN(date)) {
    throw new Error("Date string is not valid");
  }

  return date;
}

export function formatDate(dateObj, timestring) {
  let year = dateObj.getFullYear();
  let month = dateObj.getMonth();
  let day = dateObj.getDate();

  if (!timestring) {
    timestring = "00:00";
  }
  let [hours, minutes] = timestring.split(":");

  month = ("0" + (month + 1)).slice(-2);
  day = ("0" + day).slice(-2);

  return `${year}-${month}-${day}T${hours}:${minutes}:00.000Z`;
}
