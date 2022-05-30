/**
 * Create the store with dynamic reducers
 */
import { configureStore } from '@reduxjs/toolkit';
import { createInjectorsEnhancer } from 'redux-injectors';
import createSagaMiddleware from 'redux-saga';
import { createReducer } from './reducers';

const reduxSagaMonitorOptions = {};
const sagaMiddleware = createSagaMiddleware(reduxSagaMonitorOptions);
const runSaga = sagaMiddleware.run;
const middlewares = [sagaMiddleware];
const enhancers = [
  createInjectorsEnhancer({
    createReducer,
    runSaga,
  }),
];
export const store = configureStore({
  reducer: createReducer(),
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(middlewares),
  devTools:
    process.env.NODE_ENV !== 'production' || process.env.PUBLIC_URL.length > 0,
  enhancers,
  preloadedState: {},
});
