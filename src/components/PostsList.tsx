import React, { useContext } from 'react'
import { Context } from '../context'
import { IPost } from '../models'
import Post from './Post'

export default function PostsList() {
  const { posts } = useContext(Context)
  if (!posts) return null
  return (
    <ul>
      {posts.map((post: IPost) => (
        <Post post={post} view={false} key={post.id}></Post>
      ))}
    </ul>
  )
}
