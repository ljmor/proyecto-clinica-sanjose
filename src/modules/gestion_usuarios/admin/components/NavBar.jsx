import React from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  InputBase,
  IconButton,
  Box,
  styled,
  Avatar,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { ArrowBackIos, SearchRounded } from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { changeUIStatus } from '../../../../store_general/ui/uiSlice';

const Search = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '19px',
  backgroundColor: '#D8EBE6',
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '68%',
  height: '30px',
  display: 'flex',
  justifyContent: 'space-around',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 2),
    paddingRight: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

export const NavBar = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.ui);

  const handleBack = () => {
    dispatch(changeUIStatus('base'))
    navigate(-1);
  }


  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: 'white',
        color: 'black',
        boxShadow: '0px 4px 7.2px 0px rgba(0, 0, 0, 0.25)',
        width: { xs: '100%', sm: 'calc(100% - 240px)' },
        height: '75px',
        display: 'flex',
        justifyContent: 'center',
      }}
    >
      <Toolbar>

        {
          (status === 'below') &&
          <IconButton
            edge='end'
            className='animate__animated animate__slideInLeft animate__fast'
            sx={{
              mr: { xs: '0', sm: '5px' },
              ml: { xs: '48px', sm: '0' }
            }}
            onClick={handleBack}
          >
            <ArrowBackIos sx={{ color: 'initial' }} />
          </IconButton>
        }

        <Typography
          variant="h6"
          noWrap
          component="div"
          className={(status === 'below') ? 'animate__animated animate__slideInLeft animate__faster' : 'animate__animated animate__slideInRight animate__faster'}
          sx={{
            display: { xs: 'none', sm: 'block' },
            fontStyle: 'normal',
            fontSize: '22px',
            fontWeight: '600',
            lineHeight: 'normal'
          }}
        >
          Hola, Luis
        </Typography>

        <Box sx={{ flexGrow: 1 }} />

        <Search>
          <StyledInputBase
            placeholder="Buscar"
            inputProps={{ 'aria-label': 'search' }}
          />
          <SearchRounded sx={{ alignSelf: 'center', mr: '15px' }} />
        </Search>

        <IconButton
          size="large"
          edge="end"
          color="inherit"
          sx={{
            width: '45px',
            height: '45px',
            padding: 0,
            boxShadow: '0px 4px 8.9px 0px rgba(0, 0, 0, 0.25)',
            mr: '5px'
          }}
        >
          <Avatar
            src='/src/modules/gestion_usuarios/admin/imgs/sampleprofpic.png'
            alt="Foto de perfil"
            sx={{
              width: '100%',
              height: '100%',
            }}
          />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}