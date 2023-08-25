import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { SectionHeader2Wrapper } from './style'

interface IProps {
  children?: ReactNode
  title?: string
  moreText?: string
  moreLink?: string
}

const SectionHeader2: FC<IProps> = (props) => {
  const { title, moreText, moreLink } = props
  return (
    <SectionHeader2Wrapper>
      <h3>{title}</h3>
      {moreText && <a href={moreLink}>{moreText}</a>}
    </SectionHeader2Wrapper>
  )
}

export default memo(SectionHeader2)
