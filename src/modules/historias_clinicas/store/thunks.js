import api from "../../../api/api";
import {
  getHistories,
  loadingOff,
  loadingOn,
  setActiveForm,
  setActiveHistory,
  setError,
  updateHistory,
} from "./historySlice";

export const startSetActiveHistory = (activeHistory) => {
  return async (dispatch) => {
    dispatch(setActiveHistory(activeHistory));
  };
};

export const startSetActiveForm = (activeForm) => {
  return async (dispatch) => {
    dispatch(setActiveForm(activeForm));
  };
};

export const startLoadingHistories = () => {
  return async (dispatch, getState) => {
    try {

      dispatch(loadingOn());

      // Obtener del backend
      const { resp } = getState().auth;
      const userRol = resp.user.rol;
      let { resp: rolResp } = {};

      switch (userRol) {
        case 'doctor':
          rolResp = getState().medico;
          break;
        case 'nurse':
          rolResp = getState().enfermeria;
          break;
        case 'patient':
          rolResp = getState().paciente;
        default:
          break;
      }
      
     const { data } = await api.get(`historias/${parseInt(rolResp.activeRegister.cedula)}`); // Manejar que tipo de historias recibimos dependiendo del rol de usuario y recibir aquellas solo del usuario que se pide

      // Simulacion de datos para pruebas
      // DATA SIMULADA
      /* const data = {
        ok: true,
        patient: { cedula: "1103314336", nombres: "Luis Javier Mora Aguilar" },
        histories: [
          {
            id: 1,
            archivo: "archivopdf1",
            fechacreacion: "2024-01-01",
            fecha_ult_mod: "2024-02-01",
            nroforms: 3,
            estado: "enEspera",
            formularios: [
              {
                nombre: "Ingreso Prehospitalario.xlsx", // Nombre o tipo es lo mismo
                autor: "Dr. Pete Rodriguez",
                fecha_creacion: "2024-01-01",
                fecha_ult_mod: "2024-01-01",
                archivo: "UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA==",
              }
            ],
          },
          {
            id: 2,
            archivo: "archivopdf2",
            fechacreacion: "2024-03-01",
            fecha_ult_mod: "2024-03-15",
            nroforms: 2,
            estado: "enEspera",
            formularios: [
              {
                nombre: "Ingreso Prehospitalario.xlsx", // Nombre o tipo es lo mismo
                autor: "Dr. Pete Rodriguez",
                fecha_creacion: "2024-01-01",
                fecha_ult_mod: "2024-01-01",
                archivo: "UEsFBgAAAAAAAAAAAAAAAAAAAAAAAA==",
              }
            ],
          },
          {
            id: 3,
            archivo: "archivopdf3",
            fechacreacion: "2024-04-01",
            fecha_ult_mod: "2024-04-20",
            nroforms: 5,
            estado: "cerrada",
          },
          {
            id: 4,
            archivo: "archivopdf3",
            fechacreacion: "2024-04-01",
            fecha_ult_mod: "2024-04-20",
            nroforms: 5,
            estado: "cerrada",
          },
          {
            id: 5,
            archivo: "archivopdf3",
            fechacreacion: "2023-02-01",
            fecha_ult_mod: "2023-02-20",
            nroforms: 5,
            estado: "cerrada",
          },
          {
            id: 6,
            archivo: "archivopdf3",
            fechacreacion: "2010-06-07",
            fecha_ult_mod: "2013-12-20",
            nroforms: 5,
            estado: "cerrada",
          },
          {
            id: 7,
            archivo: "archivopdf3",
            fechacreacion: "2024-05-20",
            fecha_ult_mod: "2024-05-20",
            nroforms: 5,
            estado: "cerrada",
          },
        ],
      }; */

      dispatch(loadingOff());
      dispatch(getHistories(data));

    } catch (err) {
      dispatch(setError(err.response.data.msg));
      console.error(err);
    }
  };
};

export const startUpdateHistory = (history) => {
  return async (dispatch) => {
    try {
      // Actualizar
      // Desde el backend a la BD
      await api.put(`historias/${history.id}`, history);
      await dispatch(updateHistory(history));
    } catch (error) {
      console.error(error);
    }
  };
};
