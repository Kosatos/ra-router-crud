import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

import PostsList from '../components/PostsList'
import { Context } from '../context'

export default function PostsView() {
  const { posts } = useContext(Context)
  const navigate = useNavigate()
  return (
    <>
      <div className='py-4 flex justify-end'>
        <button
          className='p-2 text-white font-medium bg-blue-600 rounded-md hover:bg-blue-800 transition-colors'
          onClick={() => navigate('/posts/new')}
        >
          Создать пост
        </button>
      </div>
      {!posts.length && (
        <h3 className='text-4xl font-bold py-10 text-center text-gray-400'>
          Создайте свой первый пост
        </h3>
      )}
      <PostsList></PostsList>
    </>
  )
}
