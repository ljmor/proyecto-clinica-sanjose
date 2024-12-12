import { useEffect } from "react";
import { useDispatch } from "react-redux"
import { changeUIStatus } from "../../../../store_general/ui/uiSlice";
import { Box, Button, Grid2, TextField, Typography } from "@mui/material";
import { useForm } from "../../../../hooks/useForm";
import { startAddRegister } from "../../store/admin/thunks";

// VERIFICA QUE SE ADAPTE A LOS CAMPOS DE FORUMALRIO DE CREACION EN FIGMA

const initialForm = {
    nombres: '',
    email: '',
    especialidad: '',
    turno: '',
    disponibilidad: '',
    nropacientes: 0, 
    cedula: '',
    fechanac: '',
    contacto: '',
    direccion: ''
}

export const CreateDoctor = () => {

    const dispatch = useDispatch();
    const { 
        onInputChange,
        onResetForm,
        nombres, 
        especialidad, 
        direccion,
        cedula,
        contacto,
        fechanac,
        email
    } = useForm(initialForm);

    useEffect(() => {
        dispatch(changeUIStatus('below'));

    }, [])

    const onSubmitData = (event) => {
        event.preventDefault();
        const data = {
            nombres,
            email,
            especialidad,
            turno: 'Ninguno',
            disponibilidad: 'Disponible',
            nropacientes: 0,
            cedula,
            fechanac,
            contacto,
            direccion
        }
        // Llamar al dispatch
        dispatch(startAddRegister(data));
        console.log(data);
        // Resetear el formulario
        onResetForm();
    }


    return (
        <Grid2 container
            sx={{
                display: 'flex',
                padding: '16px',
                ml: { xs: '0', sm: '240px' },
                flexDirection: 'column',
                top: '0',
                mt: '47px',
                minHeight: '86.5vh',
            }}
        >

            {/* Titulo */}
            <Grid2
                display='flex'
                flexDirection='column'
                color='black'
                fontFamily='Poppins'
            >
                <Typography
                    variant="h1"
                    fontSize='40px'
                    fontStyle='normal'
                    fontWeight='600'
                    lineHeight='146.475%'
                    textAlign='center'
                >
                    Registrar Médico</Typography>
                <Typography
                    variant="subtitle1"
                    textAlign='center'
                    fontSize='16px'
                    fontStyle='400'
                    lineHeight='146.475%'
                >
                    Llene los campos a continuación para el registro de un nuevo médico en la base de datos hospitalaria</Typography>
            </Grid2>

            <form onSubmit={onSubmitData} autoComplete="off">
                {/* Bloque 1 */}
                <Grid2 container
                    display='flex'
                    flexDirection='column'
                    mt='55px'
                    ml='30px'
                    mr={{ xs: '30px', md: '0' }}
                >
                    <Typography
                        textAlign='left'
                        fontSize='20px'
                        fontWeight='600'
                        lineHeight='146.475%'
                    >
                        Llena los datos del nuevo médico
                    </Typography>
                    {/* Fila de campos */}
                    <Grid2
                        display='flex'
                        flexDirection='row'
                        mt='30px'
                        gap='30px'
                        flexWrap='wrap'
                    >
                        {/* Pila 1 */}
                        <Grid2
                            display='flex'
                            flexDirection='column'
                            width={{ xs: '100%', md: '30%' }}
                            gap='18px'
                        >
                            <Box>
                                <Typography
                                    fontSize='13px'
                                    fontWeight='300'
                                    lineHeight='146.475%'
                                    ml='12px'
                                    mb='5px'
                                >
                                    Nombres y Apellidos
                                </Typography>
                                <TextField
                                    type="text"
                                    placeholder="Ingrese los nombres y apellidos del médico"
                                    fullWidth
                                    name="nombres"
                                    value={nombres}
                                    onChange={onInputChange}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                width: '100%',
                                                height: '48px',
                                                padding: '8px 8px 8px 16px',
                                                backgroundColor: '#E9E9E9',
                                                borderRadius: '4px',
                                                '& input': {
                                                    color: '#080808',
                                                },
                                                '& input::-webkit-input-placeholder': {
                                                    color: '#080808',
                                                    fontSize: '12px'
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none'
                                                },
                                            },
                                        }
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography
                                    fontSize='13px'
                                    fontWeight='300'
                                    lineHeight='146.475%'
                                    ml='12px'
                                    mb='5px'
                                >
                                    Nro. Cédula
                                </Typography>
                                <TextField
                                    type="number"
                                    placeholder="Ingresa la cédula"
                                    fullWidth
                                    name="cedula"
                                    value={cedula}
                                    onChange={onInputChange}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                width: '100%',
                                                height: '48px',
                                                padding: '8px 8px 8px 16px',
                                                backgroundColor: '#E9E9E9',
                                                borderRadius: '4px',
                                                '& input': {
                                                    color: '#080808',
                                                },
                                                '& input::-webkit-input-placeholder': {
                                                    color: '#080808',
                                                    fontSize: '12px'
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none'
                                                },
                                            },
                                        }
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography
                                    fontSize='13px'
                                    fontWeight='300'
                                    lineHeight='146.475%'
                                    ml='12px'
                                    mb='5px'
                                >
                                    Fecha de nacimiento
                                </Typography>
                                <TextField
                                    type="date"
                                    placeholder="Ingrese la fecha de nacimiento"
                                    fullWidth
                                    name="fechanac"
                                    value={fechanac}
                                    onChange={onInputChange}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                width: '100%',
                                                height: '48px',
                                                padding: '8px 8px 8px 16px',
                                                backgroundColor: '#E9E9E9',
                                                borderRadius: '4px',
                                                '& input': {
                                                    color: '#080808',
                                                },
                                                '& input::-webkit-input-placeholder': {
                                                    color: '#080808',
                                                    fontSize: '12px'
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none'
                                                },
                                            },
                                        }
                                    }}
                                />
                            </Box>
                        </Grid2>
                        {/* Pila 2 */}
                        <Grid2
                            display='flex'
                            flexDirection='column'
                            width={{ xs: '100%', md: '30%' }}
                            gap='18px'
                        >
                            <Box>
                                <Typography
                                    fontSize='13px'
                                    fontWeight='300'
                                    lineHeight='146.475%'
                                    ml='12px'
                                    mb='5px'
                                >
                                    Especialidad
                                </Typography>
                                <TextField
                                    type="text"
                                    placeholder="Ingresa la especialidad"
                                    fullWidth
                                    name="especialidad"
                                    value={especialidad}
                                    onChange={onInputChange}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                width: '100%',
                                                height: '48px',
                                                padding: '8px 8px 8px 16px',
                                                backgroundColor: '#E9E9E9',
                                                borderRadius: '4px',
                                                '& input': {
                                                    color: '#080808',
                                                },
                                                '& input::-webkit-input-placeholder': {
                                                    color: '#080808',
                                                    fontSize: '12px'
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none'
                                                },
                                            },
                                        }
                                    }}
                                />
                            </Box>
                            <Box>
                                <Typography
                                    fontSize='13px'
                                    fontWeight='300'
                                    lineHeight='146.475%'
                                    ml='12px'
                                    mb='5px'
                                >
                                    Contacto
                                </Typography>
                                <TextField
                                    type="number"
                                    placeholder="Ingresa el contacto"
                                    fullWidth
                                    name="contacto"
                                    value={contacto}
                                    onChange={onInputChange}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                width: '100%',
                                                height: '48px',
                                                padding: '8px 8px 8px 16px',
                                                backgroundColor: '#E9E9E9',
                                                borderRadius: '4px',
                                                '& input': {
                                                    color: '#080808',
                                                },
                                                '& input::-webkit-input-placeholder': {
                                                    color: '#080808',
                                                    fontSize: '12px'
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none'
                                                },
                                            },
                                        }
                                    }}
                                />
                            </Box>
                        </Grid2>
                        {/* Pila 3 */}
                        <Grid2
                            display='flex'
                            flexDirection='column'
                            width={{ xs: '100%', md: '30%' }}
                            gap='18px'
                        >
                            <Box>
                                <Typography
                                    fontSize='13px'
                                    fontWeight='300'
                                    lineHeight='146.475%'
                                    ml='12px'
                                    mb='5px'
                                >
                                    Dirección
                                </Typography>
                                <TextField
                                    type="text"
                                    placeholder="Ingresa la dirección de vivienda"
                                    fullWidth
                                    name="direccion"
                                    value={direccion}
                                    onChange={onInputChange}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                width: '100%',
                                                height: '48px',
                                                padding: '8px 8px 8px 16px',
                                                backgroundColor: '#E9E9E9',
                                                borderRadius: '4px',
                                                '& input': {
                                                    color: '#080808',
                                                },
                                                '& input::-webkit-input-placeholder': {
                                                    color: '#080808',
                                                    fontSize: '12px'
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none'
                                                },
                                            },
                                        }
                                    }}
                                />
                            </Box>

                            <Box>
                                <Typography
                                    fontSize='13px'
                                    fontWeight='300'
                                    lineHeight='146.475%'
                                    ml='12px'
                                    mb='5px'
                                >
                                    Email
                                </Typography>
                                <TextField
                                    type="email"
                                    placeholder="Ingresa la dirección de correo"
                                    fullWidth
                                    name="email"
                                    value={email}
                                    onChange={onInputChange}
                                    slotProps={{
                                        input: {
                                            sx: {
                                                width: '100%',
                                                height: '48px',
                                                padding: '8px 8px 8px 16px',
                                                backgroundColor: '#E9E9E9',
                                                borderRadius: '4px',
                                                '& input': {
                                                    color: '#080808',
                                                },
                                                '& input::-webkit-input-placeholder': {
                                                    color: '#080808',
                                                    fontSize: '12px'
                                                },
                                                '& .MuiOutlinedInput-notchedOutline': {
                                                    border: 'none'
                                                },
                                            },
                                        }
                                    }}
                                />
                            </Box>

                        </Grid2>
                    </Grid2>
                </Grid2>
                {/* Bloque 2 */}
                <Grid2
                    display='flex'
                    flexDirection='column'
                    mt='155px' // Cambiar mas tarde a 55px
                    ml='30px'
                    mr='30px'
                >
                    {/* Titulo */}
                    {/* Formacion y botones */}
                    <Button
                        type="submit"
                        sx={{
                            justifySelf: 'end',
                            width: '163px',
                            height: '50px',
                            padding: '10px 12px 11px 12px',
                            borderRadius: '43px',
                            backgroundColor: '#43A65E',
                            color: '#fff',
                            textAlign: 'center',
                            fontSize: '15px',
                            fontWeight: '400',
                            lineHeight: '146.475%',
                            alignSelf: 'end',
                        }}
                    >
                        Crear
                    </Button>
                </Grid2>
            </form>

        </Grid2>
    )
}
