import React, { useContext, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import moment from 'moment'
import { Context } from '../context'
import { IPost } from '../models'

import EditPostForm from './EditPostForm'

interface PostProps {
  post: IPost | any
  view: boolean
}

export default function Post({ post, view }: PostProps) {
  const [editing, setEditing] = useState<boolean>(false)
  const { id } = useParams()
  const { getPostById, handleRemovePost } = useContext(Context)
  const navigate = useNavigate()

  if (id) {
    post = getPostById(+id)
  }

  const handleClick = () => {
    if (view) return
    navigate(`/posts/${post.id}`)
  }

  const onRemove = () => {
    handleRemovePost(post.id)
    navigate('/', { replace: true })
  }

  const handleEndEdit = () => {
    setEditing(false)
  }

  return (
    <>
      {editing ? (
        <EditPostForm post={post} onEndEdit={handleEndEdit}></EditPostForm>
      ) : (
        <li
          className='p-6 mb-4 border-2 border-gray-100 rounded-md shadow-md list-none'
          onClick={handleClick}
        >
          <div className='flex items-center'>
            <div className='w-10 h-10 mr-2 rounded-full bg-orange-500'></div>
            <div>
              <h4 className='text-lg font-medium'>Some User</h4>
              <span className='text-gray-600'>
                {moment(post.created).fromNow()}
              </span>
            </div>
          </div>
          <p className='mt-4 text-lg'>{post.content}</p>

          {view && (
            <div className='flex justify-end gap-2 mt-4'>
              <button
                className='p-2 text-white font-medium bg-blue-600 rounded-md hover:bg-blue-800 transition-colors'
                onClick={() => setEditing(true)}
              >
                Изменить
              </button>
              <button
                className='p-2 text-white font-medium bg-red-600 rounded-md hover:bg-red-800 transition-colors'
                onClick={onRemove}
              >
                Удалить
              </button>
            </div>
          )}
        </li>
      )}
    </>
  )
}

Post.defaultProps = {
  post: {},
}
