import React from 'react'
import { useSelector } from 'react-redux'
import { Navigate, Route, Routes } from 'react-router-dom'
import { RoleController } from './RoleController'
import { LoginPage } from '../modules/auth/pages/LoginPage'

export const AppRouter = () => {

    const { status } = useSelector(state => state.auth)

    if (status === 'checking') {
        return ( // Pantalla de carga
            <div className="body">
                <div className="loader">
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="circle"></div>
                    <div className="loading-text">Cargando...</div>
                </div>
            </div>
        )
    }

    return (

        <Routes>
            {
                (status === 'not-auth')
                    ? (
                        <>
                            <Route path="auth/*" element={<LoginPage />} />
                            <Route path="/*" element={<Navigate to="/auth/login" />} />
                        </>
                    )
                    : (
                        <>
                            <Route path="role/*" element={<RoleController />} />
                            <Route path="/*" element={<Navigate to="role" />} />
                        </>
                    )
            }
        </Routes>

    )
}
