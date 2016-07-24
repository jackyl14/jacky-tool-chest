import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'TRIPS_ARRAY_UPDATE',
  'TRIPS_ARRAY_REQUEST',
  'TRIPS_ARRAY_REQUEST_ERROR_LOG',
  'TRIPS_ARRAY_RECEIVE',
]);

export default actionTypes;
