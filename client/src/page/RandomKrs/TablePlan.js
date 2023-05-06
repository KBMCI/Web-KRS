import { useEffect, useState } from "react";
import { header } from "./TableHeader";
import Button from "../../component/Button";
import Paginate from "../../component/Paginate";
import { FiFilter, FiPlus } from "react-icons/fi";


const TablePlan = ({ data }) => {
  const [jadwalKuliah, setJadwalKuliah] = useState([
    {
      jam: "07.00 - 08.39",
      senin: "",
      selasa: "",
      rabu: "",
      kamis: "",
      jumat: "",
    },
    {
      jam: "07.50 - 08.39",
      senin: "",
      selasa: "",
      rabu: "",
      kamis: "",
      jumat: "",
    },
    {
      jam: "08.40 - 10.19",
      senin: "",
      selasa: "",
      rabu: "",
      kamis: "",
      jumat: "",
    },
    {
      jam: "09.30 - 11.59",
      senin: "",
      selasa: "",
      rabu: "",
      kamis: "",
      jumat: "",
    },
    {
      jam: "10.20 - 11.59",
      senin: "",
      selasa: "",
      rabu: "",
      kamis: "",
      jumat: "",
    },
    {
      jam: "10.30 - 12.09",
      senin: "",
      selasa: "",
      rabu: "",
      kamis: "",
      jumat: "",
    },
    {
      jam: "11.20 - 12.09",
      senin: "",
      selasa: "",
      rabu: "",
      kamis: "",
      jumat: "",
    },
    {
      jam: "12.50 - 15.19",
      senin: "",
      selasa: "",
      rabu: "",
      kamis: "",
      jumat: "",
    },
    {
      jam: "13.00 - 13.49",
      senin: "",
      selasa: "",
      rabu: "",
      kamis: "",
      jumat: "",
    },
    {
      jam: "13.00 - 14.49",
      senin: "",
      selasa: "",
      rabu: "",
      kamis: "",
      jumat: "",
    },
    {
      jam: "14.30 - 16.19",
      senin: "",
      selasa: "",
      rabu: "",
      kamis: "",
      jumat: "",
    },
    {
      jam: "14.45 - 16.24",
      senin: "",
      selasa: "",
      rabu: "",
      kamis: "",
      jumat: "",
    },
    {
      jam: "16.30 - 18.09",
      senin: "",
      selasa: "",
      rabu: "",
      kamis: "",
      jumat: "",
    },
    {
      jam: "17.20 - 18.09",
      senin: "",
      selasa: "",
      rabu: "",
      kamis: "",
      jumat: "",
    },
  ]);

  const setPlan = () => {
    Array.isArray(data) &&
      data.map((item, i) => (
        <div key={item.id}>
          {item.jadwal_kelas.map((jadwal, index) => (
            <div key={index}>
              {setTable(
                `${jadwal.jam_mulai} - ${jadwal.jam_selesai}`,
                jadwal.hari.toLowerCase(),
                item.nama_kelas,
                item.nama_matkul
              )}
            </div>
          ))}
        </div>
      ));
  };

  // Mengatur posisi data dalam tabel
  const setTable = (waktu, hari, kelas, matkul) => {
    // Menemukan object yang sesuai untuk di edit
    const found = jadwalKuliah.find((obj) => {
      return obj.jam === waktu;
    });

    // merubah object terpilih (found)
    const updateJadwal = {
      ...found,
      [hari]: `${matkul} (${kelas})`,
    };

    // jadwal palsu yang di updated
    const telahUpdated = [...jadwalKuliah];
    telahUpdated.map((item, i) => {
      if (item.jam === updateJadwal.jam) {
        return (jadwalKuliah[i] = updateJadwal);
      }
    });

    // merubah jadwal asli
    setJadwalKuliah(telahUpdated);
  };

  useEffect(() => {
    setPlan();
  }, [data]);

  const barisTabel = () => {
    return "py-2 text-center px-4 font-semibold 2xl:text-sm xl:text-sm lg:text-sm md:text-xs md:px-2 sm:text-xs sm:px-2";
  };

  const jamTabel = () => {
    return "py-2 px-4 text-center font-bold text-[14px]";
  };

  const headerTabel = () => {
    return "px-4 py-2"
  }

  return (
    <>
    <div className="min-h-[448px] bg-secondary px-7 pb-7 pt-4">
      <div className="mt-5 mb-9"> {/* mbungkus semua plan */}
        
        <> {/* isi tiap plan */}
          <h1 className="text-2xl font-bold mb-4">Plan 1</h1>

          <table className="table-fixed border-collapse border-b border-neutral-400 w-full drop-shadow-2xl rounded-2xl overflow-hidden">
            <thead>
              <tr className="bg-primary text-secondary"> 
                <th className={headerTabel()}></th>
                <th className={headerTabel()}>Senin</th>
                <th className={headerTabel()}>Selasa</th>
                <th className={headerTabel()}>Rabu</th>
                <th className={headerTabel()}>Kamis</th>
                <th className={headerTabel()}>Jumat</th>
              </tr>
            </thead>
            <tbody>
              {jadwalKuliah.map((jadwal, index) => (
                <tr key={index}
                    className="bg-secondary text-neutral-900 border-b border-neutral-400">
                  <td className={jamTabel()}>{jadwal.jam}</td>
                  <td className={barisTabel()}>{jadwal.senin}</td>
                  <td className={barisTabel()}>{jadwal.selasa}</td>
                  <td className={barisTabel()}>{jadwal.rabu}</td>
                  <td className={barisTabel()}>{jadwal.kamis}</td>
                  <td className={barisTabel()}>{jadwal.jumat}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="my-6 flex justify-end">
            <Button icon={<FiPlus/>} name="Add to &quot;MyPlans&quot;" />
          </div>
        </>
      </div>
      
    </div>
  </>
  );
};

export default TablePlan;
