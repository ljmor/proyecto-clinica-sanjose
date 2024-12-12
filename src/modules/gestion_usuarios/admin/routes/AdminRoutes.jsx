import { Navigate, Route, Routes } from "react-router-dom"
import { AdminLayout } from "../AdminLayout"
import { DoctorsView } from "../views/DoctorsView"
import { CreateDoctor } from "../pages/CreateDoctor"
import ProfileView from "../pages/ProfileView"
import EditableProfile from "../pages/EditableProfile"

export const AdminRoutes = () => {

    // ADAPTAR PARA QUE FUNCIONE SEGÚN EL TIPO DE USUARIO CON EL QUE INTERACTUAR (JUGAR CON EL ADMINSLICE)

    return (
        <Routes>
            <Route path="/medicos/*" element={ <AdminLayout children={ <DoctorsView /> }/> } />
            <Route path="/medicos/crear" element={ <AdminLayout children={ <CreateDoctor /> }/> } />
            <Route path="/medicos/perfil" element={ <AdminLayout children={ <ProfileView /> }/> } />
            <Route path="/medicos/perfil/editar" element={ <AdminLayout children={ <EditableProfile /> }/> } />

            <Route path="/*" element={<Navigate to="medicos" />} />
        </Routes>
    )
}
