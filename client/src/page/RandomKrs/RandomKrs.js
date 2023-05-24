import React, { useEffect, useState } from "react";
import { FiFilter } from "react-icons/fi";
import Button from "../../component/Button";
import Paginations from "../../component/Paginations";
import TablePlan from "../../component/TablePlan";

import qs from "qs";
import { useNavigate } from "react-router-dom";
import { url } from "../../api/url";
import FilterTabel from "./FIlterTabel";

const RandomKrs = () => {
  const [plan, setPlan] = useState([]);
  // Pagination Logic
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);
  const lastPostIndex = currentPage * postsPerPage;
  const firstPostIndex = lastPostIndex - postsPerPage;
  // Berhasil Ambil data
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchRandomKrs = async () => {
      // setLoading(true)

      // setTimeout(()=>{
      //     setLoading(false)
      // }, 10000)

      try {
        // mengambil token di localstorage
        const token = localStorage.getItem("Authorization");
        // membuat header agar bisa akses endpoint dengan token

        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        // get data random krs
        const respone = await url.get(
          "/random-krs",
          config
        );
        console.log("load data");
        console.log("random krs yang 900");
       
        setPlan(respone.data.data);
        setSuccess(true);
        console.log(respone.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchRandomKrs();
  }, []);

  // Menampilkan filter
  const [showFIlter, setShowFilter] = useState(false);
  const filterHandler = () => {
    setShowFilter(false);
  };

  // Ftur Filter
  const [selectedJadwal, setSelectedJadwal] = useState([]);
  const [selectedKelas, setSelectedKelas] = useState([]);
  const navigate = useNavigate();
  const [selected, setSelected] = useState({
    jadwal: [],
    kelas: [],
  });

  // Ketika fileter di klik maka akan menjalankan fungsi ini
  const click = () => {
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
    console.log(selectedJadwal);
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
    setSelected({
      jadwal: params.jadwal ? params.jadwal : [],
      kelas: params.kelas ? params.kelas : [],
    });

    // Melakukan pengecekan apakah params bertipe string atau objec
    // Apabila String maka dijadikan Array
    // Apabila Array/Object tetap dijadikan Array
    if (typeof params.jadwal === "string") {
      setSelectedJadwal([params.jadwal] ? [params.jadwal] : []);
    } else {
      setSelectedJadwal(params.jadwal ? params.jadwal : []);
    }

    if (typeof params.kelas === "string") {
      setSelectedKelas([params.kelas] ? [params.kelas] : []);
    } else {
      setSelectedKelas(params.kelas ? params.kelas : []);
    }
  }, []);

  useEffect(() => {
    // Melakukan Post Data apabila ada perubahan pada state selected
    if (selected.jadwal.length !== 0 || selected.kelas.length !== 0) {
      postData();
    }
  }, [selected]);

  return (
    <>
      {success ? (
        <>
          {/* Show Filter */}
          {showFIlter && (
            <div>
              <FilterTabel
                selectedJadwal={selectedJadwal}
                selectedKelas={selectedKelas}
                jadwalChange={jadwalChange}
                kelasChange={kelasChange}
                click={click}
                filterHandler={filterHandler}
              />
            </div>
          )}

          <div className=" bg-secondary px-7 pt-7">
            <div className="flex flex-row justify-between items-center">
              <h3 className="text-sm font-semibold mb-4 pt-4">
                Kamu dapat menemukan Plan KRS tanpa melakukan perencanaan KRS
                secara manual.
              </h3>
              <Button
                icon={<FiFilter />}
                name="Filter"
                onClick={() => setShowFilter(true)}
              />
            </div>
          </div>

          {plan &&
            plan.slice(firstPostIndex, lastPostIndex).map((plans, i) => (
              <div key={i}>
                <TablePlan
                  is_saved={plans.is_saved}
                  data={plans.random_krs}
                  plan={firstPostIndex + i + 1}
                  currentPage={currentPage}></TablePlan>
              </div>
            ))}
          <div className=" bg-secondary p-7">
            <Paginations
              data={plan}
              itemsPerPage={postsPerPage}
              setCurrentPage={setCurrentPage}
              currentPage={currentPage}
            />
          </div>
        </>
      ) : (
        <div className="flex justify-center items-center mt-[25%]">
          <img
            src="https://cdn-icons-png.flaticon.com/512/962/962207.png?w=740&t=st=1683589903~exp=1683590503~hmac=4380adf1cbdd075c3cc273144e3d75dff9290e8fe92e3d2f536913c220f59088"
            className="animate-spin h-16 w-16"></img>
        </div>
      )}
    </>
  );
};

export default RandomKrs;
