const validateMatkul = (values) => {
  const errors = {};
  const regexNumber = /^\d+$/;
  if (!values.id_program_studi) {
    errors.id_program_studi = "Id Program Studi is required";
  }
  if (!values.kode_matkul) {
    errors.kode_matkul = "Kode Mata Kuliah is required";
  }
  if (!values.nama) {
    errors.nama = "Nama Mata Kuliah is required";
  }
  if (!values.sks) {
    errors.sks = "Jumlah SKS is required";
  } else if (!regexNumber.test(values.sks)) {
    errors.sks = "Number input type only";
  }
  if (!values.tahun_kurikulum) {
    errors.tahun_kurikulum = "Tahun Kurikulum is required";
  } else if (!regexNumber.test(values.tahun_kurikulum)) {
    errors.tahun_kurikulum = "Number input type only";
  }

  return errors;
};

export { validateMatkul };
