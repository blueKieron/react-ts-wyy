import { configureStore } from '@reduxjs/toolkit'
import {
  useSelector,
  TypedUseSelectorHook,
  useDispatch,
  shallowEqual,
} from 'react-redux'

import recommendReducer from '../views/discover/c-views/recommend/store'
import playerReducer from '../views/player/store'

const store = configureStore({
  reducer: {
    recommend: recommendReducer,
    player: playerReducer,
  },
})

type GetStateFnType = typeof store.getState
export type IRootState = ReturnType<GetStateFnType>
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector

type DispatchType = typeof store.dispatch
export const useAppDispatch: () => DispatchType = useDispatch

export const shallowEqualApp = shallowEqual

export default store
