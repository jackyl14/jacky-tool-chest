import { compose, createStore, applyMiddleware, combineReducers } from 'redux';

// See
// https://github.com/gaearon/redux-thunk and http://redux.js.org/docs/advanced/AsyncActions.html
// This is not actually used for this simple example, but you'd probably want to use this
// once your app has asynchronous actions.
import thunkMiddleware from 'redux-thunk';

// This provides an example of logging redux actions to the console.
// You'd want to disable this for production.
import loggerMiddleware from 'lib/middlewares/loggerMiddleware';

import reducers from '../reducers';
import { initialStates } from '../reducers';

export default props => {
  const { environment } = props;
  const { $$tripListerState } = initialStates;

  // Redux expects to initialize the store using an Object, not an Immutable.Map
  const initialState = {
    $$tripListerStore: $$tripListerState,
  };

  const reducer = combineReducers(reducers);

  const productionStore = createStore(
    reducer,
    initialState,
    applyMiddleware(
      thunkMiddleware
    )
  );

  const developmentStore = createStore(
    reducer,
    initialState,
    applyMiddleware(
      thunkMiddleware,
      loggerMiddleware
    )
  );

  const composedStore = compose(
    applyMiddleware(thunkMiddleware, loggerMiddleware)
  );

  const store = (environment != "development") ? productionStore : developmentStore;

  return store;
};
