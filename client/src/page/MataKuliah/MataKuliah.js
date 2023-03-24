import { Outlet } from "react-router-dom";
import MatkulContent from "./MatkulContent";
import { useState } from "react";
import Feedback from "../../component/Feedback";

function MataKuliah() {
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
      <MatkulContent feedbackHandler={feedbackHandler} />
      <Outlet context={{ feedbackHandler }} />
      {feedback.show && (
        <Feedback check={feedback.check} note={feedback.note} />
      )}
    </>
  );
}

export default MataKuliah;
