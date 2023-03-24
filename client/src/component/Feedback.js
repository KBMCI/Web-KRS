import { useEffect, useState, useRef } from "react";
import { FiCheck, FiInfo } from "react-icons/fi";

const Feedback = ({ check, note }) => {
  const [icon, setIcon] = useState();
  const [text, setText] = useState();
  const tempFeddback = useRef(); // Penampungan sementara agar tidak depeb=ndecies

  const setFeedback = () => {
    if (check) {
      setIcon(<FiCheck />);
      if (note === "delete") {
        setText("Data telah berhasil dihapus");
      } else if (note === "post") {
        setText("Data telah berhasil diimport");
      } else if (note === "patch") {
        setText("Data telah berhasil diubah");
      }
    } else {
      setIcon(<FiInfo />);
      if (note === "delete") {
        setText("Data gagal dihapus");
      } else if (note === "post") {
        setText("Data gagal diimport");
      } else if (note === "patch") {
        setText("Data gagal diubah");
      }
    }
  };

  tempFeddback.current = setFeedback;

  useEffect(() => {
    tempFeddback.current();
  }, []);

  return (
    <div
      className={` ${
        check ? "bg-success" : "bg-error"
      } px-4 py-3  text-secondary flex gap-3 items-center fixed z-50 right-3 bottom-3 rounded-[10px] duration-300 transition`}
    >
      <div>{icon}</div>
      <div>
        <p>{check ? "Yippie!" : "Oopps!"}</p>
        <p>{text}</p>
      </div>
    </div>
  );
};

export default Feedback;
