import React from 'react'
import { useSelector } from 'react-redux'

function PostAuthor({ userId }) {
  const user = useSelector((state) =>
    state.users.find((user) => user.id === userId)
  )
  return <span>by {user ? user.name : 'Unknown Author'}</span>
}

export default PostAuthor
