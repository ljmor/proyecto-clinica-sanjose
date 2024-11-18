import { Navigate, Route, Routes } from "react-router-dom"

export const AuthRoutes = () => {
    return (
        <Routes>
            <Route path="login" element={ <LoginPage/> }/>
            <Route path="forgotpass" element={ <h1>Olvido la contraseña</h1> }/>

            <Route path="/*" element={ <Navigate to="/auth/login"/> }/>
        </Routes>
    )
}
