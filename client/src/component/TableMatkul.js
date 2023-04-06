import { useEffect, useRef } from "react";

const TableMatkul = () => {
  const table = useRef(null);
  const data = {
    data: {
      nama_kelas: "A",
      hari: "senin",
      jam_mulai: "07.00",
      jam_selesai: "08.39",
      matkul: {
        nama_matkul: "Admistrasi Sistem",
      },
    },
  };

  const dataAll = [
    {
      id: "1",
      nama_kelas: "A",
      hari: "senin",
      jam_mulai: "07.00",
      jam_selesai: "08.39",
      matkul: {
        nama_matkul: "Admistrasi Sistem",
      },
    },
    {
      nama_kelas: "A",
      hari: "senin",
      jam_mulai: "07.00",
      jam_selesai: "08.39",
      matkul: {
        nama_matkul: "Admistrasi Sistem",
      },
    }
  ];
  const dataTemp = useRef(data);

  const setTable = ({ data }) => {
    // Mengambil semua children dari table body
    const daysTable = [...table.current.children];

    // Mengambil value hari dari data
    const hari = data.hari;

    // Mengambil value jam_mulai dan jam_selesai dari data
    const jam = `${data.jam_mulai}-${data.jam_selesai}`;

    // Mengambil value matkul dari data
    const matkul = data.matkul.nama_matkul;

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
    console.log(dataTemp);
    console.log(table.current.children[0].dataset.value);
    setTable(dataTemp.current);
  }, []);

  return (
    <>
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
            <tr data-value="07.00-08.39" className="bg-white border-b">
              <th>07.00 - 08.39</th>
              <td data-value="senin" className="px-6 py-3"></td>
              <td data-value="selasa" className="px-6 py-3"></td>
              <td data-value="rabu" className="px-6 py-3"></td>
              <td data-value="kamis" className="px-6 py-3"></td>
              <td data-value="jumat" className="px-6 py-3"></td>
            </tr>
            <tr data-value="07.50-08.39" className="bg-white border-b">
              <th>07.00 - 08.39</th>
              <td data-value="senin"></td>
              <td data-value="selasa"></td>
              <td data-value="rabu"></td>
              <td data-value="kamis"></td>
              <td data-value="jumat"></td>
            </tr>
            <tr data-value="08.45-10.24" className="bg-white border-b">
              <th>08.45 - 10.24</th>
              <td data-value="senin"></td>
              <td data-value="selasa"></td>
              <td data-value="rabu"></td>
              <td data-value="kamis"></td>
              <td data-value="jumat"></td>
            </tr>
            <tr data-value="09.35-10.24" className="bg-white border-b">
              <th>09.35 - 10.24</th>
              <td data-value="senin"></td>
              <td data-value="selasa"></td>
              <td data-value="rabu"></td>
              <td data-value="kamis"></td>
              <td data-value="jumat"></td>
            </tr>
            <tr data-value="10.30-11.19" className="bg-white border-b">
              <th>10.30 - 11.19</th>
              <td data-value="senin"></td>
              <td data-value="selasa"></td>
              <td data-value="rabu"></td>
              <td data-value="kamis"></td>
              <td data-value="jumat"></td>
            </tr>
            <tr data-value="10.30-12.09" className="bg-white border-b">
              <th>10.30 - 12.09</th>
              <td data-value="senin"></td>
              <td data-value="selasa"></td>
              <td data-value="rabu"></td>
              <td data-value="kamis"></td>
              <td data-value="jumat"></td>
            </tr>
            <tr data-value="11.20-12.09" className="bg-white border-b">
              <th>11.20 - 12.09</th>
              <td data-value="senin"></td>
              <td data-value="selasa"></td>
              <td data-value="rabu"></td>
              <td data-value="kamis"></td>
              <td data-value="jumat"></td>
            </tr>
            <tr data-value="13.00-13.49" className="bg-white border-b">
              <th>13.00 - 13.49</th>
              <td data-value="senin"></td>
              <td data-value="selasa"></td>
              <td data-value="rabu"></td>
              <td data-value="kamis"></td>
              <td data-value="jumat"></td>
            </tr>
            <tr data-value="13.00-14.49" className="bg-white border-b">
              <th>13.00 - 14.49</th>
              <td data-value="senin"></td>
              <td data-value="selasa"></td>
              <td data-value="rabu"></td>
              <td data-value="kamis"></td>
              <td data-value="jumat"></td>
            </tr>
            <tr data-value="14.45-15.34" className="bg-white border-b">
              <th>14.45 - 15.34</th>
              <td data-value="senin"></td>
              <td data-value="selasa"></td>
              <td data-value="rabu"></td>
              <td data-value="kamis"></td>
              <td data-value="jumat"></td>
            </tr>
            <tr data-value="14.45-16.24" className="bg-white border-b">
              <th>14.45 - 16.24</th>
              <td data-value="senin"></td>
              <td data-value="selasa"></td>
              <td data-value="rabu"></td>
              <td data-value="kamis"></td>
              <td data-value="jumat"></td>
            </tr>
            <tr data-value="16.30-18.09" className="bg-white border-b">
              <th>16.30 - 18.09</th>
              <td data-value="senin"></td>
              <td data-value="selasa"></td>
              <td data-value="rabu"></td>
              <td data-value="kamis"></td>
              <td data-value="jumat"></td>
            </tr>
            <tr data-value="17.20-18.09" className="bg-white border-b">
              <th>17.20 - 18.09</th>
              <td data-value="senin"></td>
              <td data-value="selasa"></td>
              <td data-value="rabu"></td>
              <td data-value="kamis"></td>
              <td data-value="jumat"></td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
};

export default TableMatkul;
