import React from 'react'
import {useNavigate} from 'react-router-dom'
function Navbar() {
const navigate = useNavigate()
  const logout = ()=>{
    localStorage.removeItem('token')
    navigate('/')
  }
  return (
    <div class="bg-sky-700 whitespace-normal h-20 text-white flex justify-between">
        <div class=" p-2 mr-10">
            <h1 class=" mt-4 font-extrabold text-3xl">IncuBe</h1>
        </div>
        <div class=" p-2 pt-4 mr-10">
            <button class=" border-white border-2 p-1 rounded-xl font-semibold text-white" onClick={logout}>Log out</button>
        </div>
        
    </div>
  )
}

export default Navbar