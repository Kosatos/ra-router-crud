import React, { useState, useEffect } from 'react'
import { Context } from './context'
import { Routes, Route } from 'react-router-dom'
import './App.css'

import { IPost } from './models'

import PostsView from './pages/PostsView'
import CreatePostForm from './components/CreatePostForm'
import Post from './components/Post'

function App() {
  const [posts, setPosts] = useState<IPost[]>([])

  const getPosts = async () => {
    const response = await fetch('http://localhost:7777/posts')
    const data = await response.json()

    setPosts(data)
  }

  const handleAddPost = async (post: any) => {
    await fetch('http://localhost:7777/posts', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(post),
    })

    getPosts()
  }

  const handleRemovePost = async (id: number) => {
    await fetch(`http://localhost:7777/posts/${id}`, {
      method: 'DELETE',
    })

    getPosts()
  }

  const handleEditPost = async (post: any) => {
    await fetch(`http://localhost:7777/posts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=utf-8',
      },
      body: JSON.stringify(post),
    })

    getPosts()
  }

  const getPostById = (id: number) => {
    return posts.find((post) => post.id === id)
  }

  useEffect(() => {
    getPosts()
  }, [])

  return (
    <Context.Provider
      value={{
        posts,
        handleAddPost,
        handleRemovePost,
        handleEditPost,
        getPostById,
      }}
    >
      <div className='max-w-[960px] px-4 py-10 m-auto'>
        <Routes>
          <Route path='/' element={<PostsView />}></Route>
          <Route path='/posts/new' element={<CreatePostForm />}></Route>
          <Route path='/posts/:id' element={<Post view={true} />}></Route>
        </Routes>
      </div>
    </Context.Provider>
  )
}

export default App
