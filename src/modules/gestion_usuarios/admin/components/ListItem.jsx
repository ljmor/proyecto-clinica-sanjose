import React from 'react';
import { TableRow, TableCell, IconButton } from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from 'react-redux';
import { startDeleteRegister, startSetActiveRegister } from '../../store/admin/thunks';
import { useNavigate } from 'react-router-dom';
import { changeUIStatus } from '../../../../store_general/ui/uiSlice';

export const ListItem = ({ id, nombres, especialidad, cedula, contacto, doctor, email, npacientes, disponibilidad }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSelectItem = () => {
    dispatch(startSetActiveRegister(doctor));
    dispatch(changeUIStatus('below'))
    navigate('perfil');
  }

  const handleDeleteItem = () => {
    dispatch(startDeleteRegister(id));
  }

  return (
    <TableRow>
      <TableCell>{id}</TableCell>
      <TableCell>{nombres}</TableCell>
      <TableCell>{especialidad}</TableCell>
      <TableCell>{cedula}</TableCell>
      <TableCell>{email}</TableCell>
      <TableCell>{disponibilidad}</TableCell>
      <TableCell>{npacientes}</TableCell>
      <TableCell>{contacto}</TableCell>
      <TableCell>
        <div style={{ display: 'flex', gap: '8px' }}>
          <IconButton 
            size="small" 
            color="primary" 
            onClick={handleSelectItem}
          >
            <ArrowForwardIcon />
          </IconButton>
          <IconButton 
            size="small" 
            color="error" 
            onClick={handleDeleteItem}
          >
            <DeleteIcon />
          </IconButton>
        </div>
      </TableCell>
    </TableRow>
  );
};