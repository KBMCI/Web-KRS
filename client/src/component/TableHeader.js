const getTableHeaders = JSON.parse(localStorage.getItem("JamKelas"));
export const tableHeader = getTableHeaders.map((item, index) => ({
  jam: `${item.jam_mulai} - ${item.jam_selesai}`,
  senin: "",
  selasa: "",
  rabu: "",
  kamis: "",
  jumat: "",
}));
