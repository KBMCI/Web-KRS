function Navbar() {
  return (
    <nav className="flex justify-between items-center px-10 py-4 shadow-lg">
      <div className="mr-10 my-4 font-semi-bold text-neutral-400 ">
        <a href="#dashboard">Dashboard</a>
        <span className="mx-2">/</span>
        <a href="#mata-kuliah">Mata Kuliah</a>
        <span className="mx-2">/</span>
        <a href="#add-Mata-Kuliah" className="text-primary">
          Add Mata Kuliah
        </a>
      </div>
      <div className="cursor-pointer">
        <h1>Bagas Mahda Dhani</h1>
        <p>215150700111038</p>
      </div>
    </nav>
  );
}

export default Navbar;
