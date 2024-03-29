import qs from "qs";
import React, { useContext, useEffect, useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../component/Button";
import TablePlan from "../../component/TablePlan";
import { DataContext } from "../../context/DataContext";
import FilterTabel from "./components/Filter/FIlterTabel";
import { getRandomKrs } from "./services/getRandomKrs";

const RandomKrs = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState([]);
  const [trigerred, setTrigerred] = useState(false);
  const [emptySignError, setEmptySignError] = useState("");
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [buttonLoading, setButtonLoading] = useState(false);
  const location = useLocation();

  const { kelasFiltered, waktuFiltered, setKelasFiltered, setWaktuFiltered } =
    useContext(DataContext);

  // Create a new Array for URL
  const urlParameterWaktu = waktuFiltered.map((item) => item);
  const urlParameterKelas = kelasFiltered.map((item) => item);
  // Get Token
  const token = localStorage.getItem("Authorization");

  // Mengosongkan FIlter jika masuk ke Random KRS
  useEffect(() => {
    setKelasFiltered([]);
    setWaktuFiltered([]);
  }, []);

  // Check plan, jika terdapat hasil filter atau tidak
  const checkLengthPlan = (plan) => {
    if (plan !== null) {
      setPlan(plan);
    } else {
      setPlan([]);
      setEmptySignError(
        "Tidak ada hasil filter, semua jadwal telah di banned oleh anda"
      );
    }
  };

  useEffect(() => {
    setPlan([]);
    const fetchRandomKrs = async () => {
      try {
        const response = await getRandomKrs(
          token,
          urlParameterWaktu,
          urlParameterKelas
        );

        // const getURL = `${response.request?.responseURL}`;
        // console.log(getURL);
        // console.log(location);
        // const newURL = getURL.replace("http://localhost:8080", "");
        // console.log(newURL);
        navigate(location.pathname);
        setSuccess(true);
        checkLengthPlan(response.data.data);
      } catch (err) {
        console.log(err);
        setPlan([]);
        setDisabled(true);
        setSuccess(true);
        setEmptySignError(
          "Pilih mata kuliah pada menu dashboard, lalu kembali lagi"
        );
      }
    };

    if (trigerred) {
      fetchRandomKrs();
    }
  }, [trigerred]);

  // Menampilkan filter
  const [showFIlter, setShowFilter] = useState(false);
  const filterHandler = () => {
    setShowFilter(false);
    console.log("filterHandler Dijalankan ");
  };

  // Fitur Filter
  const [selectedJadwal, setSelectedJadwal] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState([]);
  const [selected, setSelected] = useState({
    jadwal: [],
    kelas: [],
  });

  // Ketika fileter di klik maka akan menjalankan fungsi ini
  const click = () => {
    const fetchFilterRandomKrs = async (e) => {
      try {
        setPlan([]);
        const response = await getRandomKrs(
          token,
          urlParameterWaktu,
          urlParameterKelas
        );
        checkLengthPlan(response.data.data);
        // const getURL = `${response.request?.responseURL}`;
        // const newURL = getURL.replace("http://localhost:8080", "");
        navigate(location.pathname);
      } catch (err) {
        console.log();
      }
    };
    fetchFilterRandomKrs();

    // Ketika tidak menekan checkbox maka tidak akan terjadi apa-apa
    if (selectedJadwal.length === 0 && selectedKelas.length === 0) {
      navigate("/random-krs");
      return;
    }

    // Melakukan update URL
    updateURLParams();

    // Mengubah selected
    // Karena selected diubah maka akan menrequest filter
    setSelected({
      jadwal: selectedJadwal,
      kelas: selectedKelas,
    });
  };

  // Method untuk mengubah URL berdasarkan isi selected
  const updateURLParams = () => {
    const params = {
      jadwal: selectedJadwal,
      kelas: selectedKelas,
    };
    navigate(
      `?${qs.stringify(params, {
        delimiter: "&",
        arrayFormat: "repeat",
        encode: false,
      })}`
    );
  };

  // Method untuk melakukan request filter
  const postData = async () => {
    try {
      const res = await getRandomKrs(
        token,
        urlParameterWaktu,
        urlParameterKelas
      );
      // console.log(res);
      setPlan(res.data.data);
      setSuccess(true);
    } catch (err) {
      console.log(err);
    }
  };

  // Perubahan pada checkbox jadwal
  const jadwalChange = (value) => {
    // Melakukan pengecekan apabila value sudah ada pada state
    // Maka value akan dihapus
    // Apabila belum ada pada State
    // Maka Value akan ditambahakan
    // console.log(selectedJadwal);
    if (selectedJadwal.includes(value)) {
      setSelectedJadwal(selectedJadwal.filter((c) => c !== value));
    } else {
      setSelectedJadwal([...selectedJadwal, value]);
    }
  };

  // Perubahan pada checkbox Kelas
  const kelasChange = (value) => {
    // Melakukan pengecekan apabila value sudah ada pada state
    // Maka value akan dihapus
    // Apabila belum ada pada State
    // Maka Value akan ditambahakan
    if (selectedKelas.includes(value)) {
      setSelectedKelas(selectedKelas.filter((c) => c !== value));
    } else {
      setSelectedKelas([...selectedKelas, value]);
    }
  };

  useEffect(() => {
    // Mengambil data Jadwal dan Kelas pada url
    const params = qs.parse(window.location.search, {
      ignoreQueryPrefix: true,
    });
    console.log(params);
    setSelected({
      jadwal: params.jadwal ? params.jadwal : [],
      kelas: params.kelas ? params.kelas : [],
    });

    // Melakukan pengecekan apakah params bertipe string atau objec
    // Apabila String maka dijadikan Array
    // Apabila Array/Object tetap dijadikan Array
    if (typeof params.jadwal === "string") {
      setWaktuFiltered([params.jadwal] ? [params.jadwal] : []);
    } else {
      setWaktuFiltered(params.jadwal ? params.jadwal : []);
    }

    if (typeof params.kelas === "string") {
      setKelasFiltered([params.kelas] ? [params.kelas] : []);
    } else {
      setKelasFiltered(params.kelas ? params.kelas : []);
    }

    setTrigerred(true);
  }, []);

  useEffect(() => {
    // Melakukan Post Data apabila ada perubahan pada state selected
    if (selected.jadwal.length !== 0 || selected.kelas.length !== 0) {
      postData();
    }
  }, [selected]);

  return (
    <>
      {success && plan !== null ? (
        <>
          {/* Show Filter */}
          {showFIlter && (
            <div className="transition-all duration-200 opacity-100   ">
              <FilterTabel
                selectedJadwal={selectedJadwal}
                selectedKelas={selectedKelas}
                jadwalChange={jadwalChange}
                kelasChange={kelasChange}
                click={click}
                filterHandler={filterHandler}
                plan={plan[0]}
              />
            </div>
          )}

          <div className=" bg-secondary px-7 pt-7">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-sm font-semibold mb-4 pt-4">
                Kamu dapat menemukan Plan KRS tanpa melakukan perencanaan KRS
                secara manual.
              </h3>
            </div>
          </div>

          <Button
            icon={<FiFilter />}
            name="Filter"
            onClick={(e) => {
              setShowFilter(true);
              e.preventDefault();
            }}
            disabled={disabled}
            fixed={true}
            // disabled={plan.length > 0 ? false : true}
          />

          <div className="fixed right-5 bottom-4 z-10 text-primary shadow-primary shadow-2xl rounded-full">
            <a href="#">
              <BsFillArrowUpCircleFill size={60} />
            </a>
          </div>

          {plan.length > 0 ? (
            plan &&
            plan.map((plans, i) => (
              <div key={i}>
                <TablePlan
                  is_saved={plans.is_saved}
                  data={plans.random_krs}
                  plan={i + 1}
                  // currentPage={currentPage}
                  isDisabled={false}
                ></TablePlan>
              </div>
            ))
          ) : (
            <>
              <h1 className="bg-secondary text-error font-extrabold italic px-7 pt-7">
                {emptySignError}
              </h1>
              <TablePlan
                isDisabled={plan === null || plan.length === 0 ? true : false}
              />
            </>
          )}
        </>
      ) : (
        <div className="flex justify-center items-center mt-[25%]">
          <img
            src="https://cdn-icons-png.flaticon.com/512/962/962207.png?w=740&t=st=1683589903~exp=1683590503~hmac=4380adf1cbdd075c3cc273144e3d75dff9290e8fe92e3d2f536913c220f59088"
            className="animate-spin h-16 w-16"
          ></img>
        </div>
      )}
    </>
  );
};

export default RandomKrs;
