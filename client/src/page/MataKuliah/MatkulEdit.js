import axios from "axios";
import { useState, useEffect, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MatkulContext } from "../../api/contextMatkul";
import { urlMatkul } from "../../api/url";
import Feedback from "../../component/Feedback";
import ReactLoading from "react-loading";

export default function MatkulEdit() {
  const { Trigger } = useContext(MatkulContext);
  const navigate = useNavigate();
  const kodeParams = useParams();
  const [getId, setGetId] = useState(true);
  const [accept, setAccept] = useState(false);
  const [result, setResult] = useState(true);
  const [loading, setLoading] = useState(false);

  // Initial State value form
  const [kode_matkul, setKode_matkul] = useState("");
  const [nama, setNama] = useState("");
  const [sks, setSks] = useState(0);
  const [tahun_kurikulum, setTahun_kurikulum] = useState(0);

  // Validation Form
  const formValue = {
    kode_matkul: kode_matkul,
    nama: nama,
    sks: sks,
    tahun_kurikulum: tahun_kurikulum,
  };

  const [formErrors, setFormErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);

  const patchData = async ({ kode_matkul, nama, tahun_kurikulum, sks }) => {
    try {
      setLoading(true);
      const res = await axios.patch(`${urlMatkul}/${kodeParams.kode}`, {
        kode_matkul,
        nama,
        tahun_kurikulum: parseFloat(tahun_kurikulum),
        sks: parseInt(sks),
        updated_at: null,
        created_at: null,
      });
      if (res.status === 200) {
        console.log(res);
        setResult(true);
        feedback();
        Trigger();
        setLoading(false);
        setTimeout(() => {
          navigate("/mata-kuliah");
        }, 1501);
      }
    } catch (err) {
      console.log(err);
      setResult(false);
      feedback();
      setLoading(false);
    }
  };

  const getMatkulId = async () => {
    try {
      const { data } = await axios.get(`${urlMatkul}/${kodeParams.kode}`);
      setKode_matkul(data.data.kode_matkul);
      setNama(data.data.nama);
      setSks(data.data.sks);
      setTahun_kurikulum(data.data.tahun_kurikulum);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (Object.keys(formErrors).length === 0 && isSubmit) {
      console.log(formValue);
      patchData(formValue);
    }
    if (getId) {
      getMatkulId();
      setGetId(false);
    }
  }, [formErrors]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormErrors(validate(formValue));
    setIsSubmit(true);
  };

  const validate = (values) => {
    const errors = {};
    const regexNumber = /^\d+$/;
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

  // Style component
  const inputStyle = (value) => {
    return `p-2 w-full rounded-lg border bg-neutral-50 focus:outline-blue focus:bg-secondary ${
      value ? "border-error" : "border-none"
    }`;
  };

  // Feedback
  const feedback = () => {
    setAccept(true);
    setTimeout(() => {
      setAccept(false);
    }, 1500);
  };

  return (
    <>
      <div className="flex justify-center align-center fixed inset-0 z-50 bg-black/30 backdrop-blur-sm ">
        <div className="relative w-full max-w-2xl my-auto bg-secondary p-7 rounded-xl ">
          <div>
            <h1 className="text-black font-extrabold text-2xl mb-4">
              Add Mata Kuliah
            </h1>
            <form
              onSubmit={handleSubmit}
              className="text-neutral-900 mt-2"
              autoComplete="off"
            >
              <div className="mb-3 flex justify-between items-center w-full">
                <div className="w-1/3">
                  <label htmlFor="kode" className="block font-bold">
                    Kode MK
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    id="kode_matkul"
                    name="kode_matkul"
                    type="text"
                    className={inputStyle(formErrors.kode_matkul)}
                    value={kode_matkul}
                    onChange={(ev) => {
                      setKode_matkul(ev.target.value);
                    }}
                  />
                  <div className="h-6">
                    {formErrors.kode_matkul && (
                      <p className="text-error text-[13px]">
                        {formErrors.kode_matkul}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-3 flex justify-between items-center w-full">
                <div className="w-1/3">
                  <label htmlFor="nama" className="block font-bold">
                    Nama Mata Kuliah
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    id="nama"
                    name="nama"
                    type="text"
                    value={nama}
                    className={inputStyle(formErrors.nama)}
                    onChange={(ev) => {
                      setNama(ev.target.value);
                    }}
                  />
                  <div className="h-6">
                    {formErrors.nama && (
                      <p className="text-error text-[13px]">
                        {formErrors.nama}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-3 flex justify-between items-center w-full">
                <div className="w-1/3">
                  <label htmlFor="sks" className="block font-bold">
                    Jumlah SKS
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    id="sks"
                    name="sks"
                    type="text"
                    className={inputStyle(formErrors.sks)}
                    value={sks || ""}
                    onChange={(ev) => {
                      setSks(ev.target.value);
                    }}
                  />
                  <div className="h-6">
                    {formErrors.sks && (
                      <p className="text-error text-[13px]">{formErrors.sks}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="mb-3 flex justify-between items-center w-full">
                <div className="w-1/3">
                  <label htmlFor="tahun_kurikulum" className="block font-bold">
                    Tahun Kurikulum
                  </label>
                </div>
                <div className="w-2/3">
                  <input
                    id="tahun_kurikulum"
                    name="tahun_kurikulum"
                    type="text"
                    className={inputStyle(formErrors.tahun_kurikulum)}
                    value={tahun_kurikulum || ""}
                    onChange={(ev) => {
                      setTahun_kurikulum(ev.target.value);
                    }}
                  />
                  <div className="h-6">
                    {formErrors.tahun_kurikulum && (
                      <p className="text-error text-[13px]">
                        {formErrors.tahun_kurikulum}
                      </p>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end gap-4 mt-5">
                <button
                  type="button"
                  className="text-neutral-400 py-2 px-4 rounded-lg border-2 border-neutral-400 "
                  onClick={() => {
                    navigate("/mata-kuliah");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-secondary py-2 px-5 rounded-lg  "
                >
                  {loading ? <ReactLoading height="5px" width="14px" /> : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
        {accept ? (
          result ? (
            <Feedback check={true} note="patch" />
          ) : (
            <Feedback check={false} note="patch" />
          )
        ) : (
          ""
        )}
      </div>
    </>
  );
}
