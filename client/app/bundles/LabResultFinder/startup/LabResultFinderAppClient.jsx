import React from 'react';
import { Provider } from 'react-redux';
import 'babel-polyfill';

import createStore from '../store/labResultFinderStore';
import LabResultApp from '../containers/LabResultApp';

// See documentation for https://github.com/reactjs/react-redux.
// This is how you get props from the Rails view into the redux store.
// This code here binds your smart component to the redux store.
export default (props) => {
  const store = createStore(props);
  const reactComponent = (
    <Provider store={store}>
      <LabResultApp />
    </Provider>
  );
  return reactComponent;
};
