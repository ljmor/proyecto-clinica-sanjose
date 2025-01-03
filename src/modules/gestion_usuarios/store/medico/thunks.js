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
    return async (dispatch) => {

        try {
            // Obtener del backend
            // const { user } = getState().auth; // Usurio que esta en la sesion actual (doctor)
            // const { pats } = await api.get('/pats/${user.cedula}'); // Obtener los pacientes de este doctor con esta cedula

            // Simulacion de datos para pruebas
            const pats = {
                ok: true,
                results: [
                    { id: 7, nombres: 'Oliver Saraguro', email: 'johndoe@example.com', tipo_sangre: 'A+', sexo: 'Masculino', ult_adm: '2023-10-05', cedula: '1321231', fechanac: '01/01/2004', edad: '18' },
                    { id: 8, nombres: 'Renato Rojas', email: 'johndoe@example.com', tipo_sangre: 'AB-', sexo: 'Femenino', ult_adm: '2022-12-10', cedula: '1561561', fechanac: '01/01/2004', edad: '20' },
                    { id: 9, nombres: 'John Doe 3', email: 'johndoe@example.com', tipo_sangre: 'O+', sexo: 'Masculino', ult_adm: '2024-05-30', cedula: '0315616', fechanac: '01/01/2004', edad: '55' },
                ]
            }

            // Simular delay
            await new Promise(resolve => setTimeout(resolve, 3000));

            if (!pats.ok) return dispatch(getRegisters(pats));
            dispatch(getRegisters(pats));

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
            // const { patient } = await api.get('/pat/${patient_ced}'); // Obtener el paciente con la cedula que se requiere
        
            // Ejemplo del paciente a ser añadido
            const patient = { id: 7, nombres: 'Paciente a añadir', email: 'johndoe@example.com', tipo_sangre: 'O-', sexo: 'Masculino', ult_adm: '2016-03-30', cedula: patient_ced, fechanac: '09/10/1959', edad: '69' };
            // const patient = false;
            if (patient === false) return dispatch(setActiveRegister('Error, no se ha encontrado ese paciente')) ;
            dispatch(setActiveRegister(patient));

        } catch (error) {
            console.error(error);
        }
    }
}

export const startAddDoctorPat = () => {
    return async (dispatch, getState) => {

        try {

            // Añdir
            const { activeRegister } = getState().medico; // Paciente activo
            // const { user } = useSelector(state => state.auth); // Usurio que esta en la sesion actual (doctor)
            // await api.post('/pats/${user.cedula}, activeRegister'); // Añadir este paciente a la lista de pacientes del doctor
            dispatch(addRegister(activeRegister));

        } catch (error) {
            console.error(error);
        }
    }
}