/* eslint-disable @typescript-eslint/no-explicit-any */
import { compose } from 'redux';
import { injectReducer, injectSaga } from 'redux-injectors';

export function withReducerSaga(reducer, saga, ...rest) {
  const key = reducer.name;
  const args = [
    ...rest,
    injectReducer({ key, reducer: reducer.reducer }),
    injectSaga({ key, saga }),
  ].filter(Boolean);
  return compose(...args);
}
