import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import SectionHeader from '@/components/SectionHeader'
import { RankWrapper } from './style'
import { useAppSelector } from '@/store'

import RankItem from './components/RankItem'

interface IProps {
  children?: ReactNode
}

const Rank: FC<IProps> = () => {
  const { rank } = useAppSelector((state) => ({
    rank: state.recommend.rank,
  }))

  return (
    <RankWrapper>
      <SectionHeader title="榜单" moreLink="/discover/ranking" />
      <div className="content">
        {rank.map((item) => {
          return <RankItem key={item.id} itemData={item} />
        })}
      </div>
    </RankWrapper>
  )
}

export default memo(Rank)
