import React, { useEffect, useState } from 'react';
import { Box, Typography, TextField, Button, Grid2 } from '@mui/material';
import { styled } from '@mui/system';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../../../hooks/useForm';
import { startAddRegister } from '../../store/admin/thunks';
import { useNavigate } from 'react-router-dom';

// QUIZAS ESTE COMPONENTE PODRIA SER PRESCINDIBLE

const EditableProfileContainer = styled(Box)(({ theme }) => ({
    width: '70%',
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: '#f5f5f5',
    borderRadius: theme.shape.borderRadius,
    justifyContent: 'center',
    padding: '2rem'
}));

const FormField = styled(Box)({
    marginBottom: '16px',
});

export default function EditableProfile() {
    const { activeRegister } = useSelector(state => state.admin);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    // Usar un estado local para manejar el formulario
    const [formValues, setFormValues] = useState(null);

    useEffect(() => {
        if (activeRegister) {
            setFormValues({
                id: activeRegister.id,
                nombres: activeRegister.nombres,
                cedula: activeRegister.cedula,
                disponibilidad: activeRegister.disponibilidad,
                especialidad: activeRegister.especialidad,
                fechanac: activeRegister.fechanac,
                contacto: activeRegister.contacto,
                direccion: activeRegister.direccion,
            });
        }
    }, [activeRegister]);

    // Solo inicializar useForm cuando tengamos los valores
    const { formState, onInputChange, onResetForm } = useForm(formValues || {});
    const {
        id,
        nombres,
        cedula,
        disponibilidad,
        especialidad,
        fechanac,
        contacto,
        direccion
    } = formState;

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(startAddRegister(formState));
        navigate(-1);
    };

    const handleCancel = () => {
        navigate(-1);
    }

    // Mostrar loading mientras no tengamos los valores iniciales
    if (!formValues) {
        return <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
            <Typography>Cargando...</Typography>
        </Box>
    }

    return (
        <Grid2 container
            sx={{
                ml: { xs: '0', sm: '240px' },
                minHeight: '92.3vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
            }}
        >
            <EditableProfileContainer>
                <Typography variant="h4" gutterBottom>
                    Editar Perfil
                </Typography>

                <form onSubmit={handleSubmit}>
                    <FormField>
                        <TextField
                            type='text'
                            fullWidth
                            label="Nombre"
                            name="nombres"
                            value={nombres || ''}
                            onChange={onInputChange}
                        />
                    </FormField>
                    <FormField>
                        <TextField
                            type='number'
                            fullWidth
                            disabled
                            label="Cédula"
                            name="cedula"
                            value={cedula || ''}
                            onChange={onInputChange}
                        />
                    </FormField>
                    <FormField>
                        <TextField
                            type='text'
                            fullWidth
                            label="Disponibilidad"
                            name="disponibilidad"
                            value={disponibilidad || ''}
                            onChange={onInputChange}
                        />
                    </FormField>
                    <FormField>
                        <TextField
                            type='text'
                            fullWidth
                            label="Especialidad"
                            name="especialidad"
                            value={especialidad || ''}
                            onChange={onInputChange}
                        />
                    </FormField>
                    <FormField>
                        <TextField
                            type='date'
                            fullWidth
                            label="Fecha de Nacimiento"
                            name="fechanac"
                            value={fechanac || ''}
                            onChange={onInputChange}
                        />
                    </FormField>
                    <FormField>
                        <TextField
                            type='number'
                            fullWidth
                            label="Contacto"
                            name="contacto"
                            value={contacto || ''}
                            onChange={onInputChange}
                        />
                    </FormField>
                    <FormField>
                        <TextField
                            type='text'
                            fullWidth
                            label="Dirección"
                            name="direccion"
                            value={direccion || ''}
                            onChange={onInputChange}
                        />
                    </FormField>
                    <Box mt={3} display="flex" gap={2}>
                        <Button type="submit" variant="contained" color="primary">
                            Guardar Cambios
                        </Button>
                        <Button variant="outlined" onClick={handleCancel}>
                            Cancelar
                        </Button>
                    </Box>
                </form>
            </EditableProfileContainer>
        </Grid2>
    );
}