const validateProgramStudi = (values) => {
  const errors = {};
  if (!values.id_fakultas) {
    errors.id_fakultas = "Id Fakultas is required";
  }
  if (!values.nama) {
    errors.nama = "Nama Mata Kuliah is required";
  }

  return errors;
};

export { validateProgramStudi };
