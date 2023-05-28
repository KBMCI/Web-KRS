import { useContext } from "react"
import AuthContext from "../context/AuthContext"

const useAuth = () => {
    // ini biar ga ribet aja, code jadi lebih singkat buat penggunaan use context
    return useContext(AuthContext)
}

export default useAuth