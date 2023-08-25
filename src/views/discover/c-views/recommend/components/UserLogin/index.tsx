import React, { memo } from 'react'
import type { FC, ReactNode } from 'react'

import { UserLoginWrapper } from './style'

interface IProps {
  children?: ReactNode
}

const UserLogin: FC<IProps> = () => {
  return (
    <UserLoginWrapper className="sprite_02">
      <p className="desc">
        登陆网易云音乐，可以享受无限收藏的乐趣，并无限同步到手机
      </p>
      <a href="/login" className="sprite_02">
        用户登陆
      </a>
    </UserLoginWrapper>
  )
}

export default memo(UserLogin)
