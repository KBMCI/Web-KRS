import { createContext, useState, useEffect } from "react";
import { url } from "../api/url";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [dataMatkul, setDataMatkul] = useState([]);
  const [triggerMatkul, setTriggerMatkul] = useState(false);
  const [open, setOpen] = useState(true);
  const [dataKelas, setDataKelas] = useState([]);
  const [triggerData, setTriggerData] = useState(false);

  useEffect(() => {
    const getDataMatkul = async () => {
      const {data} = await url.get("/matkul");
      try {
        setDataMatkul(data.data);
        console.log(data);
      } catch (error) {
        console.log(error);
      }
    };
    getDataMatkul();
  }, [triggerMatkul]);

  const TriggerMatkul = () => {
    setTriggerMatkul(!triggerMatkul);
  };

  useEffect(() => {
    const getDataKelas = async () => {
      try {
        const { data } = await url.get("/kelas");
        console.log(data);
        setDataKelas(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDataKelas();
  }, [triggerData]);

  const TriggerKelas = () => {
    setTriggerData(!triggerData);
  };

  const SetOpen = () => {
    setOpen(!open);
  };

  return (
    <DataContext.Provider
      value={{
        dataMatkul,
        dataKelas,
        TriggerMatkul,
        TriggerKelas,
        open,
        SetOpen,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
