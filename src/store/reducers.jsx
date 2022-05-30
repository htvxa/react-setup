/**
 * Combine all reducers in this file and export the combined reducers.
 */

import { combineReducers } from '@reduxjs/toolkit';
/**
 * Merges the main reducer with the router state and dynamically injected reducers
 */
export function createReducer(injectedReducers) {
  if (!injectedReducers || Object.keys(injectedReducers).length === 0) {
    return (state) => state;
  }
  return combineReducers({
    ...injectedReducers,
  });
}
