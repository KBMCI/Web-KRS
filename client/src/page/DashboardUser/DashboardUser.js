import { useContext, useEffect, useState } from "react";
import { url } from "../../api/url";
import LogoMyPlans from "../../assets/LogoMyPlans.svg";
import LogoPlanning from "../../assets/LogoPlanning.svg";
import LogoRandom from "../../assets/LogoRandom.svg";
import LogoSearch from "../../assets/LogoSearch.svg";
import TablePlan from "../../component/TablePlan";
import { DataContext } from "../../context/DataContext";

const DashboardUser = () => {
  const [isFilled, setIsFilled] = useState(false);
  const [firstPlan, setFirstPlan] = useState([]);
  const [isChecked, setIsChecked] = useState(false);
  const [electiveMatkul, setElectiveMatkul] = useState([]);
  const [selectedId, setSelectedId] = useState([]);
  const [query, setQuery] = useState("");
  const { selectedIdMatkul, setSelectedIdMatkul } = useContext(DataContext);

  useEffect(() => {
    const getMataKuliah = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await url.get("/dashboard", config);
        console.log(response.data.data.matkuls);
        console.log("di atas ku adalah matkul");
        setElectiveMatkul(response.data.data.matkuls);
      } catch (err) {
        console.log(err);
      }
    };

    getMataKuliah();
    const getMyplans = async () => {
      try {
        const token = localStorage.getItem("Authorization");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const response = await url.get("/my-plan", config);
        console.log(response);
        console.log(response.data.data);
        // const myPlans = response.data.data
        // const myPlan = myPlans[0]
        // console.log(myPlan.plan)
        setIsFilled(true);
        setFirstPlan(response.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getMyplans();
  }, []);

  const selectedMatkul = (index, event) => {
    console.log(event.target.checked);
    console.log(event);
    if (event.target.checked) {
      console.log("Yeay you've checked this " + index);
      setSelectedId([...selectedId, { ID: index }]);
    } else {
      console.log("Oh, very sad for this " + index);
      const filterSelectedId = selectedId.filter((item) => {
        return item.ID !== index;
      });
      console.log(filterSelectedId);
      setSelectedId(filterSelectedId);
    }

    console.log(selectedId);
  };

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
        { matkuls: selectedId },
        config
      );

      // INI DIOPER KEDALAM USE CONTEXT DATA
      setSelectedIdMatkul(selectedId);
      console.log(response);
    } catch (err) {
      console.log(err.message);
    }
  };

  const getFilteredItems = (query, items) => {
    if (!query) {
      return items;
    }
    return items.filter((matkul) => matkul.nama.toLowerCase().includes(query.toLowerCase()));
  };

  const barisTabel = () => {
    return "h-[51.13px] min-h-[51.13px] py-[10px] px-4 font-semibold text-base";
  };

  // filter
  const filteredItems = getFilteredItems(query, electiveMatkul);

  return (
    <div className="bg-secondary p-7">
      <h1 className="neutral-900 font-semibold text-2xl ml-[2px] mt-[1px] p-[10px]">
        Mata Kuliah Dipilih
      </h1>

      <div className="flex flex-row gap-[35px] ml-[12px]">
        <div className="flex-col ">
          <div className="w-full shadow-lg rounded-[10px] mb-[31px] h-[451px] max-h-[451px] overflow-y-scroll scrollbar scrollbar-thumb-neutral-400 scrollbar-w-1 scrollbar-thumb-rounded-lg">
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
                  <th className="h-[42px] w-[235px]">
                    <div className="flex justify-center items-center">
                      <div>
                        <img src={LogoSearch} alt="" className="" />
                      </div>
                      <div>
                        <input
                          type="text"
                          onChange={(e) => setQuery(e.target.value)}
                          className="bg-primary border-none rounded-3xl text-[15px] text-secondary  py-[4px] px-3 border-2  focus:border-primary placeholder:text-secondary placeholder:text-[13px]  font-semibold w-[300px] ...  focus:outline-non focus:outline-primary transition duration-300 "
                          placeholder="Search Mata Kuliah"
                        />
                      </div>
                    </div>
                  </th>
                </tr>
              </thead>
              <tbody>
                {filteredItems &&
                  filteredItems.map((matkul, index) => (
                    <tr
                      key={index}
                      className="bg-secondary text-neutral-900 border-b border-neutral-400 ">
                      <td className="px-4 py-[10px] w-[47px] h-[51.13]">
                        <input
                          value={matkul.nama}
                          id={matkul.ID}
                          type="checkbox"
                          onChange={(event) => selectedMatkul(matkul.ID, event)}
                        />
                      </td>
                      <td
                        className={`${barisTabel()} py-[10px] px-4 font-semibold w-[101px]`}>
                        {matkul.kode_matkul}
                      </td>
                      <td
                        className={`${barisTabel()} py-[10px] px-4 font-semibold w-[335px]`}>
                        {matkul.nama}
                      </td>
                      <td
                        className={`${barisTabel()} py-[10px] px-4 font-semibold w-[335px]`}></td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <button className="bg-primary rounded-xl p-3" onClick={onPostHandle}>
            Simpan
          </button>
          {/* My Plan */}
          <h1 className="neutral-900 font-semibold text-2xl ml-[22px] mb-[7px]">
            My Plans
          </h1>
          <div className="bg-secondary h-[303px] flex flex-col items-center w-full  shadow-2xl rounded-[10px]">
            {isFilled && firstPlan ? (
              <>
                <TablePlan
                  data={firstPlan[0].plan}
                  dashboardUser={true}></TablePlan>
              </>
            ) : (
              <>
                <div className="mt-[20px]">
                  <img className="mb-[10px]" src={LogoMyPlans} />
                </div>
                <p className="neutral-900 text-center font-semibold text-base p-[10px] mx-[151px] mb-[10px]">
                  Oops, kamu belum memiliki plan apapun yang tersimpan. Buat
                  satu atau lebih agar dapat ditampilkan disini
                </p>

                <button className="bg-accent rounded-[10px] font-semibold text-base px-[32px] py-[15px] mb-[20px]">
                  Add Plan
                </button>
              </>
            )}
          </div>
        </div>

        <div className="flex-col">
          <div className="bg-secondary h-[451px] w-[337px] flex flex-col items-center shadow-lg rounded-[15px] mb-[71px]">
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

            <button className="bg-accent rounded-[10px] font-semibold text-base px-[32px] py-[15px] mb-[48px]">
              Coba
            </button>
          </div>

          <div className="bg-secondary h-[303px] w-[337px] flex flex-col items-center shadow-lg rounded-[15px]">
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
            <button className="bg-accent rounded-[10px] font-semibold text-base px-[32px] py-[15px] mb-[17.8px]">
              Coba
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardUser;
