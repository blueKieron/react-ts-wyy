import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { shallowEqualApp, useAppSelector } from '@/store'

import SectionHeader from '@/components/SectionHeader'
import { HotRecommedWrapper } from './style'
import SongsItem from '@/components/SongsItem'

interface IProps {
  children?: ReactNode
}

const HotRecommend: FC<IProps> = () => {
  const { hotRecommend } = useAppSelector(
    (state) => ({
      hotRecommend: state.recommend.hotRecommend,
    }),
    shallowEqualApp,
  )

  return (
    <HotRecommedWrapper>
      <SectionHeader
        title="热门推荐"
        keywords={['华语', '流行', '摇滚', '民谣', '电子']}
        moreLink="/discover/songs"
      />
      <div className="hot-recommend">
        {hotRecommend.map((item) => {
          return <SongsItem key={item.id} itemData={item} />
        })}
      </div>
      HotRecommend
    </HotRecommedWrapper>
  )
}

export default memo(HotRecommend)
