import { put, takeEvery } from 'redux-saga/effects';

import { someAction3, someAction4 } from './reducer';

function* doSomething(action) {
  yield put(someAction4(action.payload));
}
export default function* saga() {
  yield takeEvery(someAction3.type, doSomething);
}
