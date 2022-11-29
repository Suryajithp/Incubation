import React, { useState } from 'react'
import axios from 'axios'
import './adminlogin.css'
import { useNavigate} from 'react-router-dom'


function Adminlogin() {
  const [user, setUser] = useState({
    email: "",
    password: ""
  })
  const navigate = useNavigate()

  const [error,setError] = useState(false)
  const [ep,setEp] = useState(false)

  const handleChange = e => {
    const { name, value } = e.target
    setUser({
      ...user,
      [name]: value
    })
  }
  const login = e => {
    const { email, password } = user
    if (email && password) {
      axios.post("http://localhost:4000/admin/adminsignup", user)
      .then((res =>{
        if(res.data.msg==="login"){
            navigate('/dashboard')
        }else{
          setEp(true)
        }
      } ))
    } else {
      e.preventDefault()
      setError(true)
    }
  }
  return (

    <div class="bg-grey-lighter min-h-screen flex flex-col">
      <div class="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
        <div class="bg-white px-6 py-8 rounded shadow-md text-black w-full">
          <h1 class="mb-8 text-3xl text-center">Admin Login</h1>
          {ep? <span className="text-red-600 mt-3">invalid email or password</span> : ""}
          {console.log(user)}

          <div className="relative">
            {error && user.email.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">enter email</span> : ""}

            <input
              type="text"
              class="block border border-gray-200 w-full p-3 rounded mb-4"
              name="email"
              value={user.email}
              onChange={handleChange}
              placeholder="Email" />

          </div>

          <div className="relative">
            {error && user.password.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">enter password</span> : ""}
            <input
              type="password"
              class="block border border-gray-200 w-full p-3 rounded mb-4"
              name="password"
              value={user.password}
              onChange={handleChange}
              placeholder="Password" />

          </div>

          <button
            type="submit"
            onClick={login}
            class="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-700 focus:outline-none my-1"
          >Login</button>
        </div>

      </div>
    </div>
  );
};

export default Adminlogin