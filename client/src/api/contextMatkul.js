import { createContext, useState, useEffect } from "react";
import { urlMatkul } from "./url";
import axios from "axios";

export const MatkulContext = createContext();

export function MatkulProvider({ children }) {
  const [dataMatkul, setDataMatkul] = useState([]);
  const [dataMatkulId, setDataMatkulId] = useState({});
  const [trigger, setTrigger] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const getDataMatkul = async () => {
      const res = await axios.get(urlMatkul);
      try {
        setDataMatkul(res.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    getDataMatkul();
  }, [trigger]);

  const Trigger = () => {
    setTrigger(!trigger);
  };

  // const getMatkulId = async (kode) => {
  //   const MatkulId = await axios.get(`${urlMatkul}/${kode}`);
  //   try {
  //     setDataMatkulId(MatkulId.data.data);
  //     return MatkulId;
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  // const deleteMatkulId = async (kode) => {
  //   const deleteMatkul = await axios.delete(`${urlMatkul}/${kode}`);
  //   Trigger();
  //   console.log(deleteMatkul);
  // };

  const tableNama = [
    "Kode MK",
    "Nama Mata Kuliah",
    "SKS",
    "Tahun Kurikulum",
    "",
  ];

  const SetOpen = () => {
    setOpen(!open);
  };

  return (
    <MatkulContext.Provider
      value={{
        dataMatkul,
        dataMatkulId,
        Trigger,
        tableNama,
        open,
        SetOpen,
      }}
    >
      {children}
    </MatkulContext.Provider>
  );
}
