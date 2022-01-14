import { call, put, takeEvery, takeLatest } from 'redux-saga/effects'
import { fetchUserApi } from './actions/user'
import {  PayloadAction } from '@reduxjs/toolkit'

// worker Saga: will be fired on USER_FETCH_REQUESTED actions
function* fetchUser(action) {
   try {
      const user = yield call(fetchUserApi, action.payload.userId);
      console.log("userId: ", action.payload.userId)
      console.log(user)
      yield put({type: "USER_FETCH_SUCCEEDED", user: user});
   } catch (e) {
      yield put({type: "USER_FETCH_FAILED", message: e.message});
   }
}

function* log(action){
  console.log("log: ", action)
  // yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

/*
  Starts fetchUser on each dispatched `USER_FETCH_REQUESTED` action.
  Allows concurrent fetches of user.
*/
function* mySaga() {
  yield takeEvery("*", log);
}

/*
  Alternatively you may use takeLatest.

  Does not allow concurrent fetches of user. If "USER_FETCH_REQUESTED" gets
  dispatched while a fetch is already pending, that pending fetch is cancelled
  and only the latest one will be run.
*/
// function* mySaga() {
//   yield takeLatest("USER_FETCH_REQUESTED", fetchUser);
// }



export default mySaga;