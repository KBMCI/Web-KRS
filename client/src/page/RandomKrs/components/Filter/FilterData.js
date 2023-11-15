export const List = [
  {
    class: "A",
  },
  {
    class: "B",
  },
  {
    class: "C",
  },
  {
    class: "D",
  },
  {
    class: "E",
  },
];

const getTableHeaders = JSON.parse(localStorage.getItem("JamKelas"));
export const DataJadwal = getTableHeaders?.map((item, index) => ({
  Jam: `${item.jam_mulai}-${item.jam_selesai}`,
  Senin: "Senin",
  Selasa: "Selasa",
  Rabu: "Rabu",
  Kamis: "Kamis",
  Jumat: "Jumat",
}));
