import tripListerReducer from './tripListerReducer';
import { $$initialState as $$tripListerState } from './tripListerReducer';

export default {
  $$tripListerStore: tripListerReducer,
};

export const initialStates = {
  $$tripListerState,
};
