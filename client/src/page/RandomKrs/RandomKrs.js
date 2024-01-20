import qs from "qs";
import React, { useContext, useEffect, useState } from "react";
import { BsFillArrowUpCircleFill } from "react-icons/bs";
import { FiFilter } from "react-icons/fi";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "../../component/button/Button";
import TablePlan from "../../component/TablePlan";
import { DataContext } from "../../context/DataContext";
import FilterTabel from "./components/Filter/FIlterTabel";
import { getRandomKrs } from "./services/getRandomKrs";
import PageLoading from "../../component/loader/PageLoading";
import Message from "../PlanningKrs/components/message/Message";
import InfiniteScroll from "react-infinite-scroll-component";
import { AiOutlineLoading } from "react-icons/ai";

const RandomKrs = () => {
  const navigate = useNavigate();
  const [plan, setPlan] = useState([]);
  // TODO: Infinite Scroll
  const [AllPlan, setAllPlan] = useState([]);
  // ===================
  const [trigerred, setTrigerred] = useState(false);
  const [emptySignError, setEmptySignError] = useState("");
  const [success, setSuccess] = useState(false);
  const [disabled, setDisabled] = useState(false);

  const location = useLocation();

  const [notif, setNotif] = useState({
    open: false,
    status: false,
    message: "",
  });

  const { kelasFiltered, waktuFiltered, setKelasFiltered, setWaktuFiltered } =
    useContext(DataContext);

  // Create a new Array for URL
  const urlParameterWaktu = waktuFiltered.map((item) => item);
  const urlParameterKelas = kelasFiltered.map((item) => item);
  // Get Token
  const token = localStorage.getItem("Authorization");

  // Mengosongkan Filter jika masuk ke Random KRS
  useEffect(() => {
    setKelasFiltered([]);
    setWaktuFiltered([]);
  }, []);

  // Check plan, jika terdapat hasil filter atau tidak
  const checkLengthPlan = (plan) => {
    if (plan !== null) {
      // TODO: INFINITE SCROLL
      setAllPlan(plan);
      setPlan(plan.slice(0, 3));
      // ===============================================
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
        const getURL = `${response.request?.responseURL}`;
        const urlParts = getURL.split("?");
        navigate(`${location.pathname}?${urlParts[1] ? urlParts[1] : ""}`);

        setSuccess(true);
        checkLengthPlan(response.data.data);
      } catch (err) {
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
      setHasMore(true);
      setIndex(1);
      try {
        setPlan([]);
        const response = await getRandomKrs(
          token,
          urlParameterWaktu,
          urlParameterKelas
        );
        const getURL = `${response.request?.responseURL}`;
        const urlParts = getURL.split("?");
        navigate(`${location.pathname}?${urlParts[1] ? urlParts[1] : ""}`);

        checkLengthPlan(response.data.data);
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

  // TODO: INFINITE SCROLL
  const [hasMore, setHasMore] = useState(true);
  const [index, setIndex] = useState(1);
  // get data for Infinite Scroll
  const fetchMoreData = () => {
    // get Data
    if (plan.length < AllPlan.length) {
      setTimeout(() => {
        setPlan(plan.concat(AllPlan.slice(index * 3, (index + 1) * 3)));

        setIndex((i) => i + 1);
        console.log(`plan ${plan.length}`);
        console.log(`All Plan ${AllPlan.length}`);
      }, 2000);
    } else {
      setHasMore(false);
    }
  };
  // =========================
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
            <div className="flex justify-between items-center">
              <div className="space-y-1 text-neutral-900">
                <h1 className="font-bold text-[28px]">Random KRS</h1>
                <h2 className="font-semibold">
                  Kamu dapat menemukan Plan KRS tanpa melakukan perencanaan KRS
                  secara manual
                </h2>
              </div>
              <Button
                type={"button"}
                icon={<FiFilter />}
                onClick={() => {
                  setShowFilter(() => true);
                }}
                loading={disabled}
                className={"bg-accent h-12 w-24"}
              >
                Filter
              </Button>
            </div>
          </div>

          {plan.length > 0 ? (
            plan && (
              <InfiniteScroll
                dataLength={plan.length}
                next={fetchMoreData}
                hasMore={hasMore}
                loader={
                  <div className="absolute bottom-2 text-primary translate-x-1/2 left-1/2">
                    <div className="animate-spin duration-50 relative">
                      <AiOutlineLoading
                        strokeWidth={10}
                        size={40}
                        color="4071F0"
                      />
                    </div>
                  </div>
                }
              >
                <div className="pb-10 bg-secondary">
                  {plan.map((plans, i) => (
                    <TablePlan
                      is_saved={plans.is_saved}
                      data={plans.random_krs}
                      plan={i + 1}
                      // currentPage={currentPage}
                      setNotif={setNotif}
                      isDisabled={false}
                      key={i}
                    ></TablePlan>
                  ))}
                </div>
              </InfiniteScroll>
            )
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

          <div
            className="fixed right-6 bottom-6 z-10 text-primary shadow-primary bg-secondary shadow-2xl rounded-full cursor-pointer"
            onClick={() => {
              window.scrollTo({ top: 0, behavior: "smooth" });
            }}
          >
            <BsFillArrowUpCircleFill size={50} />
          </div>

          <Message
            textMsg={notif.message}
            statusMsg={notif.status}
            open={notif.open}
          />
        </>
      ) : (
        <>
          <PageLoading />
        </>
      )}
    </>
  );
};

export default RandomKrs;
