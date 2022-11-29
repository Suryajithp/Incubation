import React, { useState } from 'react'
import './register.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'

function Register() {
    const [user, setUser] = useState({
        name: "",
        email: "",
        password: "",
        conformPassword: ""
    })

    const navigate = useNavigate()

    const [error, setError] = useState(false)
    const handleChange = e => {
        const { name, value } = e.target
        setUser({
            ...user,
            [name]: value
        })
    }

    const register = (e) => {

        const { name, email, password, conformPassword } = user
        if (name && email && password && (password === conformPassword)) {
            axios.post("http://localhost:4000/register", user)
                .then((response => {
                    navigate('/')
                }))
        } else {
            e.preventDefault()
            setError(true)
        }
    }

    return (
        <div className="bg-grey-lighter min-h-screen flex flex-col">
            <div className="container max-w-sm mx-auto flex-1 flex flex-col items-center justify-center px-2">
                <div className="bg-white px-6 py-8 rounded shadow-md text-black w-full">
                    <h1 className="mb-8 text-3xl text-center">Sign up</h1>
                    {console.log("user", user)}
                    <form >
                        <div className="relative">
                            {error && user.name.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">invalid username</span> : ""}
                            <input
                                type="text"
                                className="block border border-gray-200 w-full p-3 rounded mb-4"
                                name="name"
                                value={user.name}
                                onChange={handleChange}
                                placeholder="Full Name" />
                        </div>


                        <div className="relative">
                            {error && user.email.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">enter email</span> : ""}


                            <input
                                type="text"
                                className="block border border-gray-200 w-full p-3 rounded mb-4"
                                name="email"
                                value={user.email}
                                onChange={handleChange}
                                placeholder="Email" />
                        </div>

                        <div className="relative">
                            {error && user.password.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">enter password</span> : ""}

                            <input
                                type="password"
                                className="block border border-gray-200 w-full p-3 rounded mb-4"
                                name="password"
                                value={user.password}
                                onChange={handleChange}
                                placeholder="Password" />
                        </div>

                        <div className='relative '>
                            {error && user.password !== user.conformPassword ? <span className="text-red-600 absolute right-4 ml-48 mt-3">not maching</span> : ""}

                            <input
                                type="password"
                                className="block border border-gray-200 w-full p-3 rounded mb-4"
                                name="conformPassword"
                                value={user.conformPassword}
                                onChange={handleChange}
                                placeholder="Conform Password" />
                        </div>

                        <button
                            type="submit"
                            onClick={register}
                            className="w-full text-center py-3 rounded bg-blue-500 text-white hover:bg-blue-700 focus:outline-none my-1"
                        >Create Account</button>

                    </form>

                    <div className="text-center text-sm text-grey-dark mt-4">
                        By signing up, you agree to the
                    </div>
                </div>

                <div className="text-gray-600 mt-6">
                    Already have an account?
                    <Link to="/">
                        <a className="no-underline border-b border-blue text-green-400" > Log in</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Register