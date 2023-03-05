import React, { useState, useEffect, useRef } from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import _ from 'lodash';

// MUI imports
import { 
  Button,
  Box,
  TextField,
  Grid,
} from '@mui/material'

// Reducer imports
import { setIsModalOpen, addProject, selectProjects, patchProject } from 'src/store/slices/projects/projectsSlice';

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
  const projects = useSelector(selectProjects);
  const [ isEditing, setIsEditing ] = useState(false);
  const [ initialValues, setInitialValues ] = useState({
    name: '',
    description: ''
  })

  useEffect(() => {
    if (params.projectId){
      setIsEditing(true);
      const project = _.filter(projects, (proj) => {
        return proj.public_id === params.projectId
      })[0];
      if (project) {
        setInitialValues({
          name: project.name,
          description: project.description
        });
        if (formikRef){
          formikRef.current.setFieldValue('name', project.name);
          formikRef.current.setFieldValue('description', project.description);
        }
      }
    } else {
      setIsEditing(false);
    }
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
          const payload = {
            public_id: params.projectId,
            data: values
          };
          dispatch(patchProject(payload));
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
              marginTop: isEditing ? 1 : 2,
            }}
          >
            <Grid item>
              {isEditing
                ? null
                : (
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
                )
              }
            </Grid>
            <Grid item>
              <Button
                disabled={isDirty || !isValid}
                variant="contained"
                onClick={handleSubmit}
              >
                {isEditing ? "Atualizar" : "Adicionar"}
              </Button>
            </Grid>
          </Grid>
        </Box>
      )}
    </Formik>
  )
}

export default ProjectForm;