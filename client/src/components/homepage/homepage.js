import React, { useEffect, useState } from 'react'
import './homepage.css'
import Navbar from '../navbar/navbar'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import { useNavigate } from 'react-router-dom'

function Homepage() {
  const [application, setApplication] = useState({
    name: "", email: "", city: "", companyname: "", address: "", state: "", phone: "",
    img: "", company: "", solution: "", advantage: "", potential: "", proposal: "",
    team: "", problem: "", proposition: "", revenue: "", services: ""
  })
  const [error, setError] = useState(false)
  const [decode, setDecoded] = useState("")

  const navigate = useNavigate()


  useEffect(()=>{
    const token = localStorage.getItem('token')
    var decoded = jwt_decode(token)
    setDecoded(decoded.id)
    if(token) navigate('/home')
    else navigate('/') 
  },[])
  
  const handleChange = e => {
    const { name, value } = e.target
    setApplication({
      ...application,
      [name]: value
    })
  }

  const fileUpload = (e) => {
    const image = e.target.files[0]
    setApplication({
      ...application,
      img: image
    })
  }

  const submit = async (e) => {
    e.preventDefault()
    const Data = new FormData();
    for (let key in application) {
      Data.append(key, application[key])
    }

    const { name, email, city, companyname, address, state, phone, company, solution, img, advantage, potential,
      proposal, team, problem, proposition, revenue, services } = application
    if (name && email && city && companyname && address && state && phone && company &&  solution && advantage && potential &&
      proposal && team && img && problem && proposition && revenue && services) {
      axios.post("http://localhost:4000/home/"+decode, Data)
        .then((res => {
          alert("successful")
          setApplication({
            ...application,
            name: "", email: "", city: "", companyname: "", address: "", state: "", phone: "",
            img: "", company: "", solution: "", advantage: "", potential: "", propsal: "",
            team: "", problem: "", proposition: "", revenue: "", services: ""
          })
          navigate('/status')
        }))
    } else {
      e.preventDefault()
      setError(true)
    }
  }

const status =()=>{
  navigate('/status')
}

  return (
    <div className="homepage">
      <Navbar />

      <div class="bg-grey-lighter min-h-screen flex flex-col">
        <div class="container  mx-auto flex flex-col items-center justify-center px-2">
          <div class="bg-white px-6 py-8  rounded shadow-md text-black w-full">
          <h1 class=" text-3xl text-center">Application for incubation</h1>
            <h2 className='text-blue-400  text-end' onClick={status}>Back</h2>
            <div class="flex justify-between">
              <div class="w-full m-2">

                <div className="relative">
                  {error && application.name.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">invalid name</span> : ""}

                  <input
                    type="text"    
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="name"
                    onChange={handleChange}
                    placeholder="Name" />

                </div>

                <div className="relative">
                  {error && application.city.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">enter city</span> : ""}

                  <input
                    type="text"
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="city"
                    onChange={handleChange}
                    placeholder="City" />

                </div>

                <div className="relative">
                  {error && application.email.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">enter email</span> : ""}

                  <input
                    type="text"
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="email"
                    onChange={handleChange}
                    placeholder="Email" />

                </div>

                <div className="relative">
                  {error && application.companyname.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">enter companyname</span> : ""}
                  <input

                    type="text"
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="companyname"
                    onChange={handleChange}
                    placeholder="Cpmpany Name" />
                </div>

                <div className="relative">
                  {error && application.team.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">required</span> : ""}
                  <textarea
                    type="text"
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="team"
                    onChange={handleChange}
                    placeholder="Describe Your Team and Backround" />

                </div>

                <div className="relative">
                  {error && application.problem.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">required</span> : ""}
                  <textarea
                    type="text"
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="problem"
                    onChange={handleChange}
                    placeholder="Describe the problem your are trying to solve" />

                </div>

                <div className="relative">
                  {error && application.proposition.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">required</span> : ""}
                  <textarea
                    type="text"
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="proposition"
                    onChange={handleChange}
                    placeholder="What is your value proposition for the customer?" />

                </div>

                <div className="relative">
                  {error && application.revenue.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">required</span> : ""}
                  <textarea
                    type="text"
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="revenue"
                    onChange={handleChange}
                    placeholder="Explain your revenue model" />

                </div>

                <div className="relative">
                  {error && application.services.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">required</span> : ""}
                  <textarea
                    type="text"
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="services"
                    onChange={handleChange}
                    placeholder="How do you market or plan to market your products and services" />

                </div>

              </div>



              <div class="w-full m-2">
                <div className="relative">
                  {error && application.address.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">enter address</span> : ""}

                  <input
                    type="text"
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="address"
                    onChange={handleChange}
                    placeholder="Address" />
                </div>
                <div className="relative">
                  {error && application.state.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">enter state</span> : ""}

                  <input
                    type="text"
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="state"
                    onChange={handleChange}
                    placeholder="State" />
                </div>

                <div className="relative">
                  {error && application.phone.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">enter phone</span> : ""}

                  <input
                    type="phone"
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="phone"
                    onChange={handleChange}
                    placeholder="Phone number" />
                </div>

                <input
                  type="file"
                  onChange={(e) => fileUpload(e)}
                  class="block border border-gray-200 w-full p-3 rounded mb-4" required
                  name="img"
                />

                <div className="relative">
                  {error && application.company.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">required</span> : ""}
                  <textarea
                    type="text"
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="company"
                    onChange={handleChange}
                    placeholder="Describe your company and Products" />

                </div>

                <div className="relative">
                  {error && application.solution.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">required</span> : ""}
                  <textarea
                    type="text"
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="solution"
                    onChange={handleChange}
                    placeholder="What is unique about your solution" />

                </div>

                <div className="relative">
                  {error && application.advantage.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">required</span> : ""}
                  <textarea
                    type="text"
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="advantage"
                    onChange={handleChange}
                    placeholder="Who are your competitors and what is your competative advantage?" />

                </div>

                <div className="relative">
                  {error && application.potential.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">required</span> : ""}
                  <textarea
                    type="text"
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="potential"
                    onChange={handleChange}
                    placeholder="What is the potential market size of the product?" />

                </div>

                <div className="relative">
                  {error && application.proposal.length <= 0 ? <span className="text-red-600 absolute right-4 mt-3">required</span> : ""}
                  <textarea
                    type="text"
                    class="block border border-gray-200 w-full p-3 rounded mb-4"
                    name="proposal"
                    onChange={handleChange}
                    placeholder="Upload a detailed business proposal" />

                </div>
              </div>
            </div>

            <div class='mx-auto w-fit'>
              <button
                type="submit"
                onClick={submit}
                class="w-60 text-center py-3 rounded bg-sky-700 text-white hover:bg-blue-700 focus:outline-none my-1"
              >Submit</button>
            </div>
          </div>

          <div class="text-gray-600 mt-6">

          </div>
        </div>
      </div>
    </div>
  )
}

export default Homepage