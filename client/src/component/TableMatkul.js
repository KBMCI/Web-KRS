import { useEffect, useRef } from "react";

const TableMatkul = ({ data }) => {
  const data = {
    data: [
      [
        {
          id: 32,
          nama: "A",
          ruang_kelas: "F.1",
          hari: "Senin",
          jam_mulai: "07:00",
          jam_selesai: "08:39",
          matkul: {
            kode_matkul: "CIT0002",
            nama: "Pemograman Dasar",
            tahun_kurikulum: 2020,
            sks: 4,
          },
        },
        {
          id: 33,
          nama: "A",
          ruang_kelas: "F.2",
          hari: "Selasa",
          jam_mulai: "07:00",
          jam_selesai: "08:39",
          matkul: {
            kode_matkul: "CIT0001",
            nama: "Pemograman Web",
            tahun_kurikulum: 2021,
            sks: 4,
          },
        },
      ],
      [
        {
          id: 34,
          nama: "B",
          ruang_kelas: "F.3",
          hari: "Selasa",
          jam_mulai: "13:00",
          jam_selesai: "14:49",
          matkul: {
            kode_matkul: "CIT0002",
            nama: "Pemograman Dasar",
            tahun_kurikulum: 2020,
            sks: 4,
          },
        },
        {
          id: 35,
          nama: "A",
          ruang_kelas: "F.4",
          hari: "Kamis",
          jam_mulai: "17:20",
          jam_selesai: "18:09",
          matkul: {
            kode_matkul: "CIT0010",
            nama: "Administrasi Sistem",
            tahun_kurikulum: 2020,
            sks: 3,
          },
        },
      ],
    ],
  };

  const dataTemp = useRef([...data.data]);

  const table = useRef(null);

  const setTable = (data) => {
    // Mengambil semua children dari table body
    const daysTable = [...table.current.children];

    // Mengambil value hari dari data
    const hari = data.hari;

    // Mengambil value jam_mulai dan jam_selesai dari data
    const jam = `${data.jam_mulai}-${data.jam_selesai}`;

    // Mengambil value matkul dari data
    const matkul = data.matkul.nama;

    // Melakukan for loop untuk acces node yang sesuai dengan jam
    // Node yang ditemukan akan dicocokan dengan dataset table
    daysTable.forEach((time) => {
      if (time.dataset.value === jam) {
        const days = [...time.children];
        // for loop untuk acces node sesuai dengan hari
        // Node akan dicocokan dengan dataset table
        // Setelah ditemukan maka nilai didalamnya akan diubah
        days.forEach((day) => {
          if (day.dataset.value === hari) {
            day.innerHTML = matkul;
          }
        });
      }
    });
  };

  useEffect(() => {
    data.forEach((value) => {
      setTable(value);
    });
  }, [data]);

  return (
    <>
      {/* {dataTemp.current.map((dt, index) => {
          return <TableMatkul data={dt} key={index} />;
      })} */}
      <div className="relative overflow-x-auto shadow-md p-10">
        <h1>Table Matkul</h1>
        <table className="w-full text-sm text-left text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50">
            <tr>
              <th className="px-6 py-3"></th>
              <th className="px-6 py-3">Senin</th>
              <th className="px-6 py-3">Selasa</th>
              <th className="px-6 py-3">Rabu</th>
              <th className="px-6 py-3">Kamis</th>
              <th className="px-6 py-3">Jumat</th>
            </tr>
          </thead>
          <tbody ref={table}>
            <tr data-value="07:00-08:39" className="bg-white border-b">
              <th>07.00 - 08.39</th>
              <td data-value="Senin" className="px-6 py-3"></td>
              <td data-value="Selasa" className="px-6 py-3"></td>
              <td data-value="Rabu" className="px-6 py-3"></td>
              <td data-value="Kamis" className="px-6 py-3"></td>
              <td data-value="Jumat" className="px-6 py-3"></td>
            </tr>
            <tr data-value="07:50-08:39" className="bg-white border-b">
              <th>07.00 - 08.39</th>
              <td data-value="Senin" className="px-6 py-3"></td>
              <td data-value="Selasa" className="px-6 py-3"></td>
              <td data-value="Rabu" className="px-6 py-3"></td>
              <td data-value="Kamis" className="px-6 py-3"></td>
              <td data-value="Jumat" className="px-6 py-3"></td>
            </tr>
            <tr data-value="08:45-10:24" className="bg-white border-b">
              <th>08.45 - 10.24</th>
              <td data-value="Senin" className="px-6 py-3"></td>
              <td data-value="Selasa" className="px-6 py-3"></td>
              <td data-value="Rabu" className="px-6 py-3"></td>
              <td data-value="Kamis" className="px-6 py-3"></td>
              <td data-value="Jumat" className="px-6 py-3"></td>
            </tr>
            <tr data-value="09:35-10:24" className="bg-white border-b">
              <th>09.35 - 10.24</th>
              <td data-value="Senin" className="px-6 py-3"></td>
              <td data-value="Selasa" className="px-6 py-3"></td>
              <td data-value="Rabu" className="px-6 py-3"></td>
              <td data-value="Kamis" className="px-6 py-3"></td>
              <td data-value="Jumat" className="px-6 py-3"></td>
            </tr>
            <tr data-value="10:30-11:19" className="bg-white border-b">
              <th>10.30 - 11.19</th>
              <td data-value="Senin" className="px-6 py-3"></td>
              <td data-value="Selasa" className="px-6 py-3"></td>
              <td data-value="Rabu" className="px-6 py-3"></td>
              <td data-value="Kamis" className="px-6 py-3"></td>
              <td data-value="Jumat" className="px-6 py-3"></td>
            </tr>
            <tr data-value="10:30-12:09" className="bg-white border-b">
              <th>10.30 - 12.09</th>
              <td data-value="Senin" className="px-6 py-3"></td>
              <td data-value="Selasa" className="px-6 py-3"></td>
              <td data-value="Rabu" className="px-6 py-3"></td>
              <td data-value="Kamis" className="px-6 py-3"></td>
              <td data-value="Jumat" className="px-6 py-3"></td>
            </tr>
            <tr data-value="11:20-12:09" className="bg-white border-b">
              <th>11.20 - 12.09</th>
              <td data-value="Senin" className="px-6 py-3"></td>
              <td data-value="Selasa" className="px-6 py-3"></td>
              <td data-value="Rabu" className="px-6 py-3"></td>
              <td data-value="Kamis" className="px-6 py-3"></td>
              <td data-value="Jumat" className="px-6 py-3"></td>
            </tr>
            <tr data-value="13:00-13:49" className="bg-white border-b">
              <th>13.00 - 13.49</th>
              <td data-value="Senin" className="px-6 py-3"></td>
              <td data-value="Selasa" className="px-6 py-3"></td>
              <td data-value="Rabu" className="px-6 py-3"></td>
              <td data-value="Kamis" className="px-6 py-3"></td>
              <td data-value="Jumat" className="px-6 py-3"></td>
            </tr>
            <tr data-value="13:00-14:49" className="bg-white border-b">
              <th>13.00 - 14.49</th>
              <td data-value="Senin" className="px-6 py-3"></td>
              <td data-value="Selasa" className="px-6 py-3"></td>
              <td data-value="Rabu" className="px-6 py-3"></td>
              <td data-value="Kamis" className="px-6 py-3"></td>
              <td data-value="Jumat" className="px-6 py-3"></td>
            </tr>
            <tr data-value="14:45-15:34" className="bg-white border-b">
              <th>14.45 - 15.34</th>
              <td data-value="Senin" className="px-6 py-3"></td>
              <td data-value="Selasa" className="px-6 py-3"></td>
              <td data-value="Rabu" className="px-6 py-3"></td>
              <td data-value="Kamis" className="px-6 py-3"></td>
              <td data-value="Jumat" className="px-6 py-3"></td>
            </tr>
            <tr data-value="14:45-16:24" className="bg-white border-b">
              <th>14.45 - 16.24</th>
              <td data-value="Senin" className="px-6 py-3"></td>
              <td data-value="Selasa" className="px-6 py-3"></td>
              <td data-value="Rabu" className="px-6 py-3"></td>
              <td data-value="Kamis" className="px-6 py-3"></td>
              <td data-value="Jumat" className="px-6 py-3"></td>
            </tr>
            <tr data-value="16:30-18:09" className="bg-white border-b">
              <th>16.30 - 18.09</th>
              <td data-value="Senin" className="px-6 py-3"></td>
              <td data-value="Selasa" className="px-6 py-3"></td>
              <td data-value="Rabu" className="px-6 py-3"></td>
              <td data-value="Kamis" className="px-6 py-3"></td>
              <td data-value="Jumat" className="px-6 py-3"></td>
            </tr>
            <tr data-value="17:20-18:09" className="bg-white border-b">
              <th>17.20 - 18.09</th>
              <td data-value="Senin" className="px-6 py-3"></td>
              <td data-value="Selasa" className="px-6 py-3"></td>
              <td data-value="Rabu" className="px-6 py-3"></td>
              <td data-value="Kamis" className="px-6 py-3"></td>
              <td data-value="Jumat" className="px-6 py-3"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableMatkul;
