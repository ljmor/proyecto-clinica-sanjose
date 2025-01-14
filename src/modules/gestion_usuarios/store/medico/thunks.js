import Swal from "sweetalert2";
import api from "../../../../api/api";
import { addRegister, appLogout, getRegisters, setActiveRegister } from "./medicoSlice";



export const startSetActiveRegister = (activeRegister) => {
    return async (dispatch) => {
        dispatch(setActiveRegister(activeRegister));
    }
}

export const startLogoutApp = () => {
    return async (dispatch) => {
        dispatch(appLogout());
    }
}

export const startLoadingDoctorPats = () => {
    return async (dispatch, getState) => {

        try {
            // Obtener del backend
            const { resp: auth } = getState().auth; // Usurio que esta en la sesion actual (doctor)
            const { data } = await api.get(`medico/pats/${auth.user.cedula}`); // Obtener los pacientes de este doctor con esta cedula

            // Simulacion de datos para pruebas
            /* const pats = {
                ok: true,
                results: [
                    { id: 7, nombres: 'Oliver Saraguro', email: 'johndoe@example.com', tipo_sangre: 'A+', sexo: 'Masculino', ult_adm: '2023-10-05', cedula: '1321231', fechanac: '01/01/2004', edad: '18' },
                    { id: 8, nombres: 'Renato Rojas', email: 'johndoe@example.com', tipo_sangre: 'AB-', sexo: 'Femenino', ult_adm: '2022-12-10', cedula: '1561561', fechanac: '01/01/2004', edad: '20' },
                    { id: 9, nombres: 'John Doe 3', email: 'johndoe@example.com', tipo_sangre: 'O+', sexo: 'Masculino', ult_adm: '2024-05-30', cedula: '0315616', fechanac: '01/01/2004', edad: '55' },
                ]
            } */

            // Simular delay
            // await new Promise(resolve => setTimeout(resolve, 3000));

            dispatch(getRegisters(data));

        } catch (error) {
            console.error(error);
        }

    }
}

export const startSearchPat = (patient_ced) => {
    return async (dispatch) => {
        try {

            // Buscar
            // Desde el backend a la BD
            const { data } = await api.get(`medico/pat/${parseInt(patient_ced)}`); // Obtener el paciente con la cedula que se requiere

            // Ejemplo del paciente a ser añadido
            // const patient = { id: 7, nombres: 'Paciente a añadir', email: 'johndoe@example.com', tipo_sangre: 'O-', sexo: 'Masculino', ult_adm: '2016-03-30', cedula: patient_ced, fechanac: '09/10/1959', edad: '69' };
            dispatch(setActiveRegister(data.results[0]));

        } catch (error) {
            // console.error(error);
            dispatch(setActiveRegister('Error, no se ha encontrado ese paciente'));
        }
    }
}

export const startAddDoctorPat = () => {
    return async (dispatch, getState) => {

        try {

            // Añdir
            const { activeRegister } = getState().medico; // Paciente activo
            const { resp: authResp } = getState().auth; // Usurio que esta en la sesion actual (doctor)
            await api.put(`medico/${activeRegister.cedula}`, { cedula_doc: parseInt(authResp.user.cedula) }); // Añadir este paciente a la lista de pacientes del doctor
            dispatch(addRegister(activeRegister));

        } catch (err) {
            const errorMessage = err.response.data.msg;
            // console.log(errorMessage);

            Swal.fire('Error', errorMessage, 'error');
        }
    }
}