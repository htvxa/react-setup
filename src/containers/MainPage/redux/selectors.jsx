import { createSelector } from '@reduxjs/toolkit';
import { initialState } from './initialState';
import { REDUCER_KEY } from './reducer';

const selectSlice = (state) => state[REDUCER_KEY] || initialState;
export const selectMainPage = createSelector([selectSlice], (state) => state);
