import { createContext, useState, useEffect } from "react";
import { url } from "../api/url";

export const DataContext = createContext();

export function DataProvider({ children }) {
  const [dataMatkul, setDataMatkul] = useState([]);
  const [triggerMatkul, setTriggerMatkul] = useState(false);
  const [dataKelas, setDataKelas] = useState([]);
  const [triggerKelas, setTriggerKelas] = useState(false);
  const [dataUser, setDataUser] = useState([]);
  const [triggerUser, setTriggerUser] = useState(false);
  const [open, setOpen] = useState(true);

  useEffect(() => {
    const getDataMatkul = async () => {
      const { data } = await url.get("/matkul");
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
  }, [triggerKelas]);

  const TriggerKelas = () => {
    setTriggerKelas(!triggerKelas);
  };

  useEffect(() => {
    const getDataUser = async () => {
      try {
        const { data } = await url.get("/user");
        console.log(data);
        setDataUser(data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getDataUser();
  }, [triggerUser]);

  const TriggerUser = () => {
    setTriggerUser(!triggerUser);
  };

  const SetOpen = () => {
    setOpen(!open);
  };

  return (
    <DataContext.Provider
      value={{
        dataMatkul,
        dataKelas,
        dataUser,
        TriggerMatkul,
        TriggerKelas,
        TriggerUser,
        open,
        SetOpen,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
