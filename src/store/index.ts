import { configureStore } from '@reduxjs/toolkit'
import {
  useSelector,
  TypedUseSelectorHook,
  useDispatch,
  shallowEqual,
} from 'react-redux'

import counterReducer from './modules/counter'
import recommendReducer from '../views/discover/c-views/recommend/store'

const store = configureStore({
  reducer: {
    counter: counterReducer,
    recommend: recommendReducer,
  },
})

type GetStateFnType = typeof store.getState
export type IRootState = ReturnType<GetStateFnType>
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

type DispatchType = typeof store.dispatch
export const useAppDispatch: () => DispatchType = useDispatch

export const shallowEqualApp = shallowEqual

export default store
