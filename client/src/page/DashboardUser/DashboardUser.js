import { useContext, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { url } from "../../api/url";
import LogoMyPlans from "../../assets/LogoMyPlans.svg";
import LogoPlanning from "../../assets/LogoPlanning.svg";
import LogoRandom from "../../assets/LogoRandom.svg";
import LogoSearch from "../../assets/LogoSearch.svg";
import TablePlan from "../../component/TablePlan";
import { DataContext } from "../../context/DataContext";
import MatkulCheckbox from "./MatkulCheckbox";

const DashboardUser = () => {
  const [isFilled, setIsFilled] = useState(false);
  const [firstPlan, setFirstPlan] = useState([]);
  const [namaMataKuliahTabel, setNamaMataKuliahTabel] = useState([]);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();
  const { selectedIdMatkul, setSelectedIdMatkul } = useContext(DataContext);

  useEffect(() => {
    // Tabel Mata Kuliah Dipilih ===============
    // Mendapatkan Nama Mata Kulah untuk tabel "Mata Kuliah Dipilih"
    const getNamaMataKuliah = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await url.get("/dashboard", config);
        // console.log(response);
        setNamaMataKuliahTabel(response.data.data.ProgramStudi.prodi_matkul);
      } catch (err) {
        console.log(err);
      }
    };
    getNamaMataKuliah();

    // My Plan ============================
    // Mendapatkan Jadwal Kuliah yang telah di Tambahkan User
    const getMyplans = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await url.get("/my-plan", config);
        // console.log(response);
        setIsFilled(true);
        setFirstPlan(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMyplans();

    // Mengambil ID Mata kuliah User yang telah dipilih dari Database
    const getIDMatkuls = async () => {
      const token = localStorage.getItem("Authorization");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const response = await url.get("/user/matkul", config);
      // console.log(response);
      const getIDFromResponse = response.data.data.matkuls.map((item) => ({
        ID: item.id,
      }));
      // console.log(getIDFromResponse);
      setSelectedIdMatkul(getIDFromResponse);
      // setSelectedIdMatkul(response.data.data.matkuls);
    };
    getIDMatkuls();
    // console.log("Show Id Matkuls");
    // console.log(selectedIdMatkul);

    // Mengambil id matkul untuk check checkbox
    // setSelectedIdMatkul(JSON.parse(localStorage.getItem("Temporary_plan")));
  }, [, setSelectedIdMatkul]);

  // Handle ketika user menng-klik tombol save/simpan
  const onPostHandle = async () => {
    try {
      const token = localStorage.getItem("Authorization");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const response = await url.post(
        "/user/matkul",
        { matkuls: selectedIdMatkul },
        config
      );
      // console.log("Matkul yang diupdate");
      // console.log(selectedIdMatkul);
      // console.log(response);
      window.alert(
        "Mata kuliah anda sudah dipilih untuk diproses dalam Random Krs"
      );
      // localStorage.setItem("Temporary_plan", JSON.stringify(selectedIdMatkul));
    } catch (err) {
      console.log(err.message);
    }
  };

  // Logic untuk Search Bar
  const getFilteredItems = (query, items) => {
    if (!query) {
      return items;
    }
    // console.log(query);
    // console.log(items);
    return items.filter((matkul) =>
      matkul.nama.toLowerCase().includes(query.toLowerCase())
    );
  };

  // filter
  const filteredItems = getFilteredItems(query, namaMataKuliahTabel);

  const barisTabel = () => {
    return "h-[51.13px] min-h-[51.13px] py-[10px] px-4 font-semibold text-base";
  };

  return (
    <div className="bg-secondary p-7">
      <div className=" grid grid-cols-6 gap-3">
        {/* Tabel Mata Kuliah */}
        <h1 className="neutral-900 font-semibold text-2xl ml-[2px] mt-[1px] p-[10px] col-span-6 ">
          Mata Kuliah Dipilih
        </h1>
        <div className="Tabel-Mata-Kuliah  col-span-4">
          <div className="w-full shadow-lg  rounded-[10px] mb-[10px] h-[451px] max-h-[451px] overflow-y-scroll scrollbar scrollbar-thumb-neutral-400 scrollbar-w-1 scrollbar-thumb-rounded-lg">
            <table className="table-auto border-collapse border-b border-neutral-400 w-full drop-shadow-xl ">
              <thead className="">
                <tr className="bg-primary text-secondary sticky top-0">
                  <th className="px-4 py-[10px] w-[47px] h-[42px]"></th>
                  <th className="pl-[16px] pr-[21px] py-[10px] h-[42px] w-[101px]">
                    Kode MK
                  </th>
                  <th className="px-[16px] py-[10px] h-[42px] w-[335px] text-left">
                    Nama Mata Kuliah
                  </th>
                  <th className="h-[42px] w-[235px] p-2">
                    <div className="flex justify-center items-center gap-2">
                      <div>
                        <img src={LogoSearch} alt="" width="30" />
                      </div>

                      <input
                        type="text"
                        onChange={(e) => setQuery(e.target.value)}
                        className="bg-primary border-none rounded-3xl text-[15px] text-secondary  py-[4px] px-3 border-2  focus:border-neutral-50 primary placeholder:text-secondary placeholder:text-[13px]  font-semibold w-[300px] ...  focus:outline-non focus:outline-neutral-10 transition duration-300 "
                        placeholder="Search Mata Kuliah"
                      />
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems &&
                  filteredItems.map((matkul, index) => (
                    <tr
                      key={index}
                      className="bg-secondary text-neutral-900 border-b border-neutral-400 "
                    >
                      {/* {console.log(matkul)} */}
                      <td className="px-4 py-[10px] w-[47px] h-[51.13]">
                        <MatkulCheckbox
                          namaMatkul={matkul.nama}
                          id={matkul.id}
                          index={index}
                          AllMatkul={matkul}
                        />
                      </td>
                      <td
                        className={`${barisTabel()} py-[10px] px-4 font-semibold w-[101px]`}
                      >
                        {matkul.kode_matkul}
                      </td>
                      <td
                        className={`${barisTabel()} py-[10px] px-4 font-semibold w-[335px]`}
                      >
                        {matkul.nama}
                      </td>
                      <td
                        className={`${barisTabel()} py-[10px] px-4 font-semibold w-[335px]`}
                      ></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className="flex justify-end items-end text-neutral-10">
            <button
              className="bg-primary rounded-xl p-3"
              onClick={onPostHandle}
            >
              Simpan
            </button>
          </div>
        </div>

        {/* Card Planning  */}
        <div className="Card-Planning  col-span-2">
          <div className="flex-col">
            <div className="bg-secondary h-[451px] w-[337px] flex flex-col items-center shadow-2xl rounded-[15px] ">
              <div className="mt-[48px] mb-[40px]">
                <img
                  className="mx-[131px] mb-[17px]"
                  src={LogoPlanning}
                  width={75}
                  height={75}
                  alt="Planning KRS"
                />
                <div>
                  <h1 className="neutral-900 font-bold text-2xl text-center p-[10px]">
                    Planning KRS
                  </h1>
                  <p className="neutral-900 text-center p-[10px]">
                    merupakan fitur yang dibuat untuk anda melakukan perencanaan
                    Kartu Rencana Semester. Akan disediakan banyak mata kuliah
                    yang dapat Anda pilih nantinya.
                  </p>
                </div>
              </div>
              <Link to="/planning-krs">
                <button className="bg-accent rounded-[10px] font-semibold text-base px-[32px] py-[15px] mb-[48px]">
                  Coba
                </button>
              </Link>
            </div>
          </div>
        </div>

        {/* Tabel My Plan */}
        <h1 className=" neutral-900 font-semibold text-2xl ml-[22px] mb-[7px] col-span-6">
          My Plans
        </h1>

        <div className="Tabel-My-Plan col-span-4">
          <div className="bg-secondary  flex flex-col items-center w-full px-20 h-fit  md:h-[303px] shadow-2xl rounded-[10px]">
            {isFilled && firstPlan ? (
              <>
                <TablePlan
                  data={firstPlan[0].plan}
                  dashboardUser={true}
                ></TablePlan>
              </>
            ) : (
              <>
                <div className="mt-[20px]">
                  <img className="mb-[10px]" src={LogoMyPlans} alt="" />
                </div>
                <p className="neutral-900 text-center font-semibold text-base lg:p-[10px] ">
                  Oops, kamu belum memiliki plan apapun yang tersimpan. Buat
                  satu atau lebih agar dapat ditampilkan disini
                </p>

                <Link to="/random-krs">
                  <button className="bg-accent rounded-[10px] font-semibold text-base px-[32px] py-[15px] mb-[20px]">
                    Add Plan
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>

        {/* Card Random KRS */}
        <div className="Card-Random-KRS col-span-2">
          <div className="bg-secondary  w-[337px] flex flex-col items-center shadow-2xl rounded-[15px]">
            <img
              className="mt-[17.8px] mb-[10px]"
              src={LogoRandom}
              alt="Random KRS"
            />
            <div>
              <h1 className="neutral-900 font-bold text-2xl text-center p-[10px]">
                Random KRS
              </h1>
              <p className="neutral-900 text-center p-[10px] mx-[22.5px] mb-[8px]">
                dengan random krs sistem akan memberikan jadwal yang tersedia
                dengan acak
              </p>
            </div>
            <Link to="/random-krs">
              <button className="bg-accent rounded-[10px] font-semibold text-base px-[32px] py-[15px] mb-[17.8px]">
                Coba
              </button>
            </Link>
          </div>
        </div>
        {/*  */}
      </div>
    </div>
  );
};

export default DashboardUser;
