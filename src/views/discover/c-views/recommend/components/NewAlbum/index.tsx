import React, { memo, useRef } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { Carousel } from 'antd'

import { useAppSelector } from '@/store'
import SectionHeader from '@/components/SectionHeader'
import NewAlbumItem from '@/components/newAlbumItem'
import { NewAlbumWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const NewAlbum: FC<IProps> = () => {
  const carouselRef = useRef<ElementRef<typeof Carousel>>(null)
  const { newAblum } = useAppSelector((state) => ({
    newAblum: state.recommend.newAlbum,
  }))

  function handlePrevClick() {
    carouselRef.current?.prev()
  }

  const handleNextClick = () => {
    carouselRef.current?.next()
  }

  return (
    <NewAlbumWrapper>
      <SectionHeader title="新碟上架" moreLink="/discover/album" />
      <div className="content">
        <button
          className="sprite_02 arrow arrow-left"
          onClick={handlePrevClick}
        ></button>
        <div className="carousel">
          <Carousel dots={false} speed={1000} ref={carouselRef}>
            {[0, 1].map((item) => {
              return (
                <div key={item}>
                  <div className="album-list">
                    {newAblum.slice(item * 5, (item + 1) * 5).map((album) => {
                      return <NewAlbumItem key={album.id} dataItem={album} />
                    })}
                  </div>
                </div>
              )
            })}
          </Carousel>
        </div>
        <button
          className="sprite_02 arrow arrow-right"
          onClick={handleNextClick}
        ></button>
      </div>
    </NewAlbumWrapper>
  )
}

export default memo(NewAlbum)
