import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { formatCount, formatImageUrl } from '@/utils/format'
import { SongsItemWrapper } from './style'

interface IProps {
  children?: ReactNode
  itemData: any
}

const SongsItem: FC<IProps> = (props) => {
  const { itemData } = props
  return (
    <SongsItemWrapper>
      <div className="top">
        <img src={formatImageUrl(itemData.picUrl, 140)} alt=""></img>
        <div className="cover sprite_cover">
          <div className="info sprite_cover">
            <span>
              <i className="sprite_icon headset"></i>
              {formatCount(itemData.playCount)}
            </span>
            <i className="sprite_icon play"></i>
          </div>
        </div>
      </div>
      <div className="bottom">{itemData.name}</div>
    </SongsItemWrapper>
  )
}

export default memo(SongsItem)
