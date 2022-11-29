import React from 'react';
import Navbar from '../components/navbar/navbar';
import Sidebar from '../components/sidebar/sidebar';
import Table from '../components/table/table';

function dashboard() {
  
  return (
    <div>
      <Sidebar>
        <Navbar/>
        <Table/>
      </Sidebar>
    </div>
  )
}
    
export default dashboard