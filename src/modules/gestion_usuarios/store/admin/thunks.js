import { addRegister, deleteRegister, editRegister, getRegisters, setActiveRegister } from "./adminSlice";

export const startSetActiveRegister = (activeRegister) => {
    return async (dispatch) => {
        dispatch(setActiveRegister(activeRegister));
    }
}

export const startLoadingRegisters = (type) => {
    return async (dispatch) => {

        try {

            switch (type) {
                case 'doctors':
                    // Obtener del backend
                    // const { docs } = await api.get('/docs');

                    // Simulacion de datos para pruebas
                    const docs = {
                        ok: true,
                        results: [
                            { id: 1, nombres: 'John Doe', email: 'ljmo@example.com', especialidad: 'Cardiologia', cedula: '1321231', contacto: '+5930320320', registro: 'UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA==' },
                            { id: 2, nombres: 'Andrez Gonzales', email: 'sxas@example.com', especialidad: 'Espc 2', cedula: '54986445', contacto: '+5930320320', registro: 'UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA==' },
                            { id: 3, nombres: 'Jose Cango', email: 'johndoe@example.com', especialidad: 'Espc 2', cedula: '0654684', contacto: '+5930320320', registro: 'UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA==' },
                            { id: 4, nombres: 'Jose Cango', email: 'johndoe@example.com', especialidad: 'Espc 2', cedula: '0654684', contacto: '+5930320320', registro: 'UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA==' },
                        ],
                        type: 'doctors'
                    }

                    dispatch(getRegisters(docs));
                    break;

                case 'nurses':
                    // Obtener del backend
                    // const { nurses } = await api.get('/nurses');

                    // Simulacion de datos para pruebas
                    const nurses = {
                        ok: true,
                        results: [
                            { id: 4, nombres: 'Jose Granda', email: 'sample@example.com', cedula: '110546548648', contacto: '+5930320320' },
                            { id: 5, nombres: 'Ana Armijos', email: 'sample@example.com', cedula: '110546548648', contacto: '+5930320320' },
                            { id: 6, nombres: 'Luis Garcia', email: 'sample@example.com', cedula: '110546548648', contacto: '+5930320320' },
                        ],
                        type: 'nurses'
                    }

                    dispatch(getRegisters(nurses));
                    break;

                case 'patients':
                    // Obtener del backend
                    // const { pats } = await api.get('/pats');

                    // Simulacion de datos para pruebas
                    const pats = {
                        ok: true,
                        results: [
                            { id: 7, nombres: 'Oliver Saraguro', email: 'johndoe@example.com', tipo_sangre: 'A+', sexo: 'Masculino', ult_adm: '2023-10-05', cedula: '1321231', fechanac: '01/01/2004', edad: '18' },
                            { id: 8, nombres: 'Renato Rojas', email: 'johndoe@example.com', tipo_sangre: 'A+', sexo: 'Masculino', ult_adm: '2023-10-05', cedula: '1321231', fechanac: '01/01/2004', edad: '18' },
                            { id: 9, nombres: 'John Doe 3', email: 'johndoe@example.com', tipo_sangre: 'A+', sexo: 'Masculino', ult_adm: '2023-10-05', cedula: '1321231', fechanac: '01/01/2004', edad: '18' },
                        ],
                        type: 'patients'
                    }

                    dispatch(getRegisters(pats));
                    break;

                case 'recepcionists':
                    // Obtener del backend
                    // const { receps } = await api.get('/receps');

                    // Simulacion de datos para pruebas
                    const receps = {
                        ok: true,
                        results: [
                            { id: 7, nombres: 'Oliver Saraguro', email: 'johndoe@example.com', cedula: '1321231' },
                            { id: 8, nombres: 'Renato Rojas', email: 'johndoe@example.com', cedula: '1321231' },
                            { id: 9, nombres: 'John Doe 3', email: 'johndoe@example.com', cedula: '1321231' },
                        ],
                        type: 'recepcionists'
                    }

                    dispatch(getRegisters(receps));
                    break;

                default:
                    break;
            }


        } catch (error) {
            console.error(error);
        }

    }
}


export const startAddRegister = (info) => {
    return async (dispatch) => {

        try {
            if (info.id) {
                // Actualizar
                // Desde el backend a la BD
                // await api.put(`/${info.id}`, info);

                dispatch(editRegister({ ...info }));
                return;

            }

            // Crear
            // Desde el backend a la BD
            // const { data } = await api.post('/', info);
            const newElem = {
                ...info,
                // id: data.id, Cuando se hace desde backend
                id: Date.now(), // Simulando generado desde la BD
            }
            dispatch(addRegister(newElem));

        } catch (error) {
            console.error(error);
        }
    }
}

export const startDeleteRegister = (id) => {
    return async (dispatch) => {

        try {
            if (id) {
                // Eliminar desde el backend a la BD
                // await api.delete(`/${id}`);
                dispatch(deleteRegister(id));
            }

        } catch (error) {
            console.log(error);
        }

    }
}