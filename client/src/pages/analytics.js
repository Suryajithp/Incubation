import React, { useEffect, useState } from 'react'
import Navbar from '../components/navbar/navbar'
import Sidebar from '../components/sidebar/sidebar'
import axios from 'axios'

function Analytics() {

  const [data, setData] = useState([])


  useEffect(() => {
    axios.get(("http://localhost:4000/admin/record"))
      .then((res => {
        let { data } = res
        setData(
          [...data, data])
      }))
  }, [])


  return (
    <div>
      <Sidebar>
        <Navbar />
        <div class="p-7 mx-auto">
          <h1 className='text-indigo-600 font-extrabold'>RECORD LIST</h1>
          <div class="bg-white mt-7 shadow-md rounded ">
            <table class="text-left w-full border-collapse">
              <thead>
                <tr>
                  <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">No</th>
                  <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Company Name</th>
                  <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Company Details</th>
                  <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Record Status</th>
                </tr>
              </thead>
              <tbody>
                {
                  data.slice(0, data.length - 1).map((item, index) => (
                    <tr class="hover:bg-grey-lighter">
                      <td class="py-4 px-6 border-b border-grey-light">{index + 1}</td>
                      <td class="py-4 px-6 border-b border-grey-light">{item.companyname}</td>
                      <td class="py-4 px-6 border-b border-grey-light">{item.company}</td>
                      <td class="py-4 px-6 border-b border-grey-light">
                        <div class="w-full h-2 bg-blue-200 rounded-full">
                          {item.status === "approve" ? <div class="w-4/5 h-full bg-green-500 rounded-full"></div>
                            : item.status === "decline" ? <div class="w-1/5 h-full bg-red-500 rounded-full"></div>
                            : item.status === "booked" ? <div class="w-5/5 h-full bg-blue-500 rounded-full"></div>
                            :<div class="w-2/5 h-full bg-yellow-500 rounded-full"></div>
                          }
                        </div>
                      </td>

                    </tr>
                  ))
                }
              </tbody>
            </table>
          </div>
        </div>

      </Sidebar>
    </div>
  )
}

export default Analytics