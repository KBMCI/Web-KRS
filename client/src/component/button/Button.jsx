import { AiOutlineLoading } from "react-icons/ai";

const Button = ({ children, onClick, type, loading, className, icon }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={loading}
      className={`flex justify-center items-center gap-2 rounded-xl font-bold ${className}`}
    >
      {loading ? (
        <span className="animate-spin">
          <AiOutlineLoading strokeWidth={45}/>
        </span>
      ) : (
        <>
          <span>{icon}</span> <p>{children}</p>
        </>
      )}
    </button>
  );
};

export default Button;
