import ReactLoading from "react-loading";

const PageLoading = () => {
  return (
    <section className="w-full h-full pt-10 flex justify-center items-center bg-white absolute top-1/2 -translate-y-1/2">
        <ReactLoading type="spin" height={60} width={60} color="#4071F0" />
    </section>
  );
};

export default PageLoading;
