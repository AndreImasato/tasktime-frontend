import React from 'react';

// Custom imports
import withLayout from 'src/hoc/withLayout';
import withReducer from 'src/hoc/withReducer';
import reducer from 'src/store/slices/projects';

// Custom components
import {
  ProjectForm,
  ProjectInformation
} from 'src/components/tasktime/projects';


const Project = (props) => {
  return (
    <div
      style={{
        marginTop: 10,
        marginLeft: 100,
        marginRight: 100
      }}
    >
      {/* //TODO project information edit */}
      <ProjectInformation />
      {/* //TODO task list */}
      {/* //TODO task add button */}
      {/* //TODO task add dialog */}
    </div>
  )
}

export default withLayout(withReducer('tasktime', reducer)(Project));