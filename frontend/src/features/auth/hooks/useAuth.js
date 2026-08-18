import { useContext , useEffect} from "react";
import { AuthContext } from "../auth.context";
import { login, register, logout, getMe } from "../services/api.auth"


export const useAuth = () => {
    const context = useContext(AuthContext)
    const { user, setUser, loading, setLoading } = context

    const handleLogin = async ({email , password}) =>{
        setLoading(true)

        const data = await login({email , password})
        setUser(data.user)
        setLoading(false)
    }

    const handleRegister = async ({name , email , password}) =>{
        setLoading(true)
        const data = await register({name , email , password})
        setUser(data.user)
        setLoading(false)
    }

    const handleLogout = async () =>{
        setLoading(true)
        await logout()
        setUser(null)
        setLoading(false)
    }

    const fetchMe = async () =>{
        setLoading(true)
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
    }

    useEffect(()=>{

        const getAndSetUser=async()=>{
        const data = await getMe()
        setUser(data.user)
        setLoading(false)
        }

        getAndSetUser()
       
    },[])

    return {
        user,
        loading,
        handleLogin,
        handleRegister,
        handleLogout,
        fetchMe
    }
}