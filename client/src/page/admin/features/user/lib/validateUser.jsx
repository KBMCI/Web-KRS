const validateUser = (values) => {
  const errors = {};
  if (!values.id_program_studi) {
    errors.id_program_studi = "Program Studi is required";
  }
  if (!values.nim) {
    errors.nim = "NIM is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.nama) {
    errors.nama = "Nama is required";
  }
  if (!values?.password) {
    errors.password = "password is required";
  }
  if (!values?.confirm_password) {
    errors.confirm_password = "Confirm Password is required";
  }

  return errors;
};

const validateEditUser = (values) => {
  const errors = {};
  if (!values.id_program_studi) {
    errors.id_program_studi = "Program Studi is required";
  }
  if (!values.nim) {
    errors.nim = "NIM is required";
  }
  if (!values.email) {
    errors.email = "Email is required";
  }
  if (!values.nama) {
    errors.nama = "Nama is required";
  }
  return errors;
};

export { validateEditUser, validateUser };
