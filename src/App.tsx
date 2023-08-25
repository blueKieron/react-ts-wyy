import React, { Suspense, useEffect } from 'react'
import { useRoutes } from 'react-router-dom'

import routes from './router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'
import PlayerBar from '@/views/player/PlayerBar'
import { useAppDispatch } from './store'
import { fetchCurrentSongAction } from '@/views/player/store'

// import { IRootState } from './store'

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    dispatch(fetchCurrentSongAction(1330348068))
  }, [])
  return (
    <div className="App">
      <Header />
      <Suspense fallback="">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      <Footer />
      <PlayerBar />
    </div>
  )
}

export default App
