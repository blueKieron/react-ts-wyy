import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { useAppSelector } from '@/store'
import { formatImageUrl } from '@/utils/format'
import SectionHeader2 from '@/components/SectionHeader2'
import { SettleSingerWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const SettleSinger: FC<IProps> = () => {
  const settleSinger = useAppSelector((state) => state.recommend.settleSinger)
  return (
    <SettleSingerWrapper>
      <SectionHeader2
        title="入驻歌手"
        moreText="查看全部 &gt;"
        moreLink="#/discover/artist"
      />
      <div className="artists">
        {settleSinger.map((item) => {
          return (
            <a href="#/discover/artist" key={item.id} className="item">
              <img src={formatImageUrl(item.picUrl, 62)} alt="" />
              <div className="info">
                <div className="singer">{item.name}</div>
                {item.alias && (
                  <div className="desc textNowrap">{item.alias.join('')}</div>
                )}
              </div>
            </a>
          )
        })}
      </div>
      <div className="apply">
        <a href="">申请成为网易音乐人</a>
      </div>
    </SettleSingerWrapper>
  )
}

export default memo(SettleSinger)
