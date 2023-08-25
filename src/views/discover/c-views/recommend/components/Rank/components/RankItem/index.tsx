import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { useAppDispatch } from '@/store'
import { formatImageUrl } from '@/utils/format'
import { RankItemWrapper } from './style'
import { fetchCurrentSongAction } from '@/views/player/store'

interface IProps {
  children?: ReactNode
  itemData: any
}

const RankItem: FC<IProps> = (props) => {
  const dispatch = useAppDispatch()
  const { itemData } = props
  const { tracks = [] } = itemData

  const handlePlayMusic = (id: number) => {
    dispatch(fetchCurrentSongAction(id))
  }
  return (
    <RankItemWrapper>
      <div className="header">
        <div className="image">
          <img src={formatImageUrl(itemData.coverImgUrl, 80)} alt="" />
          <a href="" className="sprite_02"></a>
        </div>
        <div className="info">
          <div className="name">{itemData.name}</div>
          <div>
            <button className="sprite_02 btn play"></button>
            <button className="sprite_02 btn favor"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.slice(0, 10).map((item: any, index: number) => {
          return (
            <div className="list-item" key={item.id}>
              <div className="rank">{index + 1}</div>
              <div className="info">
                <div className="name textNowrap">{item.name}</div>
                <div className="operate">
                  <button
                    className="btn sprite_02 play"
                    onClick={() => handlePlayMusic(item.id)}
                  ></button>
                  <button className="btn sprite_icon2 addto"></button>
                  <button className="btn sprite_02 favor"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <a href="#/discover/ranking">查看全部 &gt;</a>
      </div>
    </RankItemWrapper>
  )
}

export default memo(RankItem)
