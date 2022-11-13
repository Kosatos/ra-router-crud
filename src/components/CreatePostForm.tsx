import React, { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Context } from '../context'

export default function CreatePostForm() {
  const [content, setContent] = useState('')
  const { handleAddPost } = useContext(Context)
  const navigate = useNavigate()

  const handleChange = (evt: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(evt.target.value)
  }

  const handleSubmit = (evt: React.FormEvent) => {
    evt.preventDefault()
    if (!content.trim()) {
      return
    }
    handleAddPost({ id: 0, content: content })
    setContent('')
    navigate('/')
  }

  return (
    <div>
      <form
        className='px-6 pb-6 pt-10 border-1 border-gray-100 shadow-md rounded-md flex flex-col relative'
        onSubmit={handleSubmit}
      >
        <div
          className='absolute p-1 top-0 right-0 origin-center hover:rotate-90 transition-transform cursor-pointer'
          onClick={() => navigate('/', { replace: true })}
        >
          <svg
            className='h-8 w-8 text-gray-800'
            width='24'
            height='24'
            viewBox='0 0 24 24'
            stroke-width='2'
            stroke='currentColor'
            fill='none'
            stroke-linecap='round'
            stroke-linejoin='round'
          >
            {' '}
            <path stroke='none' d='M0 0h24v24H0z' />{' '}
            <line x1='18' y1='6' x2='6' y2='18' />{' '}
            <line x1='6' y1='6' x2='18' y2='18' />
          </svg>
        </div>
        <textarea
          className='h-20 p-4 resize-none border-2 border-gray-100 rounded-md'
          placeholder='Введите текст вашего поста...'
          value={content}
          onChange={handleChange}
        ></textarea>
        <button className='p-2 mt-4 w-40 self-end text-white font-medium bg-blue-600 rounded-md hover:bg-blue-800 transition-colors'>
          Опубликовать
        </button>
      </form>
    </div>
  )
}
