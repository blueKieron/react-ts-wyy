import { shallowEqualApp, useAppSelector } from '@/store'
import React, { memo, useRef, useState } from 'react'
import type { FC, ReactNode, ElementRef } from 'react'
import { Carousel } from 'antd'
import cn from 'classnames'

import { SwiperLeft, SwiperRight, SwiperWrapper, SwiperControl } from './style'

interface IProps {
  children?: ReactNode
}

const Swiper: FC<IProps> = () => {
  const ref = useRef<ElementRef<typeof Carousel>>(null)
  const [currentIdx, setCurrentIdx] = useState(0)

  const { banners } = useAppSelector(
    (state) => ({
      banners: state.recommend.banners,
    }),
    shallowEqualApp,
  )

  const handleAfterChange = (current: number) => {
    setCurrentIdx(current)
  }

  const handlePrevClick = () => {
    ref.current?.prev()
  }
  const handleNextClick = () => {
    ref.current?.next()
  }

  let bgImageUrl = banners[currentIdx]?.imageUrl
  if (bgImageUrl) bgImageUrl = bgImageUrl + '?imageView&blur=40x20'
  return (
    <SwiperWrapper
      style={{ background: `url('${bgImageUrl}') center center / 6000px` }}
    >
      <div className="banner wrap-v2">
        <SwiperLeft>
          <Carousel
            autoplay
            dots={false}
            effect="fade"
            afterChange={handleAfterChange}
            ref={ref}
          >
            {banners.length &&
              banners.map((banner) => {
                return (
                  <div className="banner-item" key={banner.imageUrl}>
                    <img
                      className="image"
                      src={banner.imageUrl}
                      alt={banner.typeTitle}
                    />
                  </div>
                )
              })}
          </Carousel>
          <ul className="dots">
            {banners.length &&
              banners.map((item, index) => {
                return (
                  <li key={item.imageUrl}>
                    <span
                      className={cn('item', { active: index === currentIdx })}
                    ></span>
                  </li>
                )
              })}
          </ul>
        </SwiperLeft>
        <SwiperRight></SwiperRight>
        <SwiperControl>
          <button className="btn left" onClick={handlePrevClick}></button>
          <button className="btn right" onClick={handleNextClick}></button>
        </SwiperControl>
      </div>
    </SwiperWrapper>
  )
}

export default memo(Swiper)
