import qs from "qs";
import React, { useContext, useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import { url } from "../../api/url";
import Button from "../../component/Button";
import TablePlan from "../../component/TablePlan";
import { DataContext } from "../../context/DataContext";
import FilterTabel from "./FIlterTabel";

const RandomKrs = () => {
  const [plan, setPlan] = useState([]);
  const [trigerred, setTrigerred] = useState(false);
  const [disabled, setDisabled] = useState(false);

  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(2);
  const [emptySignError, setEmptySignError] = useState("");
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  // Berhasil Ambil data
  const [success, setSuccess] = useState(false);

  // const { planContext, setPlanContext } = useContext(PlanContext);
  const {
    selectedIdMatkul,
    setSelectedIdMatkul,
    filteredKelas,
    setFilteredKelas,
    randomKrs,
    setRandomKrs,
  } = useContext(DataContext);
  // const [loading, setLoading] = useState(false);

  const { kelasFiltered, waktuFiltered, setKelasFiltered, setWaktuFiltered } =
    useContext(DataContext);

  const urlParameterWaktu = waktuFiltered.map((item) => item);
  console.log(urlParameterWaktu);
  const urlParameterKelas = kelasFiltered.map((item) => item);
  console.log(urlParameterKelas);

  // Debugging
  useEffect(() => {
    console.log("Test Kelas dalam RandomKrs.js");
    console.log(kelasFiltered);
    console.log("Test Waktu dalam RandomKrs.js");
    console.log(waktuFiltered);
  }, [kelasFiltered, waktuFiltered]);

  // Mengosongkan FIlter jika keluar dari Random KRS
  useEffect(() => {
    setKelasFiltered([]);
    setWaktuFiltered([]);
  }, []);

  // Check plan, jika terdapat hasil filter atau tidak
  const checkLengthPlan = (plan) => {
    if (plan !== null) {
      setPlan(plan);
    } else {
      console.log("xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx");
      setPlan([]);
      setEmptySignError(
        "Tidak ada hasil filter, semua jadwal telah di banned oleh anda"
      );
    }
  };

  useEffect(() => {
    setPlan([]);
    console.log("DIJALANKAN YAA");
    const fetchRandomKrs = async () => {
      setTimeout(async () => {
        try {
          // mengambil token di localstorage
          const token = localStorage.getItem("Authorization");
          // membuat header agar bisa akses endpoint dengan token

          let config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
            params: {
              jadwal: urlParameterWaktu,
              kelas: urlParameterKelas,
            },
          };

          // get data random krs
          const response = await url.get("/random-krs", config);
          console.log("load data");
          console.log("random krs yang 900");
          console.log(response);

          console.log(response.request.responseURL);
          const getURL = `${response.request?.responseURL}`;
          const removeURL8080 = getURL.replace("http://localhost:8080", "");
          navigate(removeURL8080);
          // setPlan(response.data.data);
          setSuccess(true);
          setRandomKrs(response.data.data);
          // setPlanContext(respone.data.data.random_krs);
          checkLengthPlan(response.data.data);
          console.log(response.data.data);
        } catch (err) {
          console.log(err);
          console.log("Plan antum kosong ");
          setPlan([]);
          setDisabled(true);
          setSuccess(true);
          setEmptySignError(
            "Pilih mata kuliah pada menu dashboard, lalu kembali lagi"
          );
        }
      }, 1000);
    };
    console.log(urlParameterKelas.length);
    console.log(urlParameterKelas);
    console.log(urlParameterWaktu.length);
    console.log(urlParameterWaktu);
    if (trigerred) {
      console.log("BAGAS MAHDA DHANI");
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
  const navigate = useNavigate();
  const [selected, setSelected] = useState({
    jadwal: [],
    kelas: [],
  });

  // Ketika fileter di klik maka akan menjalankan fungsi ini
  const click = () => {
    const fetchFilterRandomKrs = async (e) => {
      try {
        const token = localStorage.getItem("Authorization");
        // membuat header agar bisa akses endpoint dengan token
        setPlan([]);
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: {
            jadwal: urlParameterWaktu,
            kelas: urlParameterKelas,
          },
        };

        const response = await url.get(`/random-krs`, config);
        // navigate(`/ramdom-krs/?${urlParameterWaktu}`);

        checkLengthPlan(response.data.data);
        console.log(response.data.data);
        console.log(response.request?.responseURL);
        const getURL = `${response.request?.responseURL}`;
        const removeURL8080 = getURL.replace("http://localhost:8080", "");
        navigate(removeURL8080);
      } catch {
        console.log("Error nih");
      }
    };

    fetchFilterRandomKrs();

    // const fetchFilterRandom = async () => {
    //   try {
    //     const response =
    //   } catch {}
    // }

    // Ketika tidak menekan checkbox maka tidak akan terjadi apa-apa
    if (selectedJadwal.length === 0 && selectedKelas.length === 0) {
      navigate("/random-krs");
      return;
    }

    // console.log("SESUDAH DI FILTER");
    // console.log(filteredKelas);

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
      // mengambil token di localstorage
      const token = localStorage.getItem("Authorization");
      // membuat header agar bisa akses endpoint dengan token
      console.log(token);
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          jadwal: selected.jadwal,
          kelas: selected.kelas,
        },
      };
      const res = await url.get("/random-krs", config);
      console.log(res);
      setPlan(res.data.data);
      setSuccess(true);
      console.log("ini yang filter udah ke post");
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
    console.log(
      "SIAP MENGAMBIL URL ======================================================="
    );
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
    console.log("xxxx==========================xxxx");
    console.log(kelasFiltered);
    console.log(waktuFiltered);
  }, [trigerred]);

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

          {plan.length > 0 ? (
            plan &&
            plan.map((plans, i) => (
              <div key={i}>
                <TablePlan
                  is_saved={plans.is_saved}
                  data={plans.random_krs}
                  plan={i + 1}
                  currentPage={currentPage}
                  isDisabled={false}
                ></TablePlan>
              </div>
            ))
          ) : (
            <>
              <h1 className="bg-secondary text-error font-extrabold italic px-7 pt-7">
                {emptySignError}
                {console.log("YAHHH ERRORRRR")}
              </h1>
              <TablePlan
                isDisabled={plan === null || plan.length === 0 ? true : false}
              />
            </>
          )}
          {/* <div className=" bg-secondary p-7">
            <Paginations
              data={plan}
              itemsPerPage={plan.length / 2}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div> */}
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
