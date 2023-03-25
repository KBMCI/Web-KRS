import { Outlet } from "react-router-dom";
import UserContent from "./UserContent";
import { useState } from "react";
import Feedback from "../../component/Feedback";

function UserPanel() {
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
      <UserContent feedbackHandler={feedbackHandler} />
      <Outlet context={{ feedbackHandler }} />
      {feedback.show && (
        <Feedback check={feedback.check} note={feedback.note} />
      )}
    </>
  );
}

export default UserPanel;
