import React, { useEffect, useReducer, useState } from 'react'
import { FaTimes } from 'react-icons/fa'
import Navbar from '../components/navbar/navbar'
import Sidebar from '../components/sidebar/sidebar'
import axios from 'axios'

function Comment() {

  const [data, setData] = useState([])
  const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);

  useEffect(() => {
    axios.get(("http://localhost:4000/admin/slotbooking"))
      .then((res => {
        let { data } = res
        setData(
          [...data, data])
      }))
  }, [reducerValue])
  const [appdata, setAppdata] = useState([])
  const [divid, setDivid] = useState([])
  const [slotBooking, setSlotBooking] = useState("")

  const [modal, setModal] = useState(false)
 

  const viewDetails = (e, div, status) => {
    if (status === 'booked') {
      alert("Slot already Booked")
    } else {
      axios.get("http://localhost:4000/admin/approvelist")
        .then((res => {
          setAppdata(res.data)
        }))
      setDivid(div)
      setModal(!modal)
    }


  }

  const submit = () => {
    const data = { slotBooking, divid }
    if(data.slotBooking!==""){
      axios.post("http://localhost:4000/admin/booking", data)
      .then((response => {
        alert("Booked successfuly")
        forceUpdate()
      }))
    }
    
    
    forceUpdate()
    setSlotBooking('')
    setModal(!modal)
  }

  const toggleModal = () => {
    setModal(!modal)
  }

  return (
    <div>
      <Sidebar>
        <Navbar />
        <div class="p-7 mx-auto">
          <h1 className='text-indigo-600 font-extrabold'>BOOKING SLOT</h1>
          <div class=" mt-7 p-7 bg-neutral-100  rounded ">
            <div className='grid gap-3 sm:grid-cols-1 md:grid-cols-5 lg:grid-cols-10 '>
              {data.slice(0, data.length - 1).map((item, index) => (
                <div style={{ backgroundColor: item.status === 'booked' ? "lightgreen" : "lightgray" }}
                 className='h-16 rounded ' onClick={(e) => viewDetails(e, item._id, item.status)}>
                  <p className='text-black font-semibold text-center'>{item.name}</p>
                  <p className='text-white font-mono mt-2 text-center'>{item.company}</p>
                 </div>
              ))
              }
            </div>
          </div>
        </div>
        {modal && (

          <div className='"modal'>
            <div onClick={toggleModal} className='overlay'></div>
            <div className='modal-content'>
              <h2 className='font-bold mb-7 text-cyan-600'>BOOK SLOT</h2>
              <div className='flex justify-center '>
                <div className="relative w-full h-36 lg:max-w-sm">
                  <h1>select company</h1>
                  <select className="w-full p-2.5 text-gray-500 bg-white border rounded-md shadow-sm outline-none appearance-none focus:border-indigo-600"
                    onChange={(e) => setSlotBooking(e.target.value)}>
                    <option selected>--select--</option>
                    {appdata.map((item, index) => (
                      <option key={index} value={item._id}>{item.companyname}</option>
                    ))}
                  </select>
                  <button className='bg-cyan-600 mt-10 w-full rounded p-2 px-2 text-white font-medium' onClick={submit} >submit</button>
                </div>

              </div>

              {/* <button className='bg-cyan-600 mt-10 w-full rounded p-2 px-2 text-white font-medium' onClick={submit} >submit</button> */}

              <button className='close-modal' onClick={toggleModal}><FaTimes /></button>
            </div>
          </div>
        )}
      </Sidebar>
    </div>
  )
}

export default Comment