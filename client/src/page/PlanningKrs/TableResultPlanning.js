import { useEffect, useState, useCallback } from "react";
import { createTable } from "./TableTemp";

const TableResultPlanning = ({ data: matkuls, trigger, resetHandler }) => {
  const table = createTable();
  const [tabelJadwal, setTabelJadwal] = useState();

  const setTabel = useCallback((
    waktu, hari, kelas, matkul, status
  ) => {
    // Jika status -1 jangan melakukan setTabel
    if (status === -1) return;

    // Filter tabel jadwal yang sesuai dengan waktu
    const tabelResult = table.filter((tabel) => tabel.jam === waktu);

    // Mengecek tabel waktu tidak berisi array kosong
    if (tabelResult.length === 0) return;

    // Mengambil Object pada array[0] tabel result
    const [results] = tabelResult;

    // Data Hari
    let days = results.hari;

    let tabel = [];

    Object.keys(days).forEach((result) => {
      // return jika hari tidak sama
      if (result !== hari) return;

      days[result] = status === 1 ? `${matkul} ${kelas}` : "";

      const tempTabel = table;
      tempTabel.forEach((item, index) => {
        if (item.jam === results.jam) (tempTabel[index] = item);
      })
      tabel = tempTabel;
    })
    setTabelJadwal(tabel);
  }, [matkuls])

  useEffect(() => {
    matkuls.forEach((matkul) => {
      matkul.kelas.forEach((kelas) => {
        kelas.jadwal_kelas.forEach((jadwal) => {
          setTabel(
            `${jadwal.jam_mulai} - ${jadwal.jam_selesai}`,
            jadwal.hari.toLowerCase(),
            kelas.nama,
            matkul.nama,
            kelas.status
          );
        });
      });
    });
  }, [matkuls, trigger, setTabel]);

  const barisTabel = () => {
    return "p-2 text-center font-semibold text-[12px] w-1/6 flex items-center";
  };

  const jamTabel = () => {
    return "p-2 text-center font-bold text-[12px] w-1/6 flex items-center";
  };

  const headerTabel = () => {
    return "p-2 text-[12px] w-1/6";
  };
  return (
    <div>
      <h2 className="text-xl font-medium mb-2">My Current Plan </h2>
      <div className="">
        <table className="w-full table-fixed drop-shadow-2xl ">
          <thead className="flex w-full rounded-t-2xl overflow-hidden">
            <tr className=" flex w-full bg-primary text-secondary">
              <th className={headerTabel()}></th>
              <th className={headerTabel()}>Senin</th>
              <th className={headerTabel()}>Selasa</th>
              <th className={headerTabel()}>Rabu</th>
              <th className={headerTabel()}>Kamis</th>
              <th className={headerTabel()}>Jumat</th>
            </tr>
          </thead>
          <tbody
            className="flex flex-col items-center rounded-b-2xl justify-between overflow-y-scroll w-full scrollbar scrollbar-w-[5px] scrollbar-thumb-neutral-400 scrollbar-thumb-rounded-full"
            style={{ height: "80vh", width: `calc(100% + 5px)` }}
          >
            {tabelJadwal?.map((jadwal, index) => (
              <tr
                key={index}
                className="bg-secondary text-neutral-900 border-b border-neutral-400 flex w-full "
              >
                <td className={jamTabel()}>{jadwal.jam}</td>
                <td className={barisTabel()}>{jadwal.hari.senin}</td>
                <td className={barisTabel()}>{jadwal.hari.selasa}</td>
                <td className={barisTabel()}>{jadwal.hari.rabu}</td>
                <td className={barisTabel()}>{jadwal.hari.kamis}</td>
                <td className={barisTabel()}>{jadwal.hari.jumat}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};




export default TableResultPlanning;

