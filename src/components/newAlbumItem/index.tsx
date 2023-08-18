import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { formatImageUrl } from '@/utils/format'
import { NewAlbumItemWrapper } from './style'

interface IProps {
  children?: ReactNode
  dataItem: any
}

const NewAlbumItem: FC<IProps> = (props) => {
  const { dataItem } = props

  return (
    <NewAlbumItemWrapper>
      <div className="top">
        <img src={formatImageUrl(dataItem.picUrl, 100)} alt="" />
        <a href="" className="cover sprite_cover"></a>
      </div>
      <div className="bottom">
        <div className="name textNowrap">{dataItem.name}</div>
        <div className="artist textNowrap">{dataItem.artist.name}</div>
      </div>
    </NewAlbumItemWrapper>
  )
}

export default memo(NewAlbumItem)
