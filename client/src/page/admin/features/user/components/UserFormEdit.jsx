import { useNavigate } from "react-router-dom";

const UserFormEdit = ({
  header,
  handleChange,
  handleSubmit,
  formValue,
  formErrors,
  dataAllProgramStudi,
  loading,
}) => {
  const navigate = useNavigate();

  // Style component
  const inputStyle = (value) => {
    return `p-2 w-full rounded-lg border bg-neutral-50 focus:outline-blue focus:bg-secondary ${
      value ? "border-error" : "border-none"
    }`;
  };

  const barisTabel = () => {
    return "flex justify-between items-center w-full";
  };

  const errBaris = () => {
    return "h-6 text-start";
  };

  const errText = () => {
    return "text-error text-[13px]";
  };

  return (
    <>
      <div className="flex justify-center align-center fixed inset-0 z-50 bg-black/30 backdrop-blur-sm ">
        <div className="relative w-full max-w-2xl my-auto bg-secondary p-7 rounded-xl ">
          <div>
            <h1 className="text-black font-extrabold text-2xl mb-4">
              {header}
            </h1>
            <form
              onSubmit={handleSubmit}
              className="text-neutral-900 mt-2"
              autoComplete="off"
            >
              <div className={barisTabel()}>
                <div className="w-1/3">
                  <label htmlFor="kode" className="block font-bold">
                    Program Studi
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <select
                    id="id_program_studi"
                    name="id_program_studi"
                    className={inputStyle(formErrors.id_program_studi)}
                    value={formValue.id_program_studi}
                    onChange={handleChange}
                  >
                    <option></option>
                    {dataAllProgramStudi?.map((value, index) => {
                      return (
                        <option value={value.id} key={index}>
                          {value.nama}
                        </option>
                      );
                    })}
                  </select>
                  <div className={errBaris()}>
                    {formErrors.id_program_studi && (
                      <p className={errText()}>{formErrors.id_program_studi}</p>
                    )}
                  </div>
                </div>
              </div>

              <div className={barisTabel()}>
                <div className="w-1/3">
                  <label htmlFor="nama" className="block font-bold">
                    Nama Admin
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <input
                    id="nama"
                    name="nama"
                    type="text"
                    value={formValue.nama}
                    className={inputStyle(formErrors.nama)}
                    onChange={handleChange}
                  />
                  <div className={errBaris()}>
                    {formErrors.nama && (
                      <p className={errText()}>{formErrors.nama}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className={barisTabel()}>
                <div className="w-1/3">
                  <label htmlFor="nim" className="block font-bold">
                    NIM
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <input
                    id="nim"
                    name="nim"
                    type="text"
                    className={inputStyle(formErrors.nim)}
                    value={formValue.nim}
                    onChange={handleChange}
                  />
                  <div className={errBaris()}>
                    {formErrors.nim && (
                      <p className={errText()}>{formErrors.nim}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className={barisTabel()}>
                <div className="w-1/3">
                  <label htmlFor="email" className="block font-bold">
                    Email
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className={inputStyle(formErrors.email)}
                    value={formValue.email}
                    onChange={handleChange}
                  />
                  <div className={errBaris()}>
                    {formErrors.email && (
                      <p className={errText()}>{formErrors.email}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end gap-4 mt-5">
                <button
                  type="button"
                  className="text-neutral-400 py-2 px-4 rounded-lg border-2 border-neutral-400 "
                  onClick={() => {
                    navigate("/admin/user-panel");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-secondary py-2 px-5 rounded-lg "
                  disabled={loading}
                >
                  {!loading ? "Edit" : "loading..."}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserFormEdit;
