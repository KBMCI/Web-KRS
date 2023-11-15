import False from "../../../../assets/False.svg";
import True from "../../../../assets/True.svg";

const Message = ({ open, statusMsg, textMsg }) => {
  return (
    <div
      className={` z-50 bottom-10 right-10 fixed flex justify-end items-end h-screen  .... ${
        open ? `-translate-x-0` : `right-[-100%] `
      }  duration-500 transition-all`}
    >
      <div
        className={`  rounded-2xl text-secondary font-mulis p-4 flex flex-row justify-center items-center w-[370px] ${
          statusMsg ? "bg-success" : "bg-error"
        }`}
      >
        <div className="basis-[15%]">
          {statusMsg ? (
            <img
              src={True}
              alt="message"
              className={`${
                open ? `scale-125` : `scale-0`
              } duration-[2000ms] transition-all `}
              width="40"
            />
          ) : (
            <img
              src={False}
              alt="message"
              className={`${
                open ? `scale-125` : `scale-0`
              } duration-[2000ms] transition-all `}
              width="40"
            />
          )}
        </div>
        <div className="basis-[85%]">
          <h1 className={`font-bold text-xl`}>
            {" "}
            {statusMsg ? "Yippie!" : "Oops!"}
          </h1>
          <p>{textMsg}</p>
        </div>
      </div>
    </div>
  );
};

export default Message;
