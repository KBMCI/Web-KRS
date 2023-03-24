import { createContext, useState, useEffect } from "react";
import { urlMatkul } from "../api/url";
import axios from "axios";

export const MatkulContext = createContext();

export function MatkulProvider({ children }) {
  const [dataMatkul, setDataMatkul] = useState([]);
  // const [dataMatkulId, setDataMatkulId] = useState({});
  const [trigger, setTrigger] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const getDataMatkul = async () => {
      const res = await axios.get(urlMatkul);
      try {
        setDataMatkul(res.data.data);
        console.log(res);
      } catch (error) {
        console.log(error);
      }
    };
    getDataMatkul();
  }, [trigger]);

  const Trigger = () => {
    setTrigger(!trigger);
  };

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
