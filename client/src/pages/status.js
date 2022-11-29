import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import jwt_decode from "jwt-decode";
import Navbar from '../components/navbar/navbar'

function Status() {

  const [data, setData] = useState([])

  var navigate = useNavigate()

  useEffect(() => {
    const token = localStorage.getItem('token')
    var decoded = jwt_decode(token)
    var user = decoded.id
    if (token) {
      navigate('/status')
      axios.get(("http://localhost:4000/applist/"+user))
      .then((res => {
        let { data } = res
        setData(
          [...data, data])
        }))
    }else{
      navigate('/')
    } 
  }, [])

  return (
    <>
      <Navbar />
      <div className='p-6 flex justify-between items-center my-10 mx-auto max-w-6xl bg-white rounded-lg border border-gray-200 shadow-md '>
      <h5 class=" text-2xl font-bold tracking-tight text-sky-800 uppercase ">Application Status</h5>
      <button className='p-2 rounded bg-sky-700 text-white font-bold'onClick={()=>navigate('/home')}>Apply New Application</button>
      </div>
      {
        data.slice(0, data.length - 1).map((item, index) => (
          <div className="p-6 justify-center items-center my-10 mx-auto max-w-6xl bg-white rounded-lg border border-gray-200 shadow-md ">
            <h5 class="mb-2  text-2xl font-bold tracking-tight text-sky-800 uppercase ">{item.companyname}</h5>
            <div className='flex mx-auto justify-around'>
              <div>
              <p className='mb-3 font-bold text-gray-900'>Name  </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.name}</p>
              <p className='mb-3 font-bold text-gray-900'>email      </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.email}</p>
              <p className='mb-3 font-bold text-gray-900'>city       </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.city}</p>
              <p className='mb-3 font-bold text-gray-900'>address    </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.address}</p>
              </div>
              <div>
              <p className='mb-3 font-bold text-gray-900'>state      </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.state}</p>
              <p className='mb-3 font-bold text-gray-900'>phone      </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.phone}</p>
              <p className='mb-3 font-bold text-gray-900'>company    </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.company}</p>
              <p className='mb-3 font-bold text-gray-900'>solution   </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.solution}</p>
              </div>
              <div>
              <p className='mb-3 font-bold text-gray-900'>advantage  </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.advantage}</p>
              <p className='mb-3 font-bold text-gray-900'>potential  </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.potential}</p>
              <p className='mb-3 font-bold text-gray-900'>proposal   </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.proposal}</p>
              <p className='mb-3 font-bold text-gray-900'>team       </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.team}</p>
              </div>
              <div>
              <p className='mb-3 font-bold text-gray-900'>problem    </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.problem}</p>
              <p className='mb-3 font-bold text-gray-900'>proposition</p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.proposition}</p>
              <p className='mb-3 font-bold text-gray-900'>revenue    </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.revenue}</p>
              <p className='mb-3 font-bold text-gray-900'>services   </p>
              <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{item.services}</p>
              </div>
            </div>
              <p className='mb-3 font-bold text-gray-900'>status <h1 className='ml-4 text-blue-500'>{item.status}</h1>    </p>
              <div class="w-full h-2 bg-blue-200 rounded-full">
                          {item.status === "approve" ? <div class="w-4/5 h-full bg-green-500 rounded-full"></div>
                            : item.status === "decline" ? <div class="w-1/5 h-full bg-red-500 rounded-full"></div>
                            : item.status === "booked" ? <div class="w-5/5 h-full bg-blue-500 rounded-full"></div>
                            :<div class="w-2/5 h-full bg-yellow-500 rounded-full"></div>
                          }
                        </div>

          </div>
        ))
      }
    </>
  )
}

export default Status