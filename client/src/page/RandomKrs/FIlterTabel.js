import { useContext, useEffect, useState } from "react";
import { FiCheckSquare, FiX } from "react-icons/fi";
import { url } from "../../api/url";
import Checkbox from "../../component/Checkbox";
import { DataContext } from "../../context/DataContext";
import { DataJadwal } from "./FilterData";
import FilterDropdown from "./FilterDropdown";

const TabelFilter = ({
  selectedJadwal,
  selectedKelas,
  kelasChange,
  jadwalChange,
  click,
  filterHandler,
  plan,
}) => {
  const { selectedIdMatkul, setSelectedIdMatkul, setKelasFiltered } =
    useContext(DataContext);
  const [descMatkulFilter, setDescMatkulFilter] = useState([]);
  const [descMatkul, setDescMatkul] = useState([]);

  const { kelasFiltered, waktuFiltered } = useContext(DataContext);

  useEffect(() => {
    console.log("Test Kelas dalam FilterTable.js");
    console.log(kelasFiltered);
    console.log("Test Waktu dalam FilterTable.js");
    console.log(waktuFiltered);
  }, [, kelasFiltered, waktuFiltered]);

  useEffect(() => {
    const getNamaMataKuliah = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await url.get("/dashboard", config);
        setDescMatkul(response.data.data.matkuls);

        console.log("Jadwal seluruh Matkul");
        console.log(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    getNamaMataKuliah();
    console.log(descMatkulFilter);
  }, []);

  useEffect(() => {
    const planTerpilih = JSON.parse(localStorage.getItem("Temporary_plan"));
    // console.log("Plan Terpilih");
    // console.log(planTerpilih);

    // console.log(descMatkul);
    const filtered = descMatkul.filter((matkuls) => {
      return planTerpilih.some((plan) => plan.ID === matkuls.ID);
    });
    // console.log("Telah Difilter");
    // console.log(filtered);
    setDescMatkulFilter(filtered);
  }, [descMatkul]);

  const onClick = () => {
    console.log("YEYEYE");
    console.log(kelasFiltered);
    console.log(plan);
  };

  // FUngsi untuk Tampilan
  const barisTabel = () => {
    return "py-4 px-4 text-center font-semibold md:px-2 sm:text-xs sm:px-2";
  };
  const jamTabel = () => {
    return "py-[10px] pr-[10px] font-bold text-[14px]";
  };

  // Animation
  const [animation, setAnimation] = useState(false);
  useEffect(() => {
    setAnimation(!animation);
    console.log("dijalankan");
  }, []);

  return (
    <div className={``}>
      <div
        className={`flex justify-end align-center fixed top-20 right-[0] left-0 bottom-0 z-[12] ... duration-1000  ${
          animation ? `backdrop-blur-sm bg-black/30 bg-opacity-100` : ``
        }  `}
      >
        <div
          className={`relative flex justify-end w-9/12 ... mx-[-37.5%] transition-all duration-1000 ${
            animation ? "-translate-x-1/2" : `translate-x-1/2`
          }`}
        >
          <div
            className={`basis-[10%]  w-[5%] z-[90] relative top-6 text-end `}
          >
            <button
              className={`bg-accent rounded-l-lg p-2 text-xl   `}
              onClick={() => {
                setAnimation(!animation);
                setTimeout(() => {
                  filterHandler();
                }, 1000);
              }}
            >
              <FiX />
            </button>
          </div>
          <div className={`relative w-[95%] bg-secondary overflow-scroll 1 `}>
            <div className="flex">
              <div className="w-7/12 pl-[30px] mt-[18px] pt-[2px] border-r-2 border-neutral-10 pb-[1rem]">
                <h1 className="text-3xl font-bold">Jadwal</h1>
                <h3 className="text-sm mt-4 font-normal">
                  Pilih Jadwal Kelas yang ingin kamu hindari.
                </h3>
              </div>
              <div className="w-5/12 pl-[30px] mt-[18px] pt-[2px] pb-[1rem]">
                <h1 className="text-3xl font-bold">Mata Kuliah</h1>
                <h3 className="mt-4 text-sm font-normal">
                  Pilih Kelas Mata Kuliah yang ingin kamu hindari.
                </h3>
              </div>
            </div>
            {/*tabel jam dan hari*/}
            {/* <form action=""> */}
            <div className="flex py-30 mt-[2rem] min-h-[390px] bg-neutral-10">
              <div className="px-[30px] w-7/12 bg-secondary border-y-4 border-neutral-10 ">
                <table className="w-full ">
                  <thead>
                    <tr className="bg-secondary text-black">
                      <th className="px-4 py-2"></th>
                      <th className="px-4 py-2">Senin</th>
                      <th className="px-4 py-2">Selasa</th>
                      <th className="px-4 py-2">Rabu</th>
                      <th className="px-4 py-2">Kamis</th>
                      <th className="px-4 py-2">Jum'at</th>
                    </tr>
                  </thead>

                  <tbody>
                    {/* Mapin untuk membuat baris table */}
                    {DataJadwal.map((jadwal, index) => (
                      <tr key={index}>
                        <td className={jamTabel()}>{jadwal.Jam}</td>
                        <td className={barisTabel()}>
                          {
                            <Checkbox
                              value={`${jadwal.Senin}-${jadwal.Jam}`}
                              id={index}
                              day={`${jadwal.Senin}`}
                              time={`${jadwal.Jam}`}
                              onChange={() =>
                                jadwalChange(`${jadwal.Senin}-${jadwal.Jam}`)
                              }
                              checked={selectedJadwal.includes(
                                `${jadwal.Senin}-${jadwal.Jam}`
                              )}
                            />
                          }
                        </td>
                        <td className={barisTabel()}>
                          {
                            <Checkbox
                              value={`${jadwal.Selasa}-${jadwal.Jam}`}
                              id={index}
                              day={`${jadwal.Selasa}`}
                              time={`${jadwal.Jam}`}
                              onChange={() =>
                                jadwalChange(`${jadwal.Selasa}-${jadwal.Jam}`)
                              }
                              checked={selectedJadwal.includes(
                                `${jadwal.Selasa}-${jadwal.Jam}`
                              )}
                            />
                          }
                        </td>
                        <td className={barisTabel()}>
                          {
                            <Checkbox
                              value={`${jadwal.Rabu}-${jadwal.Jam}`}
                              id={index}
                              day={`${jadwal.Rabu}`}
                              time={`${jadwal.Jam}`}
                              onChange={() =>
                                jadwalChange(`${jadwal.Rabu}-${jadwal.Jam}`)
                              }
                              checked={selectedJadwal.includes(
                                `${jadwal.Rabu}-${jadwal.Jam}`
                              )}
                            />
                          }
                        </td>
                        <td className={barisTabel()}>
                          {
                            <Checkbox
                              value={`${jadwal.Kamis}-${jadwal.Jam}`}
                              id={index}
                              day={`${jadwal.Kamis}`}
                              time={`${jadwal.Jam}`}
                              onChange={() =>
                                jadwalChange(`${jadwal.Kamis}-${jadwal.Jam}`)
                              }
                              checked={selectedJadwal.includes(
                                `${jadwal.Kamis}-${jadwal.Jam}`
                              )}
                            />
                          }
                        </td>
                        <td className={barisTabel()}>
                          {
                            <Checkbox
                              value={`${jadwal.Jumat}-${jadwal.Jam}`}
                              id={index}
                              day={`${jadwal.Jumat}`}
                              time={`${jadwal.Jam}`}
                              onChange={() =>
                                jadwalChange(`${jadwal.Jumat}-${jadwal.Jam}`)
                              }
                              checked={selectedJadwal.includes(
                                `${jadwal.Jumat}-${jadwal.Jam}`
                              )}
                            />
                          }
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="w-5/12 h-[43rem] overflow-auto bg-neutral-10">
                <div className="flex flex-col w-full bg-neutral-10">
                  {/* Maping untuk membuat list Dropdown */}
                  {descMatkulFilter.map((matkul) => {
                    return (
                      <FilterDropdown
                        key={matkul.ID}
                        nama={matkul.nama}
                        kelas={matkul.kelas}
                        selectedKelas={selectedKelas}
                        kelasChange={kelasChange}
                      />
                    );
                  })}
                </div>
              </div>
            </div>
            <div className="flex justify-end mt-5 mb-5 pr-5">
              {/* Button Terapkan FIlter */}
              <button
                className="bg-accent text-black px-5 py-3 rounded-xl font-bold flex items-center gap-2"
                onClick={() => {
                  setAnimation(!animation);
                  setTimeout(() => {
                    filterHandler();
                    click();
                  }, 700);
                }}
              >
                {<FiCheckSquare />}
                Terapkan Filter
              </button>
            </div>
            {/* </form> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabelFilter;
