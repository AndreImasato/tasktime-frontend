import React from 'react';

// Custom imports
import withLayout from 'src/hoc/withLayout';
import withReducer from 'src/hoc/withReducer';
import reducer from 'src/store/slices/projects';

const Task = (props) => {
  return (
    <div
      style={{
        marginTop: 10,
        marginLeft: 100,
        marginRight: 100
      }}
    >
      Task
    </div>
  )
}

export default withLayout(withReducer('tasktime', reducer)(Task));