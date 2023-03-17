import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import _ from 'lodash';

// MUI imports
import { 
  Grid,
  Typography
} from '@mui/material'

// Reducers
import { selectProjects } from 'src/store/slices/projects/projectsSlice';

// Custom Components
import ProjectItem from './ProjectItem';

const ProjectsList = (props) => {
  const projects = useSelector(selectProjects);
  const { searchText } = useSelector(({ tasktime }) => tasktime.projects);
  const [filteredData, setFilteredData] = useState([]);

  useEffect(() => {
    const getFilteredArray = (entities, searchText) => {
      if (searchText === ''){
        return entities;
      }
      return _.filter(entities, (item) => {
        return item.name.toLowerCase().includes(searchText.toLowerCase())
      })
    }
    if (projects){
      setFilteredData(getFilteredArray(projects, searchText));
    }
  }, [searchText, projects]);
  

  return (
    <Grid item xs={12} md={12} lg={12} sx={{ width: "100%", height: "100%", marginTop: 10 }}>
      <motion.div
        initial={{ opacity: 0, scale: 0.6 }}
        animate={{ opacity: 1, scale: 1 }}
        style={{ height: "100%", width: "100%" }}
      >
        <Grid 
          container 
          spacing={{ xs: 2, md: 3 }}
          column={{ xs: 4, sm: 8, md: 12 }}
        >
          {filteredData.length === 0
            ? (<Typography variant="h6" sx={{ textAlign: "center", color: (theme) => theme.palette.grey[600] }}>Nenhum projeto para ser exibido</Typography>)
            : filteredData.map(proj => (
              <ProjectItem key={proj.public_id} project={proj} />
            ))
          }
          
        </Grid>
      </motion.div>
    </Grid>
  )
}

export default ProjectsList;