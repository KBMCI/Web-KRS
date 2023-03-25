import { useNavigate } from "react-router-dom";
import ReactLoading from "react-loading";
import { useState } from "react";

const UserForm = ({
  handleSubmit,
  handleChange,
  formValue,
  formErrors,
  loading,
}) => {
  const navigate = useNavigate();
  // Style component
  const inputStyle = (value) => {
    return `p-2 w-full rounded-lg border bg-neutral-50 focus:outline-blue focus:bg-secondary ${
      value ? "border-error" : "border-none"
    }`;
  };

  const barisTabel = () => {
    return "flex justify-between items-center w-full";
  };

  const errBaris = () => {
    return "h-6 text-start";
  };

  const errText = () => {
    return "text-error text-[13px]";
  };
  return (
    <>
      <div className="flex justify-center align-center fixed inset-0 z-50 bg-black/30 backdrop-blur-sm ">
        <div className="relative w-full max-w-2xl my-auto bg-secondary p-7 rounded-xl ">
          <div>
            <h1 className="text-black font-extrabold text-2xl mb-4">
              Add User
            </h1>
            <form
              onSubmit={handleSubmit}
              className="text-neutral-900 mt-2"
              autoComplete="off"
            >
              <div className={barisTabel()}>
                <div className="w-1/3">
                  <label htmlFor="email" className="block font-bold">
                    Email
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <input
                    id="email"
                    name="email"
                    type="text"
                    className={inputStyle(formErrors.email)}
                    value={formValue.email}
                    onChange={handleChange}
                  />
                  <div className={errBaris()}>
                    {formErrors.email && (
                      <p className={errText()}>{formErrors.email}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className={barisTabel()}>
                <div className="w-1/3">
                  <label htmlFor="nama" className="block font-bold">
                    Nama User
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <input
                    id="nama"
                    name="nama"
                    type="text"
                    value={formValue.nama}
                    className={inputStyle(formErrors.nama)}
                    onChange={handleChange}
                  />
                  <div className={errBaris()}>
                    {formErrors.nama && (
                      <p className={errText()}>{formErrors.nama}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className={barisTabel()}>
                <div className="w-1/3">
                  <label htmlFor="program_studi" className="block font-bold">
                    Program Studi
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <input
                    id="program_studi"
                    name="program_studi"
                    type="text"
                    className={inputStyle(formErrors.program_studi)}
                    value={formValue.program_studi}
                    onChange={handleChange}
                  />
                  <div className={errBaris()}>
                    {formErrors.program_studi && (
                      <p className={errText()}>{formErrors.program_studi}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className={barisTabel()}>
                <div className="w-1/3">
                  <label htmlFor="nim" className="block font-bold">
                    NIM
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <input
                    id="nim"
                    name="nim"
                    type="text"
                    className={inputStyle(formErrors.nim)}
                    value={formValue.nim}
                    onChange={handleChange}
                  />
                  <div className={errBaris()}>
                    {formErrors.nim && (
                      <p className={errText()}>{formErrors.nim}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className={barisTabel()}>
                <div className="w-1/3">
                  <label htmlFor="password" className="block font-bold">
                    Password
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <input
                    id="password"
                    name="password"
                    type="text"
                    className={inputStyle(formErrors.password)}
                    value={formValue.password}
                    onChange={handleChange}
                  />
                  <div className={errBaris()}>
                    {formErrors.password && (
                      <p className={errText()}>{formErrors.password}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className={barisTabel()}>
                <div className="w-1/3">
                  <label htmlFor="role" className="block font-bold">
                    Role
                  </label>
                  <div className="h-6"></div>
                </div>
                <div className="w-2/3">
                  <div className="flex gap-5">
                    <div className="flex gap-3">
                      <input
                        id="role"
                        name="role"
                        type="radio"
                        value="user"
                        checked={formValue.role === "user"}
                        onChange={handleChange}
                      />
                      <p>User</p>
                    </div>
                    <div className="flex gap-3">
                      <input
                        id="role"
                        name="role"
                        type="radio"
                        value="admin"
                        checked={formValue.role == "admin"}
                        onChange={handleChange}
                      />
                      <p>Admin</p>
                    </div>
                  </div>
                  <div className={errBaris()}>
                    {formErrors.role && (
                      <p className={errText()}>{formErrors.role}</p>
                    )}
                  </div>
                </div>
              </div>
              <div className="w-full flex justify-end gap-4 mt-5">
                <button
                  type="button"
                  className="text-neutral-400 py-2 px-4 rounded-lg border-2 border-neutral-400 "
                  onClick={() => {
                    navigate("/user-panel");
                  }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-primary text-secondary py-2 px-5 rounded-lg  "
                >
                  {loading ? <ReactLoading height="5px" width="14px" /> : "Add"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default UserForm;
