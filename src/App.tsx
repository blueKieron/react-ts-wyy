import React, { Suspense } from 'react'
import { useRoutes } from 'react-router-dom'
import { Button } from 'antd'

import routes from './router'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

// import { IRootState } from './store'

function App() {
  return (
    <div className="App">
      <Header />
      <Suspense fallback="">
        <div className="main">{useRoutes(routes)}</div>
      </Suspense>
      <Button type="primary">Button</Button>
      <Footer />
    </div>
  )
}

export default App
