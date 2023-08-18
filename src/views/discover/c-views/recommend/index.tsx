import React, { memo, useEffect } from 'react'
import type { FC, ReactNode } from 'react'

import { useAppDispatch } from '@/store'
import { fetchRecommedInfo, fetchRankAction } from './store'

import Swiper from './components/Swiper'
import HotRecommend from './components/HotRecommed'
import NewAlbum from './components/NewAlbum'
import Rank from './components/Rank'
import { RecommendWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const Recommend: FC<IProps> = () => {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchRecommedInfo())
    dispatch(fetchRankAction())
  }, [])

  return (
    <RecommendWrapper>
      <Swiper />
      <div className="content wrap-v2">
        <div className="left">
          <HotRecommend />
          <NewAlbum />
          <Rank />
        </div>
        <div className="right"></div>
      </div>
    </RecommendWrapper>
  )
}

export default memo(Recommend)
