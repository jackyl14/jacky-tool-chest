import labResultInputReducer from './labResultInputReducer';
import labResultArrayReducer from './labResultArrayReducer';
import labResultModalReducer from './labResultModalReducer';
import { $$initialState as $$labResultInputReducerState } from './labResultInputReducer';
import { $$initialState as $$labResultArrayReducerState } from './labResultArrayReducer';
import { $$initialState as $$labResultModalReducerState } from './labResultModalReducer';

export default {
  $$labResultInputStore: labResultInputReducer,
  $$labResultArrayStore: labResultArrayReducer,
  $$labResultModalStore: labResultModalReducer,
};

export const initialStates = {
  $$labResultInputReducerState,
  $$labResultArrayReducerState,
  $$labResultModalReducerState,
};
