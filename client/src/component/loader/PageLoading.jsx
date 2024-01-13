import ReactLoading from "react-loading";

const PageLoading = () => {
  return (
    <section className="w-full h-full pt-8 flex justify-center items-center bg-white">
      <ReactLoading type="spin" height={60} width={60} color="#4071F0" />
    </section>
  );
};

export default PageLoading;
