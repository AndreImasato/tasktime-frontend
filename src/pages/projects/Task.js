import React from 'react';

// Custom imports
import withLayout from 'src/hoc/withLayout';
import withReducer from 'src/hoc/withReducer';
import reducer from 'src/store/slices/projects';

// Custom components
import { TaskInformation } from 'src/components/tasktime/tasks';

const Task = (props) => {
  return (
    <div
      style={{
        marginTop: 10,
        marginLeft: 100,
        marginRight: 100
      }}
    >
      {/* //TODO Task information accordion  */}
      <TaskInformation />
      {/* //TODO add button + cycle form */}
      {/* //TODO cycles list */}
      {/* //TODO total duration */}
    </div>
  )
}

export default withLayout(withReducer('tasktime', reducer)(Task));