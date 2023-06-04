import { createContext, useEffect, useState } from "react";
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
  // SelectedIdMatkul dari dashboard
  const [selectedIdMatkul, setSelectedIdMatkul] = useState([]);

  useEffect(() => {
    const getDataMatkul = async () => {
      const token = localStorage.getItem("Authorization");
      let config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const { data } = await url.get("/matkul", config);
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
        const token = localStorage.getItem("Authorization");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await url.get("/kelas", config);
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
        const token = localStorage.getItem("Authorization");
        let config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };
        const { data } = await url.get("/user", config);
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

  const token = localStorage.getItem("Authorization");
  const config = {
    headers: `Bearer ${token}`,
  };

  const link = {
    admin: {
      user_panel: "/admin/user-panel",
      mata_kuliah: "/admin/mata-kuliah",
      kelas: "/admin/kelas",
    },
    user: {
      random_krs: "/random-krs",
      planning_krs: "/planning-krs",
      my_plan: "/myplan",
    },
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
        link,
        config,
        selectedIdMatkul,
        setSelectedIdMatkul
      }}
    >
      {children}
    </DataContext.Provider>
  );
}
