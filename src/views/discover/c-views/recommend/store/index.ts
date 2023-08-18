import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import {
  getBanner,
  getHotRecommend,
  getNewAlbum,
  getPlaylist,
} from '../service/recommend'

export const fetchRecommedInfo = createAsyncThunk(
  'recommend',
  async (_, { dispatch }) => {
    getBanner().then((res) => dispatch(changeBannerAction(res.banners)))
    getHotRecommend(8).then((res) =>
      dispatch(changeHotRecommendAction(res.result)),
    )
    getNewAlbum().then((res) => dispatch(changeNewAlbumAction(res.albums)))
  },
)

export const fetchRankAction = createAsyncThunk(
  'rank',
  async (args, { dispatch }) => {
    const ids = [19723756, 3779629, 2884035]
    const promises: Promise<any>[] = []
    for (const id of ids) {
      promises.push(getPlaylist(id))
    }
    Promise.all(promises).then((res) => {
      dispatch(changeRankAction(res.map((item) => item.playlist)))
    })
  },
)

interface IRecommendState {
  banners: any[]
  hotRecommend: any[]
  newAlbum: any[]
  rank: any[]
}
const initialState: IRecommendState = {
  banners: [],
  hotRecommend: [],
  newAlbum: [],
  rank: [],
}
const recommendSlice = createSlice({
  name: 'recommend',
  initialState,
  reducers: {
    changeBannerAction(state, { payload }) {
      state.banners = payload
    },
    changeHotRecommendAction(state, { payload }) {
      state.hotRecommend = payload
    },
    changeNewAlbumAction(state, { payload }) {
      state.newAlbum = payload
    },
    changeRankAction(state, { payload }) {
      state.rank = payload
    },
  },

  // extraReducers: (builder) => {
  //   builder.addCase(fetchBannerDataAction.fulfilled, (state, action) => {
  //     state.banners = action.payload
  //   })
  // },
})

export const {
  changeBannerAction,
  changeHotRecommendAction,
  changeNewAlbumAction,
  changeRankAction,
} = recommendSlice.actions
export default recommendSlice.reducer
