import React from "react";
import useAuth from "../hooks/useAuth";

const Unauthorized = () => {
const { auth } = useAuth();
console.log(auth.role)
console.log(auth)

  return <div>Unauthorized</div>;
};

export default Unauthorized;
