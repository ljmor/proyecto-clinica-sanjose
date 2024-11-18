import React, { useState } from 'react';
import {
    Box,
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
import VisibilityIcon from '@mui/icons-material/Visibility';
import DeleteIcon from '@mui/icons-material/Delete';
import { AddCircle } from '@mui/icons-material';

const tableHeaders = [
    'ID',
    'Nombres',
    'Especialidad',
    'Turno',
    'Disponibilidad',
    'Nro. Pacientes',
    'Acciones',
];

const initialDoctors = [
    { id: 1, nombres: 'Dr. Juan Pérez', especialidad: 'Cardiología', turno: 'Mañana', disponibilidad: 'Disponible', numPacientes: 15 },
    { id: 2, nombres: 'Dra. María López', especialidad: 'Pediatría', turno: 'Tarde', disponibilidad: 'No Disponible', numPacientes: 20 },
    { id: 3, nombres: 'Dr. Carlos Rodríguez', especialidad: 'Neurología', turno: 'Noche', disponibilidad: 'Disponible', numPacientes: 10 },
];

export const DoctorsView = () => {
    const [doctors, setDoctors] = useState(initialDoctors);

    const handleDelete = (id) => {
        setDoctors(doctors.filter(doctor => doctor.id !== id));
    };

    const handleAdd = () => {
        const newDoctor = {
            id: doctors.length + 1,
            nombres: `Dr. Nuevo ${doctors.length + 1}`,
            especialidad: 'Nueva Especialidad',
            turno: 'Mañana',
            disponibilidad: 'Disponible',
            numPacientes: 0,
        };
        setDoctors([...doctors, newDoctor]);
    };

    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '100vh',
                padding: '16px',
                ml: '240px',
                flexDirection: 'column'
            }}
        >
            <Paper
                elevation={3}
                sx={{
                    width: '100%',
                    maxWidth: '1300px',
                    borderRadius: '6px',
                    padding: { xs: '30px 16px', md: '65px 30px' },
                    boxShadow: '0px 4px 4px 0px rgba(0, 0, 0, 0.25)',
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Lista de Médicos
                </Typography>
                <TableContainer>
                    <Table sx={{ minWidth: 650 }} aria-label="tabla de médicos">
                        <TableHead>
                            <TableRow sx={{ backgroundColor: '#F8F8F8' }}>
                                {tableHeaders.map((header, index) => (
                                    <TableCell key={index} align={index === tableHeaders.length - 1 ? 'center' : 'left'}>
                                        <Typography variant="subtitle2" fontWeight="bold">
                                            {header}
                                        </Typography>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {doctors.map((doctor) => (
                                <TableRow key={doctor.id}>
                                    <TableCell>{doctor.id}</TableCell>
                                    <TableCell>{doctor.nombres}</TableCell>
                                    <TableCell>{doctor.especialidad}</TableCell>
                                    <TableCell>{doctor.turno}</TableCell>
                                    <TableCell>{doctor.disponibilidad}</TableCell>
                                    <TableCell>{doctor.numPacientes}</TableCell>
                                    <TableCell align="center">
                                        <IconButton aria-label="ver" size="small">
                                            <VisibilityIcon />
                                        </IconButton>
                                        <IconButton aria-label="eliminar" size="small" onClick={() => handleDelete(doctor.id)}>
                                            <DeleteIcon />
                                        </IconButton>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            <Box
                sx={{
                    position: 'fixed',
                    bottom: '0',
                    right: '0',
                    mr: '30px',
                    mb: '30px',
                }}
            >
                <IconButton size='large' onClick={handleAdd}>
                    <AddCircle fontSize='large' />
                </IconButton>
            </Box>
        </Box>
    );
}