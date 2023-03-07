import React, { useState, useEffect, useRef} from 'react';
import { Formik } from 'formik';
import * as yup from 'yup';
import { motion } from 'framer-motion';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import "moment/locale/pt-br";

// MUI imports
import { 
  Grid,
  Button,
  IconButton,
  Tooltip,
  Box,
  TextField
} from '@mui/material';
import { LocalizationProvider } from '@mui/x-date-pickers';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// Reducer imports
import { setIsAdding, addCycle, setSelectedCycle, patchCycle } from 'src/store/slices/projects/cyclesSlice';
import { selectTaskById } from 'src/store/slices/projects/tasksSlice';

const initialValues = {
  'dt_start': moment(new Date()).format('YYYY-MM-DD HH:mm'),
  'dt_end': moment(new Date()).add(1, 'hours').format('YYYY-MM-DD HH:mm'),
}

const validationSchema = yup.object().shape({
  dt_start: yup
    .string()
    .required("Campo Obrigatório: Selecione a data de início"),
  dt_end: yup
    .string()
});

const CycleForm = (props) => {
  const dispatch = useDispatch();
  const { selectedCycle } = useSelector(({ tasktime }) => tasktime.cycles);
  const params = useParams();
  const task = useSelector((state) => selectTaskById(state, params.taskId));
  const formikRef = useRef();

  useEffect(() => {
    if (selectedCycle){
      const dt_start = moment(new Date(selectedCycle.dt_start)).format('YYYY-MM-DD HH:mm');
      const dt_end = moment(new Date(selectedCycle.dt_end)).format('YYYY-MM-DD HH:mm');
      formikRef.current.setFieldValue('dt_start', dt_start);
      formikRef.current.setFieldValue('dt_end', dt_end);
    }
  }, [selectedCycle]);

  return (
    <>
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      innerRef={formikRef}
      onSubmit={(values) => {
        if (selectedCycle) {
          //TODO patch the cycle
          const payload = {
            public_id: selectedCycle.public_id,
            data: {...values}
          };
          dispatch(patchCycle(payload));
        } else {
          const payload = {...values};
          payload['task'] = task.id;
          dispatch(addCycle(payload));
        }
        dispatch(setIsAdding(false));
        dispatch(setSelectedCycle(null));
      }}
    >
      {({ errors, handleBlur, handleSubmit, values, setFieldValue, isValid, isDirty }) => (
        <>
          <Grid 
            item
            xs={11} md={11} xl={11}
          >
            <motion.div
              initial={{ x: 100 }}
              animate={{ x: 0 }}
            >
              <LocalizationProvider dateAdapter={AdapterMoment} adapterLocale="pt-br">
                <Grid 
                  container 
                  component="form"
                  onSubmit={handleSubmit}
                  spacing={2}
                >
                  <Grid item>
                    <MobileDateTimePicker
                      name="dt_start"
                      label="Data de início"
                      handleBlur={handleBlur('dt_start')}
                      value={moment(values.dt_start, 'YYYY-MM-DD HH:mm')}
                      onChange={(val) => {
                        setFieldValue('dt_start', val.format('YYYY-MM-DD HH:mm'))
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <MobileDateTimePicker
                      name="dt_end"
                      label="Data de término"
                      value={moment(values.dt_end, 'YYYY-MM-DD HH:mm').utcOffset('-03:00')}
                      onChange={(val) => {
                        setFieldValue('dt_end', val.utc().format('YYYY-MM-DD HH:mm'))
                      }}
                      minDateTime={moment(values.dt_start, 'YYYY-MM-DD HH:mm')}
                    />
                  </Grid>
                </Grid>
              </LocalizationProvider>
            </motion.div>
          </Grid>
          <Grid 
            item
            container
            xs={1} md={1} xl={1}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1}}
            >
              <Tooltip title="Cancelar">
                <IconButton
                  onClick={() => {
                    dispatch(setIsAdding(false));
                    dispatch(setSelectedCycle(null));
                  }}
                >
                  <HighlightOffIcon color="error" />
                </IconButton>
              </Tooltip>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1}}
            >
              <Tooltip title="Adicionar">
                <IconButton
                  disabled={!isValid || isDirty}
                  onClick={handleSubmit}
                >
                  <CheckCircleOutlineIcon color="success" />
                </IconButton>
              </Tooltip>
            </motion.div>
          </Grid>
        </>
        )}
      </Formik>
    </>
  )
}

export default CycleForm;