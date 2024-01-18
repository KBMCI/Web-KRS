import { useCallback, useEffect, useState } from "react";
import { createTable } from "../../lib/tableOfCourseHours";

const TablePlanningResult = ({ matkuls, trigger }) => {
  const table = createTable();

  const [tabelJadwal, setTabelJadwal] = useState();

  const setTabel = useCallback(
    (waktu, hari, kelas, matkul, status) => {
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

      // Kumpulan data yang dimasukan dalam array
      const datas = {
        matkul,
        kelas,
        status,
      };

      let tabel = [];

      // Looping result
      Object.keys(days).forEach((result) => {
        // return jika hari tidak sama
        if (result !== hari) return;

        // Mengecek apakah data telah ada
        const check = days[result].find(
          (obj) =>
            obj.id_kelas === datas.id_kelas &&
            obj.matkul === datas.matkul &&
            obj.kelas === datas.kelas
        );

        if (check) {
          return;
        }

        // Memasukan data pada array hari
        days[result] = status === 1 ? [...days[result], datas] : [];

        const tempTabel = table;
        tempTabel.forEach((item, index) => {
          if (item.jam === results.jam) tempTabel[index] = item;
        });
        tabel = tempTabel;
      });
      setTabelJadwal(tabel);
    },
    [matkuls, trigger]
  );

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

  useEffect(() => {
    console.log(tabelJadwal);
  }, [tabelJadwal]);

  // Style Tabel
  const barisTabel = () => {
    return "w-1/6 px-2 flex items-center ";
  };

  const jamTabel = () => {
    return "text-center h-28 font-bold text-base w-1/6 flex items-center justify-center";
  };

  const headerTabel = () => {
    return "w-1/6 flex justify-center items-center text-base py-1";
  };

  const matkul = () => {
    return "border-2 border-primary h-20 rounded-xl flex items-center justify-center bg-primary/10 text-neutral-900 p-1";
  };

  const jamMataKuliah = (jam) => {
    const arrJam = jam.split(" ");
    return (
      <div className="flex flex-col gap-1 justify-center items-center">
        {arrJam.map((jam) => {
          return <p>{jam}</p>;
        })}
      </div>
    );
  };
  return (
    <>
      <div className="w-full drop-shadow-xl">
        <div className="flex rounded-t-xl bg-primary text-secondary text-[12px] font-bold text-center py-2">
          <p className={headerTabel()}></p>
          <p className={headerTabel()}>Senin</p>
          <p className={headerTabel()}>Selasa</p>
          <p className={headerTabel()}>Rabu</p>
          <p className={headerTabel()}>Kamis</p>
          <p className={headerTabel()}>Jumat</p>
        </div>
        <div className="h-[80vh] bg-secondary overflow-y-auto scrollbar scrollbar-w-[5px] scrollbar-thumb-neutral-400 scrollbar-thumb-rounded-full">
          {tabelJadwal?.map((jadwal, index) => (
            <div
              key={index}
              className="bg-secondary text-neutral-900 border-b border-neutral-400 flex w-full items-center text-center font-semibold text-[10px]"
            >
              <div className={jamTabel()}>
                <p>{jamMataKuliah(jadwal.jam)}</p>
              </div>
              <div className={barisTabel()}>
                {jadwal.hari.senin?.map((value, index) => (
                  <p className={matkul()} key={index}>
                    {`${value.matkul} ${value.kelas}`}
                  </p>
                ))}
              </div>
              <div className={barisTabel()}>
                {jadwal.hari.selasa?.map((value, index) => (
                  <p className={matkul()} key={index}>
                    {`${value.matkul} ${value.kelas}`}
                  </p>
                ))}
              </div>
              <div className={barisTabel()}>
                {jadwal.hari.rabu?.map((value, index) => (
                  <p className={matkul()} key={index}>
                    {`${value.matkul} ${value.kelas}`}
                  </p>
                ))}
              </div>
              <div className={barisTabel()}>
                {jadwal.hari.kamis?.map((value, index) => (
                  <p className={matkul()} key={index}>
                    {`${value.matkul} ${value.kelas}`}
                  </p>
                ))}
              </div>
              <div className={barisTabel()}>
                {jadwal.hari.jumat?.map((value, index) => (
                  <p className={matkul()} key={index}>
                    {`${value.matkul} ${value.kelas}`}
                  </p>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* <div className="w-full drop-shadow-xl">
        <thead className="flex rounded-t-xl bg-primary ">
          <tr className="flex w-full text-secondary justify-center">
            <th className={headerTabel()}></th>
            <th className={headerTabel()}>Senin</th>
            <th className={headerTabel()}>Selasa</th>
            <th className={headerTabel()}>Rabu</th>
            <th className={headerTabel()}>Kamis</th>
            <th className={headerTabel()}>Jumat</th>
          </tr>
        </thead>
        <tbody
          className="flex flex-col w-full rounded-b-xl justify-between overflow-y-scroll scrollbar scrollbar-w-[5px] scrollbar-thumb-neutral-400 scrollbar-thumb-rounded-full"
          style={{ height: "80vh", width: `calc(100% + 5px)` }}
        >
          {tabelJadwal?.map((jadwal, index) => (
            <tr
              key={index}
              className="bg-secondary text-neutral-900 border-b border-neutral-400 flex w-full"
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
      </div> */}
    </>
  );
};

export default TablePlanningResult;
