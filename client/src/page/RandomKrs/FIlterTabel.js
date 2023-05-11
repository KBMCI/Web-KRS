import { DataJadwal, DataKelas } from "./FilterData";
import { FiCheckSquare, FiX } from "react-icons/fi";
import Checkbox from "../../component/Checkbox";
import FilterDropdown from "./FilterDropdown";

const TabelFilter = ({
  selectedJadwal,
  selectedKelas,
  kelasChange,
  jadwalChange,
  click,
  filterHandler,
}) => {
  // FUngsi untuk Tampilan
  const barisTabel = () => {
    return "py-4 px-4 text-center font-semibold md:px-2 sm:text-xs sm:px-2";
  };
  const jamTabel = () => {
    return "py-[10px] pr-[10px] font-bold text-[14px]";
  };

  return (
    <div className="flex justify-end align-center fixed top-20 right-0 left-0 bottom-0 z-[12] bg-black/30 backdrop-blur-sm">
      <div className="relative flex justify-end w-9/12 ">
        <div className="w-[5%] relative top-6 text-end">
          <button
            className="bg-accent rounded-l-lg p-2 text-xl"
            onClick={filterHandler}
          >
            <FiX />
          </button>
        </div>
        <div className="relative w-[95%] bg-secondary overflow-scroll ">
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
                {DataKelas.map((matkul) => {
                  return (
                    <FilterDropdown
                      key={matkul.ID}
                      nama={matkul.nama}
                      kelas={matkul.Kelas}
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
              onClick={() => click()}
            >
              {<FiCheckSquare />}
              Terapkan Filter
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabelFilter;
