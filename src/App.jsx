import { useEffect, useState } from "react"
import {useDispatch} from "react-redux"
import authService from "./appwrite/auth.js"
import { login, logout } from "./store/authSlice.js"
import {Header,Footer} from "./components/index.js"
import { Outlet, useNavigate } from 'react-router-dom'
import "./App.css"


function App() {
  const [loading,setLoading]=useState(true);
  const dispatch=useDispatch();
  const navigate=useNavigate()

  useEffect( ()=>{
      authService.getCurrentUser()
        .then((userData)=>{
          if(userData){
              dispatch(login({userData}))
          }else{
              dispatch(logout())
          }
        })
        .finally(()=>{
          setLoading(false)
        })
  } , [] )

  return loading ? null : (
    <div className='min-h-screen flex flex-wrap content-between bg-gray-400'>
      <div className='w-full block'>
        <Header />
          <main className="mt-10 mb-10" >
            <Outlet />
          </main>
        <Footer />
      </div>
    </div>
  )
}
export default App
