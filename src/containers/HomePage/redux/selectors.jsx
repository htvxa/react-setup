import { createSelector } from '@reduxjs/toolkit';
import { initialState, REDUCER_KEY } from './constants';

const selectSlice = (state) => state[REDUCER_KEY] || initialState;
export const selectHomepage = createSelector([selectSlice], (state) => state);
