import { onChecking, onLogin } from "./authSlice";

export const startLogin = ({ email, password }) => {

    return async (dispatch) => {

        dispatch(onChecking());

        // Proceso asyncrono para obtener los datos
        console.log(`Email: ${email} --- Password: ${password}`);
        
        // Simulacion de datos obtenidos desde API
        const result = {
            ok: true,
            user: {
                id: 1,
                nombres: 'Luis Mora',
                cedula: '11032035',
                email: 'johndoe@example.com',
                rol: 'doctor',
                profile_image: 'dsf'
            }
        }

        // Si hay un error
        if (!result.ok) return dispatch(logout(result.errorMessage));

        // Si todo sale bien
        dispatch(onLogin(result));

    }

}