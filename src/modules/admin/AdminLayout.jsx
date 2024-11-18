import React from 'react'
import { SideBar } from './components/SideBar'
import { NavBar } from './components/NavBar'

export const AdminLayout = ({ children }) => {
    return (
        
        <>
            {/* NavBar */}
            <NavBar/>
            {/* SideBar */}
            <SideBar />

            {/* Main content */}
            { children }
        </>
    )
}
