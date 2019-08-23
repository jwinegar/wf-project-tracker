export const parseISODateString = string => {
  var b = string.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
};

export const checkHoursLogged = hours => (hours ? hours : 0);
export const setHrsLabel = hours =>
  hours === 1 || hours === -1 ? "hr" : "hrs";

export const percentComplete = (val, total) => {
  return `${Math.round((val / total) * 100 * 10) / 10}%`;
};
