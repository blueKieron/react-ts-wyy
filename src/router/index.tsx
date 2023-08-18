import React from 'react'
import type { RouteObject } from 'react-router-dom'
import { Navigate } from 'react-router-dom'

const Discover = React.lazy(() => import('@/views/discover'))
const Recommend = React.lazy(() => import('@/views/discover/c-views/recommend'))
const Songs = React.lazy(() => import('@/views/discover/c-views/songs'))
const Ranking = React.lazy(() => import('@/views/discover/c-views/ranking'))
const Djradio = React.lazy(() => import('@/views/discover/c-views/djradio'))
const Artist = React.lazy(() => import('@/views/discover/c-views/artist'))
const Album = React.lazy(() => import('@/views/discover/c-views/album'))

const Download = React.lazy(() => import('@/views/download'))
const Focus = React.lazy(() => import('@/views/focus'))
const Mine = React.lazy(() => import('@/views/mine'))

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Navigate to="/discover" />,
  },
  {
    path: '/discover',
    element: <Discover />,
    children: [
      {
        path: '/discover',
        element: <Navigate to="/discover/recommend" />,
      },
      {
        path: '/discover/recommend',
        element: <Recommend />,
      },
      {
        path: '/discover/songs',
        element: <Songs />,
      },
      {
        path: '/discover/ranking',
        element: <Ranking />,
      },
      {
        path: '/discover/djradio',
        element: <Djradio />,
      },
      {
        path: '/discover/artist',
        element: <Artist />,
      },
      {
        path: '/discover/album',
        element: <Album />,
      },
    ],
  },
  {
    path: '/download',
    element: <Download />,
  },
  {
    path: '/focus',
    element: <Focus />,
  },
  {
    path: '/mine',
    element: <Mine />,
  },
]

export default routes
