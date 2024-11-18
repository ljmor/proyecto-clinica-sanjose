import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminRoutes } from '../modules/admin/routes/AdminRoutes'

export const RoleController = () => {

    const { resp } = useSelector(state => state.auth)


    if (resp.user.role === 'admin') {
        return (
            <Routes>
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/*" element={<Navigate to="admin" />} />
            </Routes>
        )
    }

    if (resp.user.role === 'doctor') {
        return (
            <Routes>
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/*" element={<Navigate to="admin" />} />
            </Routes>
        )
    }

    if (resp.user.role === 'nurse') {
        return (
            <Routes>
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/*" element={<Navigate to="admin" />} />
            </Routes>
        )
    }
}
