import { Outlet } from "react-router-dom";
import KelasContent from "./KelasContent";
import { useContext, useEffect, useState } from "react";
import { url } from "../../api/url";
import Feedback from "../../component/Feedback";
import { MatkulContext } from "../../context/contextMatkul";

function Kelas() {
  //Inisiasi use State
  const { dataMatkul } = useContext(MatkulContext);
  const [dataKelas, setDataKelas] = useState([]);
  const [trigger, SetTrigger] = useState(true);

  // Mengambil data Kelas
  useEffect(() => {
    const getKelas = async () => {
      const { data } = await url.get("/kelas");
      console.log(data);
      setDataKelas(data.data);
    };
    getKelas();
  }, [trigger]);

  // Sebagai trigger untuk perubahan data
  const dataTrigger = () => {
    SetTrigger(!trigger);
  };

  // Menampilkan feedback
  const [feedback, setFeedback] = useState({
    show: false,
    check: false,
    note: null,
  });

  // Menampilkan feedback
  const feedbackHandler = (check, note) => {
    setFeedback({
      show: true,
      check: check,
      note: note,
    });
    setTimeout(() => {
      setFeedback({
        show: false,
        check: false,
        note: null,
      });
    }, 3000);
  };

  return (
    <>
      <KelasContent
        dataKelas={dataKelas}
        dataTrigger={dataTrigger}
        feedbackHandler={feedbackHandler}
      />
      <Outlet context={{ dataTrigger, feedbackHandler, dataMatkul }} />
      {feedback.show && (
        <Feedback check={feedback.check} note={feedback.note} />
      )}
    </>
  );
}

export default Kelas;
