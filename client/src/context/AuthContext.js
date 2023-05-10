import React, { createContext, useState } from 'react'

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
    // data yang ditransfer 
    const [auth, setAuth] = useState({})
  return (
    // buat tag untuk transfer ke tag lain
    <AuthContext.Provider value={{auth, setAuth}}>
        {children}
    </AuthContext.Provider>
  )
}

export default AuthContext