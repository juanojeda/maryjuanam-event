import { all } from 'redux-saga/effects'

import placeholder from './placeholder/sagas'

function* rootSaga() {
  yield all([placeholder])
}

export default rootSaga
