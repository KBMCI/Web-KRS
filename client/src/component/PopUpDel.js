import { FiAlertTriangle } from "react-icons/fi"
import ReactLoading from "react-loading";

export default function PopUpDel({deleteHandlerFalse, deleteHandlerTrue, loading}) {
    return (
        <div className="flex justify-center align-center fixed inset-0 z-50 bg-black/30 backdrop-blur-sm ">
          <div className="relative w-full max-w-sm my-auto bg-secondary px-[50px] py-5 rounded-[10px] ">
            {/* Button Ok dan Cancel */}
            <div className="flex items-center flex-col gap-[10px]">
              <FiAlertTriangle size="70px" />
              <p className="font-semibold text-center">
                Apakah Kamu yakin ingin mengubah data ini?
              </p>
            </div>
            <div className="w-full flex justify-around gap-4 mt-5">
              <button
                type="button"
                className="text-neutral-400 py-2 px-[44.5px] rounded-lg border-2 border-neutral-400 font-bold"
                onClick={deleteHandlerFalse}
              >
                Cancel
              </button>
              <button
                className="bg-primary text-secondary py-2 px-[60px] rounded-lg font-bold text-base"
                onClick={deleteHandlerTrue}
              >
                 {loading ? <ReactLoading height="5px" width="14px" /> : "OK"}
              </button>
            </div>
          </div>
        </div>
    )
}