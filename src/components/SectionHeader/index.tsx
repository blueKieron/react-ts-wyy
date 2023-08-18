import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'
import { Link } from 'react-router-dom'

import { SectionHeaderWrapper } from './style'

interface IProps {
  children?: ReactNode
  title?: string
  keywords?: string[]
  moreText?: string
  moreLink?: string
}

const SectionHeader: FC<IProps> = (props) => {
  const { title = '', keywords = [], moreText = '更多', moreLink = '/' } = props
  return (
    <SectionHeaderWrapper>
      <div className="left1">
        <i className="icon sprite_02"></i>
        <h3 className="title">{title}</h3>
        <div className="keywords">
          {keywords.map((item) => {
            return (
              <div className="item" key={item}>
                <span className="text">{item}</span>
                <span className="divider">|</span>
              </div>
            )
          })}
        </div>
      </div>
      <div className="right1">
        <Link className="more" to={moreLink}>
          {moreText}
        </Link>
        <i className="icon sprite_02"></i>
      </div>
    </SectionHeaderWrapper>
  )
}

export default memo(SectionHeader)
