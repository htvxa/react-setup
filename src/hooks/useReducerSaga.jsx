import { useInjectReducer, useInjectSaga } from 'redux-injectors';

export const useInjectReducerSaga = (reducer, saga) => {
  useInjectReducer({ key: reducer.name, reducer: reducer.reducer });
  useInjectSaga({ key: reducer.name, saga });
  return null;
};
