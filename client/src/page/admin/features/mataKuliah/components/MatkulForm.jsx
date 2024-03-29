import { useNavigate } from "react-router-dom";

const MatkulForm = ({
  header,
  handleSubmit,
  handleChange,
  formValue,
  formErrors,
  dataAllProgramStudi,
  loading,
}) => {
  const navigate = useNavigate();
  // Style component
  const inputStyle = (value) => {
    return `p-2 w-full rounded-lg border bg-neutral-50 focus:bg-secondarye appearance-none ${
      value ? "border-error" : "border-none "
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
                    name="id_program_studi"
                    id="id_program_studi"
                    className={inputStyle(formErrors.id_program_studi)}
                    value={formValue.id_program_studi}
                    onChange={handleChange}
                  >
                    <option value=""></option>
                    {dataAllProgramStudi?.map((programStudi, index) => (
                      <option value={programStudi.id} key={index}>
                        {programStudi.nama}
                      </option>
                    ))}
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
                  <label htmlFor="kode" className="block font-bold">
                    Kode MK
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <input
                    id="kode_matkul"
                    name="kode_matkul"
                    type="text"
                    className={inputStyle(formErrors.kode_matkul)}
                    value={formValue.kode_matkul}
                    onChange={handleChange}
                  />
                  <div className={errBaris()}>
                    {formErrors.kode_matkul && (
                      <p className={errText()}>{formErrors.kode_matkul}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className={barisTabel()}>
                <div className="w-1/3">
                  <label htmlFor="nama" className="block font-bold">
                    Nama Mata Kuliah
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
                  <label htmlFor="sks" className="block font-bold">
                    Jumlah SKS
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <input
                    id="sks"
                    name="sks"
                    type="number"
                    className={inputStyle(formErrors.sks)}
                    value={formValue.sks}
                    onChange={handleChange}
                  />
                  <div className={errBaris()}>
                    {formErrors.sks && (
                      <p className={errText()}>{formErrors.sks}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className={barisTabel()}>
                <div className="w-1/3">
                  <label htmlFor="tahun_kurikulum" className="block font-bold">
                    Tahun Kurikulum
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <input
                    id="tahun_kurikulum"
                    name="tahun_kurikulum"
                    type="number"
                    className={inputStyle(formErrors.tahun_kurikulum)}
                    value={formValue.tahun_kurikulum}
                    onChange={handleChange}
                  />
                  <div className={errBaris()}>
                    {formErrors.tahun_kurikulum && (
                      <p className={errText()}>{formErrors.tahun_kurikulum}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end gap-4 mt-5">
                <button
                  type="button"
                  className="text-neutral-400 py-2 px-4 rounded-lg border-2 border-neutral-400 "
                  onClick={() => {
                    navigate("/admin/mata-kuliah");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-secondary py-2 px-5 rounded-lg"
                  disabled={loading}
                >
                  {!loading ? "Add" : "Loading..."}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default MatkulForm;
