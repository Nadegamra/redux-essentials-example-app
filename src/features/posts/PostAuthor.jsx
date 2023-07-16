import React from 'react'
import { useSelector } from 'react-redux'
import { selectUserById } from '../users/usersSlice'

function PostAuthor({ userId }) {
  const user = useSelector((state) => selectUserById(state, userId))

  return <span>by {user ? user.name : 'Unknown Author'}</span>
}

export default PostAuthor
