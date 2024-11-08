import { useDispatch } from "react-redux"
import authService from "../../appwrite/auth"
import { logout } from "../../store/authSlice"
import React from "react"

function LogoutBtn(){

    const dispatch=useDispatch()
    const LogoutHandler=()=>{
        authService.logout()
        .then(()=>{
            dispatch(logout())
        })
    }

    return(
        <button
        className='inline-bock px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
        onClick={LogoutHandler}  >
            Logout
        </button>
    )
}

export default LogoutBtn;