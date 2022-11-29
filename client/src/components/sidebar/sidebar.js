import React, { useState } from 'react'
import './sidebar.css'
import {FaBars, FaCommentAlt, FaRegChartBar, FaShoppingBag, FaTh, FaThList} from 'react-icons/fa';
import { NavLink } from 'react-router-dom';
function Sidebar({children}) {
    const [isOpen,setIsOpen] = useState(true);
    const toggle = () => setIsOpen(!isOpen);
    const menuItem =[
        {
            path:"/dashboard",
            name:"Application",
            icon:<FaTh/>
        },
        {
            path:"/approved",
            name:"Approved", 
            icon:<FaThList/>
        },
        {
            path:"/decline",
            name:"Rejected",
            icon:<FaShoppingBag/>
        },
        {
            path:"/booking",
            name:"Booking",
            icon:<FaCommentAlt/>
        },
        {
            path:"/analytics",
            name:"Record",
            icon:<FaRegChartBar/>
        },
    ]
  return (
    <div className='continer items-start'>
        <div style={{width: isOpen ? "200px" : "50px" }} className="sidebar">
            <div className="top_section" style={{height: isOpen ? "80px" : "80px" }} >
                <h1 style={{display: isOpen ? "block" : "none"}} className="logo">Logo</h1>
                <div style={{marginLeft: isOpen ? "50px" : "-5px"}} className="bars">
                    <FaBars onClick={toggle}/>
                </div>
            </div>
            {
                menuItem.map((item,index)=>(
                    <NavLink to={item.path} key={index} className="link" activeclassName="active">
                        <div className="icon">{item.icon}</div>
                        <div style={{display: isOpen ? "block" : "none"}} className="link_text">{item.name}</div>
                    </NavLink>
                ))
            }
        </div>
        <main>{children}</main>
    </div>    
  )
}

export default Sidebar