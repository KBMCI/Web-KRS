import { FiEdit2, FiTrash2 } from "react-icons/fi";
import Button from "../../component/Button";
import Paginate from "../../component/Paginate";

const MyPlan = () => {

  const jadwalKuliah = [
    {
      jam: '07.00 - 08.39',
      senin: 'Manajemen Proyek Teknologi Informasi (A)',
      selasa: 'Tata Kelola Teknologi Informasi (A)',
      rabu: 'Jaringan Komputer Dasar (C)',
      kamis: '',
      jumat: 'Analisis dan Desain Sistem Informasi (A)',
    },
    {
      jam: '07.50 - 08.39',
      senin: '',
      selasa: '',
      rabu: '',
      kamis: 'Pemrograman Lanjut (D)',
      jumat: '',
    },
    {
      jam: '08.45 - 10.24',
      senin: '',
      selasa: '',
      rabu: '',
      kamis: 'Jaringan Komputer (A)',
      jumat: '',
    },
    {
      jam: '09.35 - 10.24',
      senin: '',
      selasa: '',
      rabu: '',
      kamis: '',
      jumat: '',
    },
    {
      jam: '10.30 - 11.19',
      senin: '',
      selasa: '',
      rabu: '',
      kamis: '',
      jumat: '',
    },
    {
      jam: '10.30 - 12.09',
      senin: '',
      selasa: '',
      rabu: '',
      kamis: '',
      jumat: '',
    },
    {
      jam: '11.20 - 12.09',
      senin: '',
      selasa: '',
      rabu: '',
      kamis: '',
      jumat: '',
    },
    {
      jam: '13.00 - 13.49',
      senin: '',
      selasa: '',
      rabu: '',
      kamis: '',
      jumat: '',
    },
    {
      jam: '13.00 - 14.49',
      senin: 'Matematika Komputasi (E)',
      selasa: 'Jaringan Komputer Dasar (A)',
      rabu: '',
      kamis: '',
      jumat: 'Algoritma Struktur Data (E)',
    },
    {
      jam: '14.45 - 15.34',
      senin: '',
      selasa: '',
      rabu: '',
      kamis: '',
      jumat: '',
    },
    {
      jam: '14.45 - 16.24',
      senin: '',
      selasa: '',
      rabu: '',
      kamis: '',
      jumat: 'Pemrograman Basis Data (A)',
    },
    {
      jam: '16.30 - 18.09',
      senin: '',
      selasa: 'Kewirausahaan (D)',
      rabu: 'Pemrograman Aplikasi Mobile (A)',
      kamis: 'Etika Profesi (A)',
      jumat: '',
    },
    {
      jam: '17.20 - 18.09',
      senin: '',
      selasa: '',
      rabu: '',
      kamis: '',
      jumat: 'Pemrograman Aplikasi Web (B)',
    }
  ];

  const barisTabel = () => {
    return "h-[52px] min-h-[52px] py-2 text-center px-4 font-semibold 2xl:text-sm xl:text-sm lg:text-sm md:text-xs md:px-2 sm:text-xs sm:px-2";
  };

  const jamTabel = () => {
    return "h-[52px] min-h-[52px] py-2 px-4 text-center font-bold 2xl:text-sm xl:text-sm lg:text-sm md:text-xs md:px-2 sm:text-xs sm:px-2"
  }

  const headerTabel = () => {
    return "px-4 py-2"
  }
  
  return (
    <>
      <div className="min-h-[448px] bg-secondary p-7">
        <h1 className="text-4xl font-bold">My Plan</h1>
        <h3 className="text-sm font-semibold mt-4 mb-7">Kumpulan Plan KRS yang telah kamu simpan sebelumnya.</h3>
        {/* <div className="flex flex-row justify-between items-center">
          <h3 className="text-sm font-semibold mb-4 pt-4">Kamu dapat menemukan Plan KRS tanpa melakukan perencanaan KRS secara manual.</h3>
          <Button icon={<FiFilter />} name="Filter"/>
        </div> */}
        
        
        <div className="mt-5 mb-9"> {/* mbungkus semua plan */}
          
          <> {/* isi tiap plan */}
            <h1 className="text-2xl font-bold mb-4">Plan 1</h1>

            <table className="table-fixed border-collapse border-b border-neutral-400 w-full drop-shadow-xl rounded-2xl overflow-hidden">
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

            <div className="my-6 flex justify-end gap-6">
              <Button icon={<FiEdit2/>} name="Update" />
              <button className="bg-error text-secondary text-base font-bold px-4 py-2 rounded-xl flex items-center gap-2">{<FiTrash2/>} Delete</button>
            </div>
          </>

        

        </div>

        <Paginate
        postPerPage={5}
        totalPost={25}
        paginate={Paginate}
        />
        
      </div>
    </>
  );
};

export default MyPlan;
