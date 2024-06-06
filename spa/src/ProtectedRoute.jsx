import React, { useContext } from "react"
import { Navigate } from "react-router-dom"
import { AuthContext } from "./AuthContext.jsx"

const ProtectedRoute = ({ element }) => {
    const { token } = useContext(AuthContext)
    return token ? element : <Navigate to="/login"></Navigate>
}

export default ProtectedRoute