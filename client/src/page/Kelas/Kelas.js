import { Outlet } from "react-router-dom";
import KelasContent from "./KelasContent";
import { useContext, useEffect, useState } from "react";
import Feedback from "../../component/Feedback";
import { DataContext } from "../../context/DataContext";

function Kelas() {
  //Inisiasi use State
  const { dataMatkul } = useContext(DataContext);

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
      <KelasContent feedbackHandler={feedbackHandler} />
      <Outlet context={{ feedbackHandler, dataMatkul }} />
      {feedback.show && (
        <Feedback check={feedback.check} note={feedback.note} />
      )}
    </>
  );
}

export default Kelas;
