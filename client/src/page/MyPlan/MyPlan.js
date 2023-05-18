import { useState } from "react";
import axios from "axios";

const MyPlan = () => {

  const [nama, setNama] = useState('')
  const [nim, setNim] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirm_password] = useState('')
  const [program_studi, setProgram_studi] = useState('')
  const [role, setRole] = useState('admin')
  const [type, setType] = useState("password");

  const handleRegister = async (e) =>{
    e.preventDefault()
    try {
      const respone = await axios.post( "http://localhost:8080/user/register", JSON.stringify({
        nama,
        nim,
        email,
        password,
        confirm_password,
        program_studi,
        role
      }), {
        headers : {'Content-Type':'application/json'}
      })
      console.log("BERHASIL")
    } catch (err){
      console.log(err.response.data)
    }
  }

  



  return (
    <>
      <section>
        <form onSubmit={handleRegister} className="flex flex-col">
          {/* NAMA */}
          <label htmlFor="nama">
            Nama Lengkap
          </label>
          <input
          type="text"
          id="nama"
          name="nama"
          value={nama}
          autoComplete="off"
          onChange={(e)=> setNama(e.target.value)}
          required
          className=""
          />
          {/* NIM */}
          <label htmlFor="nim">
            NIM
          </label>
          <input 
          type="text"
          id="nim"
          name="nim"
          value={nim}
          autoComplete="off"
          onChange={(e)=> setNim(e.target.value)}
          required
          className=""
          />
          {/* EMAIL */}
          <label htmlFor="email">
            Email
          </label>
          <input 
          type="text"
          id="email"
          name="email"
          value={email}
          autoComplete="off"
          onChange={(e)=> setEmail(e.target.value)}
          required
          className=""
          />
          {/* PASSWORD */}
          <label htmlFor="password">
            Password
          </label>
          <input 
           type={type}
           id="password"
           name="password"
           value={password}
           onChange={(e) => setPassword(e.target.value)}
           required
           className=""
          />
          {/* CONFIRM_PASSWORD */}
          <label htmlFor="confirm_password">
            Confirm Password
          </label>
          <input 
          type='text'
          id="confirm_password"
          name="confirm_password"
          value={confirm_password}
          onChange={(e)=> setConfirm_password(e.target.value)}
          required
          className=""
          />
          {/* PROGRAM STUDI */}
          <label htmlFor="program_studi">
            Program Studi
          </label>
          <input
          type="text"
          id="program_studi"
          name="program_studi"
          value={program_studi}
          onChange={(e)=> setProgram_studi(e.target.value)}
          required
          className=""
          />
          {/* ROLE */}
          <label htmlFor="role">
            Role
          </label>
          <input 
          type="text"
          id="role"
          name="role"
          value={role}
          onChange={(e)=>setRole(e.target.value)}
          required
          className=""
          
          />
          <button className="font-bold">SUBMIT</button>

        
        </form>
      </section>
    </>
  );
};

export default MyPlan;
