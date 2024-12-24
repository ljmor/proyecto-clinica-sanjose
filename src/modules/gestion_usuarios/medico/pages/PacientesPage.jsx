import React, { useEffect, useState } from "react";
import {
  Box,
  Typography,
  Container,
  useMediaQuery,
  useTheme,
  Grid2,
  Divider,
} from "@mui/material";
import { PacienteCard } from "../components/PacienteCard";
import { FilterPacientes } from "../components/FilterPacientes";

const resp = {
  results: [
    { id: 7, nombres: 'Oliver Saraguro', email: 'johndoe@example.com', tipo_sangre: 'A+', sexo: 'Masculino', ult_adm: '2020-01-10', cedula: '56456465', fechanac: '01/01/2004', edad: '18' },
    { id: 8, nombres: 'Renato Rojas', email: 'johndoe@example.com', tipo_sangre: 'AB+', sexo: 'Femenino', ult_adm: '2024-10-05', cedula: '1212213', fechanac: '01/01/2004', edad: '60' },
    { id: 9, nombres: 'Juan García', email: 'johndoe@example.com', tipo_sangre: 'B-', sexo: 'Masculino', ult_adm: '2023-10-05', cedula: '1321231', fechanac: '01/01/2004', edad: '36' },
  ],
};

export const PacientesPage = () => {
  const theme = useTheme();
  const [filteredList, setFilteredList] = useState([]);
  const originalData = resp.results || [];
    
  useEffect(() => {
    setFilteredList(originalData);
  }, [originalData]);
    

  const handleFilter = (filters) => {
    const { cedula, nombre, fechain, fechafin, sexo, edad, tipo_sangre } = filters;

    const filtered = originalData.filter((item) => {
      const itemDate = new Date(item.ult_adm);
      const startDate = fechain ? new Date(fechain) : null;
      const endDate = fechafin ? new Date(fechafin) : null;

      const matchesCedula = cedula ? item.cedula.includes(cedula) : true;
      const matchesNombre = nombre ? item.nombres.toLowerCase().includes(nombre.toLowerCase()) : true;
      const matchesSexo = sexo ? item.sexo === sexo : true;
      const matchesEdad = edad ? parseInt(item.edad, 10) === parseInt(edad, 10) : true;
      const matchesTipoSangre = tipo_sangre ? item.tipo_sangre.toLowerCase().includes(tipo_sangre.toLowerCase()) : true;
      const matchesStartDate = startDate ? itemDate >= startDate : true;
      const matchesEndDate = endDate ? itemDate <= endDate : true;

      return matchesCedula && matchesNombre && matchesSexo && matchesEdad && matchesTipoSangre && matchesStartDate && matchesEndDate;
    });

    setFilteredList(filtered);
  };

  const renderCards = () =>
    filteredList
      .map((paciente) => (
        <Grid2 item xs={12} sm={6} md={4} key={paciente.id} className="animate__animated animate__fadeIn">
          <PacienteCard paciente={paciente} />
        </Grid2>
      ));

  console.log(filteredList)

  return (
    <Box
      sx={{
        minHeight: '100vh',
        backgroundColor: '#ffffff',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '-50px',
          left: '-50px',
          width: '200px',
          height: '200px',
          backgroundColor: 'rgba(0, 77, 64, 0.1)',
          borderRadius: '50%',
          zIndex: 0,
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          bottom: '-50px',
          right: '-50px',
          width: '300px',
          height: '300px',
          backgroundColor: 'rgba(0, 105, 92, 0.1)',
          borderRadius: '50%',
          zIndex: 0,
        }
      }}
    >
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1 }}>
        <Box py={4}>
          <Typography variant="h2" sx={{ mb: 1, fontWeight: "bold", color: "#004d40" }}>
            Pacientes Registrados
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 4, color: "#00695c" }}>
            Escoge tu paciente o búscalo por su número de cédula
          </Typography>

          <Divider sx={{ mb: 4 }} />

          <Grid2 container spacing={3}>
            <Grid2 item size={{ xs: 12, md: 9 }}>
              <Typography variant="h5" sx={{ mb: 2, color: "#004d40", fontWeight: "bold" }}>
                Mis Pacientes
              </Typography>
              <Grid2 container spacing={3}>
                {renderCards()}
              </Grid2>
            </Grid2>

            <Grid2
              item
              size={{ xs: 12, md: 3 }}
              className="animate__animated animate__slideInRight"
            >
              <Box sx={{ position: "sticky", top: "20px" }}>
                <FilterPacientes onFilter={handleFilter} />
              </Box>
            </Grid2>
          </Grid2>
        </Box>
      </Container>
    </Box>
  );
};