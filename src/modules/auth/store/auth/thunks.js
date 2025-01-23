import Swal from "sweetalert2";
import { appLogout } from "../../../historias_clinicas/store/historySlice";
import { onChecking, onLogin, onLogout } from "./authSlice";

export const startLogin = ({ email, password, cedula }) => {

    return async (dispatch) => {

        try {
            dispatch(onChecking());

            /* 
            if (cedula === '') {
                // await api.post('login/validatePassword', {email, password})
            } else {
                // await api.post('login/validateCedula', {email, cedula})
            }
            */

            // Simulacion de datos obtenidos desde API
            const result = {
                ok: true,
                user: {
                    id: 1,
                    nombres: 'Luis Mora',
                    cedula: '123102',   
                    email: 'johndoe@example.com',
                    rol: 'doctor',  // doctor, nurse, patient, admin, recepcionist
                }
            }

            /* const result = {
                ok: true,
                user: {
                    id: 1,
                    nombres: 'Luis Mora',
                    cedula: '123',
                    email: 'johndoe@example.com',
                    rol: 'patient',  // doctor, nurse, patient, admin, reception
                }
            } */

            // Si todo sale bien
            dispatch(onLogin(result));

        } catch (err) {
            const errorMessage = err.response.data.msg;
            console.log(errorMessage);

            Swal.fire('Error al iniciar', errorMessage, 'error');
        }

    }

}

export const startLogout = () => {
    return async (dispatch) => {
        dispatch(appLogout());
        dispatch(onLogout());
    }
}