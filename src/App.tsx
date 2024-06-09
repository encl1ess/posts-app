import React from 'react'
import './App.css'
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom'
import { ROUTES } from './utils/constants'
import { Layout } from './app/components/Layout/Layout'
import { Post } from './posts/components/Post'
import { PostsList } from './posts/components/PostsList'
import { Provider } from 'react-redux'
import { store } from './app/store'

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div className="App">
          <Layout>
            <Routes>
              <Route path={ROUTES.POSTS} element={<PostsList />} />
            </Routes>
          </Layout>
        </div>
      </Router>
    </Provider>
  )
}

export default App
