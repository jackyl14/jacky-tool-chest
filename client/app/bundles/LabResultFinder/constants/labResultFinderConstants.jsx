import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'LAB_RESULT_ARRAY_UPDATE',
  'LAB_RESULT_ARRAY_FIND',
  'FINDER_INPUT_ID_UPDATE',
  'FINDER_INPUT_ERROR_UPDATE',
  'FINDER_INPUT_IS_SEARCHING_UPDATE',
  'MODAL_IS_OPENED_UPDATE',
  'MODAL_IS_UPLOADING_UPDATE',
  'MODAL_FILE_NAME_UPDATE',
]);

export default actionTypes;
