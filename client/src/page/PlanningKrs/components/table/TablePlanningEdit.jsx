import { useCallback, useEffect, useState } from "react";
import { createTable } from "../../lib/tableOfCourseHours";
import timeToDecimal from "../../lib/timeToDecimal";
import Button from "../button/Button";

const TablePlanningEdit = ({
  matkuls,
  setData,
  setTrigger,
  trigger,
  statusHandlerTrue,
}) => {
  const table = createTable();
  const [tabelJadwal, setTabelJadwal] = useState();

  const setTabel = useCallback(
    (waktu, hari, kelas, matkul, id_matkul, id_kelas, status, jadwal_kelas) => {
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
        id_matkul,
        id_kelas,
        matkul,
        kelas,
        status,
        jadwal_kelas,
      };

      let tabel = [];
      // Looping result
      Object.keys(days).forEach((result) => {
        // return jika hari tidak sama
        if (result !== hari) return;

        // Mengecek apakah data telah ada
        const check = days[result].find(
          (obj) =>
            obj.id_matkul === datas.id_matkul &&
            obj.id_kelas === datas.id_kelas &&
            obj.matkul === datas.matkul &&
            obj.kelas === datas.kelas
        );

        if (check) {
          return;
        }

        // Memasukan data pada array hari
        days[result] = [...days[result], datas];

        const tempTabel = table;
        tempTabel.forEach((item, index) => {
          if (item.jam === results.jam) tempTabel[index] = item;
        });
        tabel = tempTabel;
      });
      setTabelJadwal(tabel);
    },
    [trigger]
  );

  useEffect(() => {
    matkuls.forEach((matkul) => {
      matkul.kelas.forEach((kelas) => {
        kelas.jadwal_kelas.forEach((jadwal_kelas) => {
          // Memasukan data pada tabel
          setTabel(
            `${jadwal_kelas.jam_mulai} - ${jadwal_kelas.jam_selesai}`,
            jadwal_kelas.hari.toLowerCase(),
            kelas.nama,
            matkul.nama,
            matkul.id,
            kelas.id,
            kelas.status,
            kelas.jadwal_kelas
          );
        });
      });
    });
  }, [matkuls, setTabel, trigger]);

  const statusHandlerFalse = ({ id_matkul, jadwal_kelas, id_kelas }) => {
    let dataTemp = matkuls;
    matkuls.forEach((matkul, indexMatkul) => {
      matkul.kelas.forEach((kelas, indexKelas) => {
        if (matkul.id === id_matkul) {
          if (kelas.id === id_kelas) {
            // Jika kelas Sama
            const update = { ...kelas, status: 0 };
            dataTemp[indexMatkul].kelas[indexKelas] = update;
          } else {
            const update = setStatusSameMatkul(kelas, matkul.id);
            dataTemp[indexMatkul].kelas[indexKelas] = update;
          }
        } else {
          console.log(`Id matkul beda`);
          kelas.jadwal_kelas.forEach((jk, indexJk) => {
            jadwal_kelas.forEach((j, indexJ) => {
              if (
                (j.hari === jk.hari &&
                  j.jam_mulai === jk.jam_mulai &&
                  j.jam_selesai === jk.jam_selesai) ||
                (j.hari === jk.hari &&
                  timeToDecimal(j.jam_mulai) >= timeToDecimal(jk.jam_mulai) &&
                  timeToDecimal(j.jam_mulai) < timeToDecimal(jk.jam_selesai)) ||
                (j.hari === jk.hari &&
                  timeToDecimal(j.jam_mulai) <= timeToDecimal(jk.jam_mulai) &&
                  timeToDecimal(j.jam_selesai) > timeToDecimal(jk.jam_mulai))
              ) {
                console.log(
                  `masuk jadwal yang sama ${jk.jam_mulai} - ${jk.jam_selesai}`
                );
                // let update = { ...kelas, status: 0 };
                // Bug harus ada kondisi jika matkul di ID yang sama dipilih maka tetap -1
                let update = setStatusDiffMatkul(kelas, matkul.id);
                dataTemp[indexMatkul].kelas[indexKelas] = update;
              }
            });
          });
        }
      });
    });
    setData(dataTemp);
    setTrigger(!trigger);
  };

  const setStatusSameMatkul = (kls, idM) => {
    let update = {};
    let change = true;

    matkuls.forEach((matkul) => {
      matkul.kelas.forEach((kelas) => {
        kelas.jadwal_kelas.forEach((jk) => {
          kls.jadwal_kelas.forEach((j) => {
            if (
              (j.hari === jk.hari &&
                j.jam_mulai === jk.jam_mulai &&
                j.jam_selesai === jk.jam_selesai) ||
              (j.hari === jk.hari &&
                timeToDecimal(j.jam_mulai) >= timeToDecimal(jk.jam_mulai) &&
                timeToDecimal(j.jam_mulai) < timeToDecimal(jk.jam_selesai)) ||
              (j.hari === jk.hari &&
                timeToDecimal(j.jam_mulai) <= timeToDecimal(jk.jam_mulai) &&
                timeToDecimal(j.jam_selesai) > timeToDecimal(jk.jam_mulai))
            ) {
              if (
                kelas.id !== kls.id &&
                kelas.status === 1 &&
                matkul.id !== idM
              ) {
                change = false;
              }
            }
          });
        });
      });
    });
    if (change) {
      update = { ...kls, status: 0 };
    } else {
      update = { ...kls, status: -1 };
    }
    return update;
  };

  const setStatusDiffMatkul = (kls, idM) => {
    let update = {};
    let change = true;

    matkuls.forEach((matkul) => {
      if (matkul.id === idM) {
        matkul.kelas.forEach((kelas) => {
          if (kelas.id !== kls.id && kelas.status === 1) {
            change = false;
          }
        });
      }
    });
    if (change) {
      update = { ...kls, status: 0 };
    } else {
      update = { ...kls, status: -1 };
    }
    return update;
  };
  // Style Tabel
  const barisTabel = () => {
    return "p-2 text-center font-semibold text-[12px] w-1/2 flex flex-col gap-2 items-center";
  };

  const jamTabel = () => {
    return "p-2 text-center font-bold text-[12px] w-1/2 flex items-center justify-center";
  };

  const headerTabel = () => {
    return "p-2 text-[12px] w-1/2";
  };

  return (
    <div className="">
      <table className="w-full table-fixed basis-1/2 drop-shadow-xl">
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
              <td className={barisTabel()}>
                {jadwal.hari.senin?.map((value, index) => (
                  <div key={index}>
                    <Button
                      value={value}
                      statusHandlerTrue={statusHandlerTrue}
                      statusHandlerfalse={statusHandlerFalse}
                    />
                  </div>
                ))}
              </td>
              <td className={barisTabel()}>
                {jadwal.hari.selasa?.map((value, index) => (
                  <div key={index}>
                    <Button
                      value={value}
                      statusHandlerTrue={statusHandlerTrue}
                      statusHandlerfalse={statusHandlerFalse}
                    />
                  </div>
                ))}
              </td>
              <td className={barisTabel()}>
                {jadwal.hari.rabu?.map((value, index) => (
                  <div key={index}>
                    <Button
                      value={value}
                      statusHandlerTrue={statusHandlerTrue}
                      statusHandlerfalse={statusHandlerFalse}
                    />
                  </div>
                ))}
              </td>
              <td className={barisTabel()}>
                {jadwal.hari.kamis?.map((value, index) => (
                  <div key={index}>
                    <Button
                      value={value}
                      statusHandlerTrue={statusHandlerTrue}
                      statusHandlerfalse={statusHandlerFalse}
                    />
                  </div>
                ))}
              </td>
              <td className={barisTabel()}>
                {jadwal.hari.jumat?.map((value, index) => (
                  <div key={index}>
                    <Button
                      value={value}
                      statusHandlerTrue={statusHandlerTrue}
                      statusHandlerfalse={statusHandlerFalse}
                    />
                  </div>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TablePlanningEdit;
