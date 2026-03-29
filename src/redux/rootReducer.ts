import { combineReducers } from '@reduxjs/toolkit';
import authReducer        from './slices/authSlice';
import puestosReducer     from './slices/puestosSlice';
import cobrosReducer      from './slices/cobrosSlice';
import asistenciasReducer from './slices/asistenciasSlice';
import sociosReducer      from './slices/sociosSlice';
import statsReducer       from './slices/statsSlice';
import uiReducer          from './slices/uiSlice';
import configReducer      from './slices/configSlice';

const rootReducer = combineReducers({
  auth:        authReducer,
  puestos:     puestosReducer,
  cobros:      cobrosReducer,
  asistencias: asistenciasReducer,
  socios:      sociosReducer,
  stats:       statsReducer,
  ui:          uiReducer,
  config:      configReducer,
});

export type RootState = ReturnType<typeof rootReducer>;
export default rootReducer;