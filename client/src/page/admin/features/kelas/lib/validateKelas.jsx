// Validate
export const validateKelas = (values) => {
  const errors = {};
  if (!values.kode_matkul) {
    errors.kode_matkul = "Kode Mata Kuliah is required";
  }
  if (!values.nama) {
    errors.nama = "Nama Mata Kuliah is required";
  }
  if (!values.ruang_kelas) {
    errors.ruang_kelas = "Ruang KElas Kuliah is required";
  }
  if (!values.hari) {
    errors.hari = "Hari is required";
  }
  if (!values.jam_mulai) {
    errors.jam_mulai = "Jam Mulai is required";
  }
  if (!values.jam_selesai) {
    errors.jam_selesai = "Jam Selesai is required";
  }
  return errors;
};
