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
  IconButton,
  Tooltip,
  Paper
} from '@mui/material';
import { MobileDateTimePicker } from '@mui/x-date-pickers/MobileDateTimePicker';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';

// Reducer imports
import { setIsAdding, addCycle, setSelectedCycle, patchCycle } from 'src/store/slices/projects/cyclesSlice';
import { selectTaskById } from 'src/store/slices/projects/tasksSlice';

const initialValues = {
  'dt_start': moment(new Date()).format('YYYY-MM-DD HH:mm'),
  'dt_end': null,
}

const validationSchema = yup.object().shape({
  dt_start: yup
    .string()
    .required("Campo Obrigatório: Selecione a data de início"),
  dt_end: yup
    .string()
    .nullable()
});

const CycleForm = (props) => {
  const dispatch = useDispatch();
  const { selectedCycle } = useSelector(({ tasktime }) => tasktime.cycles);
  const params = useParams();
  const task = useSelector((state) => selectTaskById(state, params.taskId));
  const formikRef = useRef();

  useEffect(() => {
    if (selectedCycle){
      formikRef.current.setFieldValue(
        'dt_start',
        moment(new Date(selectedCycle.dt_start)).format('YYYY-MM-DD HH:mm')
      );
      if (selectedCycle.dt_end){
        formikRef.current.setFieldValue(
          'dt_end',
          moment(new Date(selectedCycle.dt_end)).format('YYYY-MM-DD HH:mm')
        );
      } else {
        formikRef.current.setFieldValue(
          'dt_end', 
          null
        );
      }
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
                <Grid 
                  container 
                  component="form"
                  onSubmit={handleSubmit}
                  spacing={2}
                  sx={{
                    justifyContent: 'flex-end'
                  }}
                >
                  <Grid item>
                    <MobileDateTimePicker
                      name="dt_start"
                      label="Data de início"
                      handleBlur={handleBlur('dt_start')}
                      value={moment(values.dt_start, 'YYYY-MM-DD HH:mm')}
                      slotProps={{
                        shortcuts: {
                          items: [
                            {
                              label: "Agora",
                              getValue: () => {
                                return moment(new Date());
                              }
                            }
                          ]
                        }
                      }}
                      sx={{
                        backgroundColor: (theme) => theme.palette.common.white,
                      }}
                      onChange={(val) => {
                        setFieldValue('dt_start', val.format('YYYY-MM-DD HH:mm'))
                      }}
                    />
                  </Grid>
                  <Grid item>
                    <MobileDateTimePicker
                      name="dt_end"
                      label="Data de término"
                      value={moment(values.dt_end, 'YYYY-MM-DD HH:mm')}
                      slotProps={{
                        shortcuts: {
                          items: [
                            {
                              label: "Agora",
                              getValue: () => {
                                return moment(new Date());
                              }
                            }
                          ]
                        }
                      }}
                      sx={{
                        backgroundColor: (theme) => theme.palette.common.white,
                      }}
                      onChange={(val) => {
                        setFieldValue('dt_end', val.format('YYYY-MM-DD HH:mm'))
                      }}
                      minDateTime={moment(values.dt_start, 'YYYY-MM-DD HH:mm')}
                    />
                  </Grid>
                </Grid>
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