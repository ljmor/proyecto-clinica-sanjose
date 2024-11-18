import { Navigate, Route, Routes } from "react-router-dom"
import { AdminLayout } from "../AdminLayout"
import { DoctorsView } from "../views/DoctorsView"

export const AdminRoutes = () => {

    return (
        <Routes>
            <Route path="/inicio/*" element={ <AdminLayout children={ <DoctorsView /> }/> } />
            <Route path="perfil" element={<h1>Perfil del admin</h1>} />
            <Route path="configuracion" element={<h1>Config del admin</h1>} />

            <Route path="/*" element={<Navigate to="inicio" />} />
        </Routes>
    )
}
