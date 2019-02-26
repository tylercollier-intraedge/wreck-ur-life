import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';

const middleware = [reduxThunk];
const initialState = {};

const store = createStore(
  reducers,
  initialState,
  compose(
    applyMiddleware(...middleware)
    // Following line will break app if redux devtools is not installed
    // window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
);

export default store;
