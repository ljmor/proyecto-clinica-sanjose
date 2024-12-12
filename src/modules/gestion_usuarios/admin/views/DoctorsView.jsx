import React, { useEffect, useState } from 'react';
import {
    Box,
    Button,
    IconButton,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from '@mui/material';
import { Tune } from '@mui/icons-material';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch, useSelector } from 'react-redux';
import { startLoadingRegisters } from '../../store/admin/thunks';
import { useNavigate } from 'react-router-dom';
import { ListItem } from '../components/ListItem';

const tableHeaders = [
    { name: 'ID' },
    { name: 'Nombres' },
    { name: 'Especialidad' },
    { name: 'Cedula' },
    { name: 'Email' },
    { name: 'Disponibilidad' },
    { name: 'N° Pacientes' },
    { name: 'Contacto' },
];

export const DoctorsView = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate()

    const [doctors, setDoctors] = useState();
    const { resp, isLoading, activeRegister } = useSelector(state => state.admin)

    useEffect(() => {
        dispatch(startLoadingRegisters('doctors'));
    }, [])

    useEffect(() => {
        setDoctors(resp.results)
    }, [resp.results])

    const handleAdd = () => {
        navigate('crear')
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '300px',
                padding: '16px',
                ml: { xs: '0', sm: '240px' },
                flexDirection: 'column',
                height: 'calc(100vh - 100px)'
            }}
        >
            {/* Boton filtro */}
            <Box sx={{ margin: { xs: '20px 10px', lg: '20px 190px' }, alignSelf: 'end' }} >
                <Button
                    sx={{
                        width: '130px',
                        height: '37px',
                        color: '#fff',
                        borderRadius: '44px',
                        backgroundColor: '#098280',
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        p: '0 20px',
                        textTransform: 'capitalize',
                        fontSize: '14px',
                        fontWeight: '500px'
                    }}
                >
                    Filtrar
                    <Tune />
                </Button>
            </Box>

            {/* Listado */}
            <Paper
                elevation={3}
                sx={{
                    width: '90%',
                    maxWidth: '1200px',
                    height: '550px',
                    borderRadius: '6px',
                    padding: { xs: '30px 16px', md: '35px 30px' },
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                    mt: '15px',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center',
                    alignItems: 'center',
                }}
            >
                <Box sx={{ width: '100%', overflow: 'auto' }}>
                    <TableContainer>
                        {isLoading ? (
                            <Box
                                display="flex"
                                justifyContent="center"
                                alignItems="center"
                                height="300px"
                            >
                                <img src="/src/assets/imgs/loading.gif" width='40px' alt="Cargando" />
                            </Box>
                        ) : (
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        {tableHeaders.map((header, index) => (
                                            <TableCell
                                                key={index}
                                                align={index === tableHeaders.length - 1 ? 'center' : 'left'}
                                            >
                                                <Typography variant="subtitle2" fontWeight="bold">
                                                    {header.name}
                                                </Typography>
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                </TableHead>

                                <TableBody>
                                    {doctors?.map((doctor) => (
                                        <ListItem
                                            key={doctor.id}
                                            id={doctor.id}
                                            nombres={doctor.nombres}
                                            especialidad={doctor.especialidad}
                                            cedula={doctor.cedula}
                                            contacto={doctor.contacto}
                                            email={doctor.email}
                                            disponibilidad={doctor.disponibilidad}
                                            npacientes={doctor.nropacientes}
                                            doctor={doctor}
                                        />
                                    ))}
                                </TableBody>
                            </Table>
                        )}
                    </TableContainer>
                </Box>
            </Paper>

            {/* Añadir un nuevo registro */}
            <Box
                sx={{
                    position: 'fixed',
                    bottom: '0',
                    right: '0',
                    mr: '35px',
                    mb: '35px',
                }}
            >
                <IconButton
                    size="large"
                    onClick={handleAdd}
                    sx={{
                        width: '73px',
                        height: '73px',
                        backgroundColor: 'white',
                        boxShadow: '0px 3px 5px -1px rgba(0,0,0,0.2), 0px 6px 10px 0px rgba(0,0,0,0.14), 0px 1px 18px 0px rgba(0,0,0,0.12)',
                        '&:hover': {
                            backgroundColor: '#f5f5f5',
                        },
                        position: 'fixed',
                        bottom: '25px',
                        right: '25px',
                    }}
                    aria-label="add"
                >
                    <AddIcon fontSize="large" sx={{ color: '#43483A' }} />
                </IconButton>
            </Box>
        </Box>
    );
}

