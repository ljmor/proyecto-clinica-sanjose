import Swal from "sweetalert2";
import adminApi from "../../../../api/adminApi";
import { addRegister, deleteRegister, editRegister, getRegisters, setActiveRegister } from "./adminSlice";

export const startSetActiveRegister = (activeRegister) => {
    return async (dispatch) => {
        dispatch(setActiveRegister(activeRegister));
    }
}

export const startLoadingRegisters = (type) => {
    return async (dispatch) => {
        try {
            let endpoint = '';

            if (type === 'doctors') {
                endpoint = 'admin/docs';
            } else if (type === 'nurses') {
                endpoint = 'admin/nurses';
            } else if (type === 'patients') {
                endpoint = 'admin/patients';
            } else if (type === 'recepcionists') {
                endpoint = 'admin/recepcionists';
            } else {
                return;
            }

            const { data } = await adminApi.get(endpoint);
            dispatch(getRegisters(data));

        } catch (error) {
            console.error(error);
        }
    }
}


export const startAddRegister = (info) => {
    return async (dispatch, getState) => {
        try {
            // Si tiene ID se actualiza
            if (info.id) {
                await adminApi.put(`admin/${info.id}`, info);
                dispatch(editRegister({ ...info }));
                return;
            }

            // Crear Registro
            const { resp } = getState().admin;
            let endpoint = '';

            if (resp.type === 'doctors') {
                endpoint = 'admin/doc';
            } else if (resp.type === 'nurses') {
                endpoint = 'admin/nurse';
            } else if (resp.type === 'recepcionists') {
                endpoint = 'admin/recepcionist';
            } else {
                return;
            }

            const { data } = await adminApi.post(endpoint, info);

            const newRegister = {
                ...info,
                id: data.id
            };

            dispatch(addRegister(newRegister));

        } catch (err) {
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

export const startDeleteRegister = (cedula) => {
    return async (dispatch) => {

        try {
            if (cedula) {
                // Eliminar desde el backend a la BD
                await adminApi.delete(`admin/${cedula}`);
                dispatch(deleteRegister(cedula));
            }

        } catch (error) {
            console.log(error);
        }

    }
}