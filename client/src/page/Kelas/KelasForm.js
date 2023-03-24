import { useNavigate } from "react-router-dom";

const Form = ({
  handleChange,
  handleSubmit,
  formValue,
  formErrors,
  dataMatkul,
}) => {
  const hari = ["Senin", "Selasa", "Rabu", "Kamis", "Jum'at"];
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
              Add Kelas
            </h1>
            <form
              onSubmit={handleSubmit}
              className="text-neutral-900 mt-2"
              autoComplete="off"
            >
              <div className={barisTabel()}>
                <div className="w-1/3">
                  <label htmlFor="kode" className="block font-bold">
                    Kode MK
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <select
                    id="kode_matkul"
                    name="kode_matkul"
                    className={inputStyle(formErrors.kode_matkul)}
                    value={formValue.kode_matkul}
                    onChange={handleChange}
                  >
                    {dataMatkul.map((value) => {
                      return (
                        <option
                          value={value.kode_matkul}
                          key={value.kode_matkul}
                        >
                          {value.nama}
                        </option>
                      );
                    })}
                  </select>
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
                    Nama Kelas
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
                  <label htmlFor="ruang_kelas" className="block font-bold">
                    Ruang Kelas
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <input
                    id="ruang_kelas"
                    name="ruang_kelas"
                    type="text"
                    className={inputStyle(formErrors.ruang_kelas)}
                    value={formValue.ruang_kelas}
                    onChange={handleChange}
                  />
                  <div className={errBaris()}>
                    {formErrors.ruang_kelas && (
                      <p className={errText()}>{formErrors.ruang_kelas}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className={barisTabel()}>
                <div className="w-1/3">
                  <label htmlFor="hari" className="block font-bold">
                    Hari
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <select
                    id="hari"
                    name="hari"
                    type="text"
                    className={inputStyle(formErrors.hari)}
                    value={formValue.hari}
                    onChange={handleChange}
                  >
                    {hari.map((value, index) => {
                      return (
                        <option value={value} key={index}>
                          {value}
                        </option>
                      );
                    })}
                  </select>
                  <div className={errBaris()}>
                    {formErrors.hari && (
                      <p className={errText()}>{formErrors.hari}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className={barisTabel()}>
                <div className="w-1/3">
                  <label htmlFor="jam_mulai" className="block font-bold">
                    Jam Mulai
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <div className="flex gap-2">
                    <input
                      id="jam_mulai"
                      name="jam_mulai"
                      type="time"
                      className={`${inputStyle(formErrors.jam_mulai)} w-1/2`}
                      value={formValue.jam_mulai}
                      onChange={handleChange}
                    />
                    <input
                      id="jam_selesai"
                      name="jam_selesai"
                      type="time"
                      className={`${inputStyle(formErrors.jam_mulai)} w-1/2`}
                      value={formValue.jam_selesai}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="flex gap-2">
                    <div className={`${errBaris()} w-1/2`}>
                      {formErrors.jam_mulai && (
                        <p className={errText()}>{formErrors.jam_mulai}</p>
                      )}
                    </div>
                    <div className={`${errBaris()} w-1/2`}>
                      {formErrors.jam_selesai && (
                        <p className={errText()}>{formErrors.jam_selesai}</p>
                      )}
                    </div>
                  </div>
                </div>
              </div>

              <div className="w-full flex justify-end gap-4 mt-5">
                <button
                  type="button"
                  className="text-neutral-400 py-2 px-4 rounded-lg border-2 border-neutral-400 "
                  onClick={() => {
                    navigate("/kelas");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-secondary py-2 px-5 rounded-lg  "
                >
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
