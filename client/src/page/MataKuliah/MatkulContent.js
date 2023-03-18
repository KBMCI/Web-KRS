import MatkulTabel from "./MatkulTabel";
import Button from "../../component/Button";
import { FiPlus, FiTrello } from "react-icons/fi";

function MatkulContent() {
  return (
    <>
      <div className={`px-10 pt-10`}>
        <div className="flex items-center justify-between mb-12">
          <h1 className="text-4xl font-bold"> Mata Kuliah</h1>
          <div className="flex gap-4">
            <Button icon={<FiTrello />} to="" name="Import By Excel" />
            <Button
              icon={<FiPlus />}
              to="/mata-kuliah/tambah"
              name="Mata Kuliah"
            />
          </div>
        </div>
        <div className="flex justify-center ">
          <div className="grow">
            <MatkulTabel />
          </div>
        </div>
      </div>
    </>
  );
}

export default MatkulContent;
