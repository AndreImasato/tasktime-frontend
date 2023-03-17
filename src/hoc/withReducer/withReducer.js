import { injectReducer } from 'src/store/index';


const withReducer = (key, reducer) => (Component) => {
  injectReducer(key, reducer);
  return (props) =>
    <Component {...props} />;
}

export default withReducer;