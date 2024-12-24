import React, { useState, useEffect } from "react";
import {
  Modal,
  Box,
  Typography,
  Button,
  ClickAwayListener,
} from "@mui/material";
import { styled } from "@mui/system";
import { motion, AnimatePresence } from "framer-motion";
import { useSelector } from "react-redux";

const StyledModal = styled(Modal)({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  backdropFilter: "blur(5px)",
});

const ModalContent = styled(Box)({
  backgroundColor: "#ffffff",
  borderRadius: "15px",
  boxShadow: "0 8px 32px 0 rgba(0, 0, 0, 0.37)",
  padding: "55px",
  outline: "none",
  width: "360px",
  maxWidth: "400px",
  position: "relative",
  overflow: "hidden",
});

const CustomSelect = styled(Box)({
  position: "relative",
  marginBottom: "24px",
});

const SelectHeader = styled(Box)({
  padding: "12px 16px",
  border: "2px solid #004d40",
  borderRadius: "28px",
  cursor: "pointer",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  transition: "all 0.3s ease",
  "&:hover": {
    backgroundColor: "rgba(0, 77, 64, 0.05)",
  },
});

const OptionsList = styled(motion.ul)({
  listStyle: "none",
  padding: 0,
  margin: "8px 0 0 0",
  borderRadius: "10px",
  overflow: "hidden",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
  fontFamily: "Arial",
  backgroundColor: "#ffffff",
});

const Option = styled(motion.li)({
  padding: "12px 16px",
  cursor: "pointer",
  transition: "all 0.2s ease",
  backgroundColor: "#ffffff",
  "&:hover": {
    backgroundColor: "#e0f2f1",
    color: "#004d40",
  },
});

const initOpts = [
  "Ingreso Prehospitalario",
  "Tratamiento Médico",
  "Epicrisis",
  "Amnanesis",
  "Admisión - AltaEgreso",
  "Otro",
];

const FormTypeModal = ({ open, onClose, onSubmit }) => {
  const [formType, setFormType] = useState("");
  const { activeHistory } = useSelector((state) => state.history);
  const [options, setOptions] = useState(initOpts);
  const [isOpen, setIsOpen] = useState(false);

  // Filtrar opciones basadas en los formularios existentes
  useEffect(() => {
    if (activeHistory?.formularios) {
      const existingForms = activeHistory.formularios.map(
        (form) => form.nombre.split(".")[0] // Extraer el nombre sin la extensión
      );
      const filteredOptions = initOpts.filter(
        (option) => !existingForms.includes(option)
      );
      setOptions(filteredOptions);
    }
  }, [activeHistory]);

  const handleSubmit = () => {
    onSubmit(formType);
    setFormType("");
    onClose();
  };

  const handleClose = () => {
    setFormType("");
    onClose();
  };

  return (
    <StyledModal open={open} onClose={onClose} closeAfterTransition>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          >
            <ModalContent>
              <Typography
                variant="h5"
                component="h2"
                sx={{ mb: 0, color: "#004d40", fontWeight: "bold" }}
              >
                Crear nuevo formulario
              </Typography>
              <Typography variant="subtitle1" sx={{ mb: 3, color: "#004d40" }}>
                Escoge el tipo de formulario a crear
              </Typography>

              <CustomSelect>
                <ClickAwayListener onClickAway={() => setIsOpen(false)}>
                  <div>
                    <SelectHeader onClick={() => setIsOpen(!isOpen)}>
                      <Typography>
                        {formType || "Selecciona un tipo de formulario"}
                      </Typography>
                      <motion.div
                        animate={{ rotate: isOpen ? 180 : 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        ▼
                      </motion.div>
                    </SelectHeader>
                    <AnimatePresence>
                      {isOpen && (
                        <OptionsList
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                        >
                          {options.map((option) => (
                            <Option
                              key={option}
                              onClick={() => {
                                setFormType(option);
                                setIsOpen(false);
                              }}
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                            >
                              {option}
                            </Option>
                          ))}
                        </OptionsList>
                      )}
                    </AnimatePresence>
                  </div>
                </ClickAwayListener>
              </CustomSelect>
              <Box sx={{ display: "flex", justifyContent: "flex-end", gap: 2 }}>
                <Button
                  onClick={handleClose}
                  variant="outlined"
                  sx={{
                    color: "#004d40",
                    borderColor: "#004d40",
                    borderRadius: "20px",
                    "&:hover": {
                      backgroundColor: "rgba(0, 77, 64, 0.05)",
                    },
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  sx={{
                    bgcolor: "#004d40",
                    borderRadius: "20px",
                    "&:hover": { bgcolor: "#00695c" },
                  }}
                >
                  Crear
                </Button>
              </Box>
            </ModalContent>
          </motion.div>
        )}
      </AnimatePresence>
    </StyledModal>
  );
};

export default FormTypeModal;
