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
} from '@mui/material';

// Reducer imports
import { setIsModalOpen, addTask, selectAllTasks, patchTask } from 'src/store/slices/projects/tasksSlice';
import { selectProjectById } from 'src/store/slices/projects/projectsSlice';


const validationSchema = yup.object().shape({
  name: yup
    .string()
    .max(100, "Máximo de 100 caracteres")
    .required("Campo Obrigatório: Informe o nome da tarefa!"),
  description: yup
    .string()
});

const initialValues = {
  name: '',
  description: ''
}

const TaskForm = (props) => {
  const dispatch = useDispatch();
  const formikRef = useRef();
  const params = useParams();
  const project = useSelector((state) => selectProjectById(state, params.projectId));
  const allTasks = useSelector(selectAllTasks);

  const [ isEditing, setIsEditing ] = useState(false);

  useEffect(() => {
    if (params.taskId){
      // is editing
      setIsEditing(true);
      const task = _.filter(allTasks, { public_id: params.taskId })[0];
      if (task){ 
        if (formikRef){
          formikRef.current.setFieldValue('name', task.name);
          formikRef.current.setFieldValue('description', task.description);
        }
      }
    } else {
      setIsEditing(false);
    }
  }, [params]);
  
  const handleCancelClick = () => {
    dispatch(setIsModalOpen(false));
  }
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      innerRef={formikRef}
      onSubmit={(values) => {
        if (isEditing){
          const payload = {
            public_id: params.taskId,
            data: values,
          }
          dispatch(patchTask(payload));
        } else {
          const payload = values;
          payload['project'] = project.id;
          dispatch(addTask(values));
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
            label="Nome da tarefa"
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

export default TaskForm;