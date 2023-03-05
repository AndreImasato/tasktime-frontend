import React, { useState, useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';

// MUI imports
import { 
  Button,
  Box,
  TextField,
  Grid,
} from '@mui/material'

// Reducer imports
import { setIsModalOpen, addProject } from 'src/store/slices/projects/projectsSlice';

//TODO fields name (varchar); description (text)

const validationSchema = yup.object().shape({
  name: yup
    .string()
    .max(50, "Máximo de 50 caracteres")
    .required("Campo Obrigatório: Informe o nome do projeto"),
  description: yup
    .string()
});

const ProjectForm = (props) => {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const params = useParams();
  const [ isEditing, setIsEditing ] = useState(false);
  const [ initialValues, setInitialValues ] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    console.log(params)
    //TODO CHECK CURRENT LOCATION AND GET QUERY PARAMS
    //TODO IF THERE IS A PUBLIC ID, THAN IT IS A EDITTING DIALOG
      //TODO useSelector and fetch data from the public_id
      //TODO set values
      //TODO setIsEditing to true
    //TODO IF NOT, THAN IT IS AN ADD FORM
  }, []);

  const handleCancelClick = () => {
    dispatch(setIsModalOpen(false));
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      innerRef={formikRef}
      onSubmit={(values) => {
        if (isEditing) {
          //TODO case for when is editing form
        } else {
          dispatch(addProject(values));
          dispatch(setIsModalOpen(false));
        }
      }}
    >
      {({ errors, handleChange, handleBlur, handleSubmit, isValid, isDirty, values }) => (
        <Box 
          component="form"
          onSubmit={handleSubmit}
          sx={{ mt: 1 }}
        >
          <TextField
            fullWidth
            onChange={handleChange('name')}
            onBlur={handleBlur('name')}
            value={values.name}
            id="name"
            name="name"
            autoFocus
            error={!!errors?.name}
            helperText={errors?.name}
            variant="standard"
            label="Nome do projeto"
            size="small"
            margin="normal"
          />
          <TextField
            fullWidth
            onChange={handleChange('description')}
            onBlur={handleBlur('description')}
            value={values.description}
            id="description"
            name="description"
            autoFocus
            error={!!errors?.description}
            helperText={errors?.description}
            variant="standard"
            label="Descrição"
            multiline
            maxRows={3}
            margin="normal"
          />
          <Grid 
            container 
            spacing={3}
            sx={{
              justifyContent: 'flex-end',
              marginTop: 2,
            }}
          >
            <Grid item>
              <Button
                variant="outlined"
                onClick={handleCancelClick}
                sx={{
                  color: (theme) => theme.palette.grey[700],
                  borderColor: (theme) => theme.palette.grey[700],
                }}
              >
                Cancelar
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                onClick={handleSubmit}
              >
                Adicionar
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Formik>
  )
}

export default ProjectForm;