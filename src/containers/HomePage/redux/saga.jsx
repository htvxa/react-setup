import { put, takeEvery } from 'redux-saga/effects';

import { someAction, someAction2 } from './reducer';

function* doSomething(action) {
  yield put(someAction2(action.payload));
}
export default function* saga() {
  yield takeEvery(someAction.type, doSomething);
}
