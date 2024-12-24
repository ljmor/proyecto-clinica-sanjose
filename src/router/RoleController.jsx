import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { AdminRoutes } from '../modules/gestion_usuarios/admin/routes/AdminRoutes'
import { DoctorRoutes } from '../modules/gestion_usuarios/medico/routes/DoctorRoutes'

export const RoleController = () => {

    const { resp } = useSelector(state => state.auth)


    if (resp.user.rol === 'admin') {
        return (
            <Routes>
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/*" element={<Navigate to="admin" />} />
            </Routes>
        )
    }

    if (resp.user.rol === 'doctor') {
        return (
            <Routes>
                <Route path="/medico/*" element={<DoctorRoutes />} />
                <Route path="/*" element={<Navigate to="medico" />} />
            </Routes>
        )
    }

    if (resp.user.rol === 'nurse') {
        return (
            <Routes>
                <Route path="/admin/*" element={<AdminRoutes />} />
                <Route path="/*" element={<Navigate to="admin" />} />
            </Routes>
        )
    }
}
