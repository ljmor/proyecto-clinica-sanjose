import React from 'react'
import { SideBar } from './components/SideBar'
import { NavBar } from './components/NavBar'

export const AdminLayout = ({ children }) => {
    return (
        
        <div className='adminlayout' style={{ fontFamily: 'Poppins' }} >
            {/* NavBar */}
            <NavBar/>
            {/* SideBar */}
            <SideBar />

            {/* Main content */}
            { children }
        </div>
    )
}