import React, { useEffect, useState, useReducer } from 'react'
import axios from 'axios'
import '../modal/modal.css'
import { FaTimes } from 'react-icons/fa';

function Table() {

    const [data, setData] = useState([])
    const [appdata, setAppdata] = useState([])

    const [reducerValue, forceUpdate] = useReducer(x => x + 1, 0);
    const [modal, setModal] = useState(false)

    useEffect(() => {
        axios.get(("http://localhost:4000/admin/newapplist"))
            .then((res => {
                let { data } = res
                setData(
                    [...data, data])
            }))
    }, [reducerValue])

    const viewDetails = (e, id) => {

        axios.get("http://localhost:4000/admin/application/" + id)
            .then((res => {
                setAppdata(res.data)
            }))
        setModal(!modal)
    }


    const approve = (e, id) => {
        axios.post("http://localhost:4000/admin/approve/" + id)
            .then((res => {

                forceUpdate()
            }))
    }

    const decline = (e, id) => {
        axios.post("http://localhost:4000/admin/decline/" + id)
            .then((res => {
                forceUpdate()
            }))
    }



    const toggleModal = () => {
        setModal(!modal)
    }

    return (
        <div>
            <div class="p-7 mx-auto">
                <h1 className='text-indigo-600 font-extrabold'>NEW APPLICATION LIST</h1>
                <div class="bg-white mt-7 shadow-md rounded overflow-x-auto">
                    <table class="text-left w-full border-collapse ">

                        <thead>
                            <tr>
                                <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">No</th>
                                <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Company Name</th>
                                <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Company Details</th>
                                <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Status</th>
                                <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">View</th>
                                <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Accepct</th>
                                <th class="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">Decline</th>
                            </tr>
                        </thead>
                        <tbody>{
                            data.slice(0, data.length - 1).map((item, index) => (
                                <tr class="hover:bg-grey-lighter">
                                    <td class="py-4 px-6 border-b border-grey-light">{index + 1}</td>
                                    <td class="py-4 px-6 border-b border-grey-light">{item.companyname}</td>
                                    <td class="py-4 px-6 border-b border-grey-light">{item.company}</td>
                                    <td class="py-4 px-6 border-b border-grey-light">{item.status}</td>
                                    <td class="py-4 px-6 border-b border-grey-light">
                                        <button className='bg-cyan-600 rounded px-2 text-white font-medium' onClick={(e) => viewDetails(e, item._id)}>View</button></td>
                                    <td class="py-4 px-6 border-b border-grey-light">
                                        <button className='bg-green-500 rounded px-2 text-white font-medium' onClick={(e) => approve(e, item._id)}>Approve</button></td>
                                    <td class="py-4 px-6 border-b border-grey-light">
                                        <button className='bg-orange-600 rounded px-2 text-white font-medium' onClick={(e) => decline(e, item._id)}>Decline</button></td>

                                </tr>
                            ))
                        }
                        </tbody>
                    </table>
                </div>
            </div>
            {modal && (

                <div className='modal'>
                    <div onClick={toggleModal} className='overlay'></div>
                    <div className='modal-content'>
                        <h2 className='font-bold mb-7 text-cyan-600'>VIEW APPLICATION</h2>
                        <img className='w-[200px] mx-auto mb-5' src={`/image/${appdata.image}`} />
                        <div className='flex mx-auto justify-around'>
                            <div>
                                <p className='mb-3 font-bold text-gray-900'>Name  </p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{appdata.name}</p>
                                <p className='mb-3 font-bold text-gray-900'>email      </p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{appdata.email}</p>
                                <p className='mb-3 font-bold text-gray-900'>city       </p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{appdata.city}</p>
                                <p className='mb-3 font-bold text-gray-900'>address    </p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{appdata.address}</p>
                            </div>
                            <div>
                                <p className='mb-3 font-bold text-gray-900'>state      </p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{appdata.state}</p>
                                <p className='mb-3 font-bold text-gray-900'>phone      </p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{appdata.phone}</p>
                                <p className='mb-3 font-bold text-gray-900'>company    </p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{appdata.company}</p>
                                <p className='mb-3 font-bold text-gray-900'>solution   </p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{appdata.solution}</p>
                            </div>
                            <div>
                                <p className='mb-3 font-bold text-gray-900'>advantage  </p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{appdata.advantage}</p>
                                <p className='mb-3 font-bold text-gray-900'>potential  </p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{appdata.potential}</p>
                                <p className='mb-3 font-bold text-gray-900'>proposal   </p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{appdata.proposal}</p>
                                <p className='mb-3 font-bold text-gray-900'>team       </p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{appdata.team}</p>
                            </div>
                            <div>
                                <p className='mb-3 font-bold text-gray-900'>problem    </p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{appdata.problem}</p>
                                <p className='mb-3 font-bold text-gray-900'>proposition</p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{appdata.proposition}</p>
                                <p className='mb-3 font-bold text-gray-900'>revenue    </p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{appdata.revenue}</p>
                                <p className='mb-3 font-bold text-gray-900'>services   </p>
                                <p class="mb-3 font-normal text-gray-700 dark:text-gray-400">{appdata.services}</p>
                            </div>
                        </div>


                        <button className='bg-cyan-600 mt-10 w-full rounded p-2 px-2 text-white font-medium' onClick={toggleModal}>OK</button>



                        <button className='close-modal' onClick={toggleModal}><FaTimes /></button>
                    </div>
                </div>
            )}

        </div>
    )
}

export default Table

