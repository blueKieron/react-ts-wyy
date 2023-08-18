import React, { Suspense } from 'react'
import { useSelector, useDispatch, shallowEqual } from 'react-redux'
import { useRoutes, Link } from 'react-router-dom'
import routes from './router'
import { useAppSelector } from './store'
import { changeMessageAction } from './store/modules/counter'

// import { IRootState } from './store'

function App() {
  const { count, message } = useAppSelector(
    (state) => ({
      count: state.counter.count,
      message: state.counter.message,
    }),
    // 做检测 相同值不再计算
    shallowEqual,
  )

  const dispatch = useDispatch()
  function handleClick() {
    dispatch(changeMessageAction('asd'))
  }

  return (
    <div className="App">
      <h1>count: {count}</h1>
      <h1>message: {message}</h1>
      <button onClick={handleClick}>修改</button>
      <div className="nav">
        <Link to="/discover">发现音乐</Link>
        <Link to="/mine">我的音乐</Link>
        <Link to="/focus">关注</Link>
        <Link to="/download">下载客户端</Link>
      </div>
      <Suspense fallback="">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
    </div>
  )
}

export default App
