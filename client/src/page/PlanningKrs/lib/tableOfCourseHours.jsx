export const createTable = () => {
  // data dates
  const dates = [
    "07:00 - 08:39",
    "07:00 - 09:29",
    "07:50 - 09:29",
    "07:50 - 10:19",
    "08:40 - 10:19",
    "08:40 - 11:09",
    "09:30 - 11:09",
    "09:30 - 11:59",
    "10:20 - 11:59",
    "12:50 - 14:29",
    "12:50 - 15:19",
    "13:40 - 16:19",
    "14:30 - 17:09",
    "15:30 - 18:09",
    "16:20 - 18:09",
  ];
  // define array result
  const result = [];
  // looping to push object
  dates.forEach((date) => {
    result.push({
      jam: date,
      hari: {
        senin: [],
        selasa: [],
        rabu: [],
        kamis: [],
        jumat: [],
      },
    });
  });
  // return result
  return result;
};
