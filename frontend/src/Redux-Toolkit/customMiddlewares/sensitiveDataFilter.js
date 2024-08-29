// import { Middleware } from 'redux';
// import store from "../store/store.js";

// const sensitiveDataFilterMiddleware = (store) => (next) => (action) => {
  const sensitiveDataFilterMiddleware = ()=>(next) => (action) => {
    if (action.type === 'fetchToken/fulfilled') {
      const modifiedAction = {
        ...action,
        payload: {
          ...action.payload,
          email: '',
          password: '',
        },
      };
      return next(modifiedAction);
    }
  
    return next(action);
  };
  
  export default sensitiveDataFilterMiddleware;