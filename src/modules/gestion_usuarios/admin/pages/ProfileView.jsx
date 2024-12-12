import React, { useEffect, useState } from 'react';
import { Box, Typography, Divider, Button, IconButton, useMediaQuery, useTheme, Grid2 } from '@mui/material';
import { styled } from '@mui/system';
import SchoolIcon from '@mui/icons-material/School';
import EditableProfile from './EditableProfile';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeUIStatus } from '../../../../store_general/ui/uiSlice';

// TO DOs:
// - MODIFICAR ESTO PARA ADAPTARLO A LA NUEVA VERSION DE FIGMA 
// - MEJORAR EL VISUAL DE ESTA PAGINA, 
// - MEJORAR PARA CUANDO SE DEBE HACER EDITABLE (QUIZAS USAR DISABLED), AYUDARIA A PRESCINDIR DE EditableProfile
// - DEBERIA SER MAS GENERICA PUEDE MOSTRARSE UN MEDICO O UN PACIENTE SI JUEGAS CON EL ADMINSLICE (O DECIDE TU
// SI DESEAS HACER OTRO PROFILE)

// Simulamos los datos que vendrían del selector activeRegister
const mockProfileData = {
    nombre: "Juan Pérez",
    cedula: "1234567890",
    foto: "/placeholder.svg?height=200&width=200",
    disponibilidad: "Tiempo completo",
    especialidad: "Medicina General",
    fechaNacimiento: "15/05/1985",
    contacto: "+593 98 765 4321",
    direccion: "Av. 6 de Diciembre y Colón, Quito",
    formacionAcademica: [
        { titulo: "Doctorado en Medicina", institucion: "Universidad Central del Ecuador", año: "2010" },
        { titulo: "Especialización en Medicina Familiar", institucion: "Universidad San Francisco de Quito", año: "2012" }
    ],
    experienciaLaboral: [
        { cargo: "Médico General", institucion: "Hospital Metropolitano", periodo: "2012 - Presente" },
        { cargo: "Residente", institucion: "Clínica Internacional", periodo: "2010 - 2012" }
    ]
};

const ProfileContainer = styled(Box)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'row',
    minHeight: '92.3vh',
    [theme.breakpoints.down('md')]: {
        flexDirection: 'column',
    },
}));

const SideSection = styled(Box)(({ theme }) => ({
    width: '340px',
    backgroundColor: '#80C9C2',
    padding: theme.spacing(3),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    [theme.breakpoints.down('md')]: {
        width: '90%',
        height: '87vh'
    },
}));

const MainSection = styled(Box)(({ theme }) => ({
    width: '1288.5px',
    backgroundColor: '#243E4C',
    padding: theme.spacing(3),
    color: 'white',
    [theme.breakpoints.down('md')]: {
        width: '100%',
        display: 'none',
    },
}));

const ProfileImage = styled('img')({
    width: '200px',
    height: '200px',
    borderRadius: '50%',
    marginBottom: '16px',
});

const InfoItem = styled(Box)({
    display: 'flex',
    justifyContent: 'space-between',
    width: '100%',
    gap: '30px',
    marginBottom: '18px',
    
});

export default function ProfileView() {
    const theme = useTheme();
    const navigate = useNavigate();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));
    const dispatch = useDispatch();

    const { activeRegister } = useSelector(state => state.admin);
    const handleEdit = () => {
        navigate('editar');
    }

    useEffect(() => {
      dispatch(changeUIStatus('below'));
      
    }, [])
    

    return (

        <Grid2 ml={{ xs: '0', sm: '240px' }}>
            <ProfileContainer>
                <MainSection>
                    {isMobile && (
                        <IconButton color="inherit" onClick={() => {/* Toggle visibility */ }}>
                            <SchoolIcon />
                        </IconButton>
                    )}
                    <Typography variant="h4" fontWeight="bold" mb={2}>
                        Formación Académica
                    </Typography>
                    {mockProfileData.formacionAcademica.map((item, index) => (
                        <Box key={index} mb={2}>
                            <Typography variant="h6">{item.titulo}</Typography>
                            <Typography variant="body1">{item.institucion}, {item.año}</Typography>
                        </Box>
                    ))}
                    <Typography variant="h4" fontWeight="bold" mt={4} mb={2}>
                        Experiencia Laboral
                    </Typography>
                    {mockProfileData.experienciaLaboral.map((item, index) => (
                        <Box key={index} mb={2}>
                            <Typography variant="h6">{item.cargo}</Typography>
                            <Typography variant="body1">{item.institucion}, {item.periodo}</Typography>
                        </Box>
                    ))}
                    <Box display="flex" justifyContent="flex-end" mt={4}>
                        <Button variant="contained" style={{ backgroundColor: '#43A65E' }}>
                            Registro Senescyt
                        </Button>
                    </Box>
                </MainSection>

                <SideSection>
                    <ProfileImage src={'/src/modules/admin/imgs/sampleprofile2.png'} alt="Foto de perfil" />
                    <Typography variant="h5" fontWeight="bold" mb={1}>
                        {activeRegister.nombres}
                    </Typography>
                    <Typography variant="body1" color="#4D4D4D" mb={2}>
                        {activeRegister.cedula}
                    </Typography>
                    <Divider style={{ width: '80%', margin: '16px 0' }} />
                    <Box width="100%">
                        <InfoItem>
                            <Typography variant="h7" fontWeight="bold">Disponibilidad:</Typography>
                            <Typography variant="body2">{activeRegister.disponibilidad}</Typography>
                        </InfoItem>
                        <InfoItem>
                            <Typography variant="h7" fontWeight="bold">Especialidad:</Typography>
                            <Typography variant="body2">{activeRegister.especialidad}</Typography>
                        </InfoItem>
                        <InfoItem>
                            <Typography variant="h7" fontWeight="bold">Fecha de nacimiento:</Typography>
                            <Typography variant="body2">{activeRegister.fechanac}</Typography>
                        </InfoItem>
                        <InfoItem>
                            <Typography variant="h7" fontWeight="bold">Contacto:</Typography>
                            <Typography variant="body2">{activeRegister.contacto}</Typography>
                        </InfoItem>
                        <InfoItem>
                            <Typography variant="h7" fontWeight="bold">Dirección:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</Typography>
                            <Typography variant="body2">{activeRegister.direccion}</Typography>
                        </InfoItem>
                    </Box>
                    <Button variant="contained" color="primary" onClick={handleEdit} style={{ marginTop: '24px' }}>
                        Editar
                    </Button>
                </SideSection>
            </ProfileContainer>
        </Grid2>
    );
}

