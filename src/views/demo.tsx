import React, { memo } from 'react'
import type { ReactNode } from 'react'

interface IProps {
  name: string
  age: number
  children?: ReactNode
}

const demo: React.FC<IProps> = (props) => {
  return (
    <>
      <div>{props.name}</div>
      <div>{props.age}</div>
      <div>{props.children}</div>
    </>
  )
}

export default memo(demo)
