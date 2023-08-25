import { IRootState } from '@/store'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ILyric, parseLyric } from '@/utils/handlePlayer'
import { getSongDetail, getSongLyric } from '../service'

interface IThunkState {
  state: IRootState
}

interface IPlayerState {
  currentSong: any
  lyric: ILyric[]
  lyricIndex: number
  playSongList: any[]
  playSongIndex: number
  playMode: number
}

const initialState: IPlayerState = {
  currentSong: {},
  lyric: [],
  lyricIndex: -1,
  playSongList: [],
  playSongIndex: -1,
  playMode: 0, //0:顺序 1:随机 2:单曲
}

export const fetchCurrentSongAction = createAsyncThunk<
  void,
  number,
  IThunkState
>('fetchCurrentSong', (id: number, { dispatch, getState }) => {
  const playList = getState().player.playSongList
  const findIndex = playList.findIndex((item) => item.id == id)
  if (findIndex == -1) {
    getSongDetail(id).then((res: any) => {
      if (!res.songs.length) return
      const song = res.songs[0]
      const newPlaySongList = [...playList, song]
      dispatch(changeCurrentSongAction(song))
      dispatch(changePlaySongListAction(newPlaySongList))
      dispatch(changePlaySongIndexAction(newPlaySongList.length - 1))
    })
    getSongLyric(id).then((res: any) => {
      const lyricString = res.lrc.lyric
      const lyrics = parseLyric(lyricString)
      dispatch(changeLyricAction(lyrics))
    })
  } else {
    const song = playList[findIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(findIndex))
  }
})

export const changeMusicAction = createAsyncThunk<void, boolean, IThunkState>(
  'changemusic',
  (isNext, { dispatch, getState }) => {
    const player = getState().player
    const songIndex = player.playSongIndex
    const songList = player.playSongList
    const playMode = player.playMode

    let newIndex = songIndex
    if (playMode === 1) {
      newIndex = Math.floor(Math.random() * songList.length)
    } else {
      newIndex = isNext ? songIndex + 1 : songIndex - 1
      if (newIndex > songList.length - 1) newIndex = 0
      if (newIndex < 0) newIndex = songList.length - 1
    }

    const song = songList[newIndex]
    dispatch(changeCurrentSongAction(song))
    dispatch(changePlaySongIndexAction(newIndex))
    getSongLyric(song.id).then((res: any) => {
      const lyricString = res.lrc.lyric
      const lyrics = parseLyric(lyricString)
      dispatch(changeLyricAction(lyrics))
    })
  },
)

const playerSlice = createSlice({
  name: 'player',
  initialState,
  reducers: {
    changeCurrentSongAction(state, { payload }) {
      state.currentSong = payload
    },
    changeLyricAction(state, { payload }) {
      state.lyric = payload
    },
    changeLyricIndexAction(state, { payload }) {
      state.lyricIndex = payload
    },
    changePlaySongListAction(state, { payload }) {
      state.playSongList = payload
    },
    changePlaySongIndexAction(state, { payload }) {
      state.playSongIndex = payload
    },
    changePlayModeAction(state, { payload }) {
      state.playMode = payload
    },
  },
})

export const {
  changeCurrentSongAction,
  changePlaySongIndexAction,
  changeLyricAction,
  changeLyricIndexAction,
  changePlaySongListAction,
  changePlayModeAction,
} = playerSlice.actions
export default playerSlice.reducer
