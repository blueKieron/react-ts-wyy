import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { HotAnchorWrapper } from './style'
import SectionHeader2 from '@/components/SectionHeader2'
import { hotAnchor } from '@/assets/data/local_data'

interface IProps {
  children?: ReactNode
}

const HotAnchor: FC<IProps> = () => {
  return (
    <HotAnchorWrapper>
      <SectionHeader2 title="热门主播" />
      <div className="anchor">
        {hotAnchor.map((item) => {
          return (
            <div className="item" key={item.picUrl}>
              <img src={item.picUrl} alt="" />
              <div className="info">
                <div className="name">{item.name}</div>
                <div className="desc textNowrap">{item.position}</div>
              </div>
            </div>
          )
        })}
      </div>
    </HotAnchorWrapper>
  )
}

export default memo(HotAnchor)
