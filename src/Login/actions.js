import { ADD_FROM_ADDRESS } from '../actionTypes';

export const addFromAddress = fromAddress => {
  return { type: ADD_FROM_ADDRESS, fromAddress };
};