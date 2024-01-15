import { AiOutlineLoading } from "react-icons/ai";

const PageLoading = () => {
  return (
    <section className="w-full  pt-8 flex justify-center items-center ">
      <div className="animate-spin duration-50">
        <AiOutlineLoading strokeWidth={10} size={64} color="4071F0" />
      </div>
    </section>
  );
};

export default PageLoading;
