import mirrorCreator from 'mirror-creator';

const actionTypes = mirrorCreator([
  'INPUT_STRING_UPDATE',
  'INPUT_ERROR_UPDATE',
  'STAGE_INDEX_UPDATE',
  'SPLIT_STRING_ARRAY_UPDATE',
  'SPLIT_STRING_ARRAY_ENTRY_UPDATE',
  'DELETE_KEY_ADD',
  'DELETE_KEY_REMOVE',
  'ERROR_BANK_UPDATE',
  'ERROR_BANK_ENTRY_REMOVE',
  'EDIT_DIALOG_UPDATE',
  'EDIT_DIALOG_ENTRY_VALUE_UPDATE',
  'EDIT_DIALOG_ENTRY_ERROR_UPDATE',
  'EDIT_DIALOG_ERROR_MESSAGES_UPDATE',
  'TAB_VALUE_UPDATE',
  'QURI_UPLOAD_REQUEST',
  'QURI_UPLOAD_RECEIVE',
  'QURI_UPLOAD_DATA_LOG',
  'QURI_UPLOAD_ERROR_LOG',
]);

export default actionTypes;