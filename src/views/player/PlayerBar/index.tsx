import React, { memo, useState, useRef, useEffect } from 'react'
import type { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { message, Slider } from 'antd'

import { useAppDispatch, useAppSelector, shallowEqualApp } from '@/store'
import { formatImageUrl } from '@/utils/format'
import {
  PlayerBarWrapper,
  PlayerBarControl,
  PlayerBarInfo,
  PlayerBarOprate,
} from './style'
import {
  changeLyricIndexAction,
  changeMusicAction,
  changePlayModeAction,
} from '../store'
import { getSongPlayUrl } from '@/utils/handlePlayer'
import { formatTime } from '@/utils/format'

interface IProps {
  children?: ReactNode
}

const PlayerBar: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  const [isPlaying, setIsPlaying] = useState(false)
  const [progress, setProgress] = useState(0)
  const [isSliding, setIsSliding] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(0)
  const { currentSong, lyric, lyricIndex, playMode } = useAppSelector(
    (state) => ({
      currentSong: state.player.currentSong,
      lyric: state.player.lyric,
      lyricIndex: state.player.lyricIndex,
      playMode: state.player.playMode,
    }),
    shallowEqualApp,
  )
  const audioRef = useRef<HTMLAudioElement>(null)

  const handlePlayBtnClick = () => {
    isPlaying
      ? audioRef.current?.pause()
      : audioRef.current?.play().catch(() => setIsPlaying(false))
    setIsPlaying(!isPlaying)
  }

  const handleChangeMusic = (isNext = true) => {
    dispatch(changeMusicAction(isNext))
  }

  const handleSliding = (value: number) => {
    setIsSliding(true)
    setProgress(value)
    const currentTime = (value / 100) * duration
    setCurrentTime(currentTime)
  }

  const handleSliderClick = (value: number) => {
    const currentTime = (value / 100) * duration
    audioRef.current!.currentTime = currentTime / 1000
    setCurrentTime(currentTime)
    setProgress(value)
    setIsSliding(false)
  }

  const handleTimeUpdata = () => {
    const currentTime = audioRef.current!.currentTime * 1000
    if (!isSliding) {
      const progress = (currentTime / duration) * 100
      setProgress(progress)
      setCurrentTime(currentTime)
    }

    //根据当前时间匹配歌词
    let index = lyric.length - 1
    for (let i = 0; i < lyric.length - 1; i++) {
      if (lyric[i].time > currentTime) {
        index = i - 1
        break
      }
    }
    console.log(lyric, '11')
    if (index === lyricIndex || index == -1) return
    dispatch(changeLyricIndexAction(index))
    console.log('22')
    message.open({
      content: lyric[index].text,
      key: 'lrc',
      duration: 0,
    })
  }

  const handleTimeEnd = () => {
    if (playMode == 2) {
      audioRef.current!.currentTime = 0
      audioRef.current?.play()
    } else {
      handleChangeMusic(true)
    }
  }

  const handleChangePlayMode = () => {
    console.log('---')
    let newPlayMode = playMode + 1
    if (newPlayMode > 2) newPlayMode = 0
    dispatch(changePlayModeAction(newPlayMode))
  }

  useEffect(() => {
    console.log(currentSong)
    audioRef.current!.src = getSongPlayUrl(currentSong.id)
    audioRef.current
      ?.play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        setIsPlaying(false)
      })
    setDuration(currentSong.dt)
  }, [currentSong])

  return (
    <PlayerBarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <PlayerBarControl isplaying={isPlaying}>
          <button
            onClick={() => handleChangeMusic(false)}
            className="btn sprite_playbar prev"
          ></button>
          <button
            onClick={handlePlayBtnClick}
            className="btn sprite_playbar play"
          ></button>
          <button
            onClick={() => handleChangeMusic()}
            className="btn sprite_playbar next"
          ></button>
        </PlayerBarControl>
        <PlayerBarInfo>
          <Link to="/player">
            <img
              src={formatImageUrl(currentSong?.al?.picUrl || '', 50)}
              alt=""
              className="image"
            />
          </Link>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <span className="song-singer">{currentSong.ar?.[0].name}</span>
            </div>
            <div className="progress">
              <Slider
                value={progress}
                step={0.5}
                tooltip={{ formatter: null }}
                onAfterChange={handleSliderClick}
                onChange={handleSliding}
              />
              <div className="time">
                <span className="current">{formatTime(currentTime)}</span>
                <span className="divider">/</span>
                <span className="duration">{formatTime(duration)}</span>
              </div>
            </div>
          </div>
        </PlayerBarInfo>
        <PlayerBarOprate playmode={playMode}>
          <div className="left">
            <button className="btn pip"></button>
            <button className="btn sprite_playbar favor"></button>
            <button className="btn sprite_playbar share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="btn sprite_playbar volume"></button>
            <button
              className="btn sprite_playbar loop"
              onClick={handleChangePlayMode}
            ></button>
            <button className="btn sprite_playbar playlist"></button>
          </div>
        </PlayerBarOprate>
      </div>
      <audio
        ref={audioRef}
        onTimeUpdate={handleTimeUpdata}
        onEnded={handleTimeEnd}
      />
    </PlayerBarWrapper>
  )
}

export default memo(PlayerBar)
