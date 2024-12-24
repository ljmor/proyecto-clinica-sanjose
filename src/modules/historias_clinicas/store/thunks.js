import {
    getHistories,
    loadingOff,
    loadingOn,
    setActiveHistory,
    setError,
    updateHistory,
  } from "./historySlice";
  
  export const startSetActiveHistory = (activeHistory) => {
    return async (dispatch) => {
      dispatch(setActiveHistory(activeHistory));
    };
  };
  
  export const startLoadingHistories = () => {
    return async (dispatch) => {
      try {
        await setTimeout(() => {
          console.log("Cargando");
        }, 5000);
  
        dispatch(loadingOn());
  
        // Obtener del backend
        // const { resp } = useSelector(state => state.auth);
        // const userRol = resp.role
        /*
          switch (userRol) {
            case 'doctor':
              const { activeRegister } = useSelector(state => state.doctor);
              break;
            case 'nurse':
              const { activeRegister } = useSelector(state => state.nurse);
              break;
            case 'patient':
              const { activeRegister } = useSelector(state => state.patient);
              break;
            case 'admin':
              const { activeRegister } = useSelector(state => state.admin);
              break;
          
            default:
              console.log('Error'),
              break;
          }
        */
  
        // const { data } = await api.get('/histories/${resp.user.role}/${activeRegister.cedula}'); // Manejar que tipo de historias recibimos dependiendo del rol de usuario y recibir aquellas solo del usuario que se pide
  
        // Simulacion de datos para pruebas
        // DATA QUEMADA
        const data = {
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
                  archivo: "archivoExcel",
                },
                {
                  nombre: "Tratamiento Médico.xlsx",
                  autor: "Dr. Pete Rodriguez",
                  fecha_creacion: "2024-01-18",
                  fecha_ult_mod: "2024-01-18",
                  archivo: "archivoExcel",
                },
                {
                  nombre: "Resultados oncologicos.xlsx",
                  autor: "Dr. Luis Bolaños",
                  fecha_creacion: "2024-01-10",
                  fecha_ult_mod: "2024-01-10",
                  archivo: "archivoExcel",
                },
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
                  nombre: "Epicrisis.xlsx",
                  autor: "Dr. Pete Rodriguez",
                  fecha_creacion: "2024-01-20",
                  fecha_ult_mod: "2024-01-20",
                  archivo: "ruta",
                },
                {
                  nombre: "Resultados oncologicos.xlsx",
                  autor: "Dr. Luis Bolaños",
                  fecha_creacion: "2024-01-10",
                  fecha_ult_mod: "2024-01-10",
                  archivo: "ruta",
                },
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
        };
  
        dispatch(loadingOff());
  
        if (!data.ok) return dispatch(setError(data.errorMsg));
  
        dispatch(getHistories(data));
      } catch (error) {
        console.error(error);
      }
    };
  };
  
  export const startUpdateHistory = (history) => {
    return async (dispatch) => {
      try {
        // Actualizar
        // Desde el backend a la BD
        // await api.put(`histories/${history.id}`, history);
  
        await dispatch(updateHistory(history));
      } catch (error) {
        console.error(error);
      }
    };
  };
  