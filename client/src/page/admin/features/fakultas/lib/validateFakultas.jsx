const validateFakultas = (values) => {
  const errors = {};
  if (!values.nama) {
    errors.nama = "Nama Mata Kuliah is required";
  }
  return errors;
};

export { validateFakultas };
