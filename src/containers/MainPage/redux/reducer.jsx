/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { initialState } from './initialState';

export const REDUCER_KEY = 'mainpage';

const reducer = createSlice({
  name: REDUCER_KEY,
  initialState,
  reducers: {
    someAction3: (state) => {},
    someAction4: (state, action) => {
      state.value2 += 1;
    },
  },
});
export const { someAction3, someAction4 } = reducer.actions;
export default reducer;

/** `
 * Example Usage:
 *
 * export function MyComponentNeedingThisSlice() {
 *  const { actions } = useHomepageSlice();
 *
 *  const onButtonClick = (evt) => {
 *    dispatch(actions.someAction());
 *   };
 * }
 */
