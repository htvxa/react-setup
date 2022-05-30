/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit';
import { initialState, REDUCER_KEY } from './constants';

const reducer = createSlice({
  name: REDUCER_KEY,
  initialState,
  reducers: {
    someAction: (state) => {},
    someAction2: (state, action) => {
      state.value += 1;
    },
  },
});
export const { someAction, someAction2 } = reducer.actions;
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
