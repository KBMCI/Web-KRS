import { FiAlertTriangle } from "react-icons/fi";
import ReactLoading from "react-loading";
import Button from "./button/Button";

export default function PopUpDel({
  deleteHandlerFalse,
  deleteHandlerTrue,
  loading,
  name,
}) {
  return (
    <div className="flex justify-center align-center fixed inset-0 z-50 bg-black/30 backdrop-blur-sm ">
      <div className="relative w-full max-w-sm my-auto bg-secondary px-[50px] py-5 rounded-[10px] ">
        {/* Button Ok dan Cancel */}
        <div className="flex items-center flex-col gap-[10px]">
          <FiAlertTriangle size="70px" />
          <p className="font-semibold text-center">
            Apakah kamu yakin ingin menghapus {name ? name : "data"} ini?
          </p>
        </div>
        <div className="w-full flex justify-around gap-4 mt-5">
          <Button
            onClick={deleteHandlerFalse}
            className={`bg-secondary border-2 border-neutral-400 text-neutral-400 h-12 gap-0 w-full`}
          >
            Cancel
          </Button>
          <Button
            onClick={deleteHandlerTrue}
            loading={loading}
            className={`bg-primary text-secondary h-12 gap-0 w-full`}
          >
            OK
          </Button>
        </div>
      </div>
    </div>
  );
}
