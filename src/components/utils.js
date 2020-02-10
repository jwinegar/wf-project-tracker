export const parseISODateString = dateStr => {
  const b = dateStr.split(/\D+/);
  return new Date(Date.UTC(b[0], --b[1], b[2], b[3], b[4], b[5], b[6]));
};

export const setDaysLeft = expireDate => {
  const dayDiff =
    parseISODateString(expireDate).getTime() - new Date().getTime();
  const daysLeft = Math.floor(dayDiff / 8.64e7);

  return daysLeft === 1 ? `${daysLeft} Day` : `${daysLeft} Days`;
};

export const setExpiring = expireDate => {
  const dayDiff =
    parseISODateString(expireDate).getTime() - new Date().getTime();
  const daysLeft = Math.floor(dayDiff / 8.64e7);
  let relDays;

  switch (true) {
    case daysLeft === 0:
      relDays = "Today";
      break;
    case daysLeft === 1:
      relDays = "Tomorrow";
      break;
    default:
      relDays = `in ${daysLeft} Days`;
  }

  return relDays;
};

export const percentComplete = (val, total) =>
  `${Math.round((val / total) * 100 * 10) / 10 || 0}%`;

export const setHours = hours => hours || 0;

export const setHrsLabel = hours =>
  hours === 1 || hours === -1 ? "hr" : "hrs";
