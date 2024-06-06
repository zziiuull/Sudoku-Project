import React, { createContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [token, setToken] = useState("")
  const [email, setEmail] = useState("")
  const [name, setName] = useState("")
  const [id, setId] = useState("")

  function updateAuthData(newToken, newEmail, newname, newId){
    setToken(newToken);
    setEmail(newEmail);
    setName(newname);
    setId(newId);
  }

  function eraseAuthData(){
    setToken("");
    setEmail("");
    setName("");
    setId("");
  }

  return (
      <AuthContext.Provider 
        value={{ token, setToken, email, setEmail, name, setName, id, setId, updateAuthData, eraseAuthData }}>
          {children}
      </AuthContext.Provider>
  )
}

export { AuthContext, AuthProvider }