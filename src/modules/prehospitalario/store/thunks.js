import Swal from "sweetalert2";
import api from "../../../api/api";
import { setEmergenciaFormData, setNormalFormData, setNuevaHistoria, setPaciente } from "./prehospitalarioSlice";

export const startSetPatient = (paciente) => {
    return async (dispatch) => {
        dispatch(setPaciente(paciente))
    }
};

export const startSetNormalFormData = (data) => {
    return async (dispatch) => {
        dispatch(setNormalFormData(data))
    }
};

export const startSetEmergenciaFormData = (data) => {
    return async (dispatch) => {
        dispatch(setEmergenciaFormData(data))
    }
};

export const startSetNuevaHistoria = (data) => {
    return async (dispatch) => {
        dispatch(setNuevaHistoria(data))
    }
};

export const startSearchPatient = (cedula) => {
    return async (dispatch) => {
        try {

            const { data } = await api.get(`ingreso/${cedula}`);
            // Simulacion de datos obtenidos desde API
            /* const data = {
                ok: true,
                results: {
                    id: 231,
                    nombres: 'Juan Javier Guarnizo Garcia',
                    sexo: 'Masculino',
                    cedula: cedula,
                    fechanac: '2004-01-01',
                    lugarnac: 'Loja',
                    estadoCivil: 'Soltero/a',
                    email: 'johndoe@example.com', tipo_sangre: 'A+', contacto: '0897989874'
                }
            }; */

            dispatch(setPaciente(data.resp[0]));

        } catch (err) {
            dispatch(setPaciente({
                nombres: '',
                sexo: '',
                cedula: '',
                fechanac: '',
                lugarnac: '',
                estadoCivil: '',
                email: '',
                contacto: '',
                tipo_sangre: ''
            }));
            console.error(err);
        }

    }
}


export const startAddHistory = (history) => {
    return async (dispatch) => {
        try {

            const { data } = await api.post('ingreso/historia', history);
            const newHistory = {
                ...history,
                id: data.history_id
            }

            dispatch(setNuevaHistoria(newHistory));

        } catch (err) {
            console.error(err);
        }

    }
}

export const startAddForm = (form) => {
    return async () => {
        try {

            await api.post('ingreso/formulario', form);

        } catch (err) {
            console.error(err);
        }

    }
}

export const startAddPatient = (patient) => {
    return async () => {
        try {
            // Si tiene no tiene ID, entonces se debe crear un nuevo paciente
            if (!patient.id) {
                await api.post(`ingreso/paciente`, patient);
                return;
            }

        } catch (err) {
            console.log(err);
            const { data } = err.response;
            let errorMessages = '';

            if (data.errors) {
                errorMessages = Object.values(data.errors)
                    .map(error => `<li>${error.msg}</li>`)
                    .join('');
                errorMessages = `<ul>${errorMessages}</ul>`;
            } else if (data.msg) {
                errorMessages = `<p>${data.msg}</p>`;
            }

            Swal.fire({
                icon: 'error',
                title: 'Error',
                html: errorMessages
            });
        }

    }
}

