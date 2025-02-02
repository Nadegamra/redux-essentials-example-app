import React from 'react'
import { useSelector } from 'react-redux'
import { Link, useParams } from 'react-router-dom/cjs/react-router-dom.min'

import { selectUserById } from './usersSlice'
import { createSelector } from '@reduxjs/toolkit'
import { useGetPostsQuery } from '../api/apiSlice'
import { useMemo } from 'react'

function UserPage() {
  const { userId } = useParams()

  const user = useSelector((state) => selectUserById(state, userId))

  const selectPostsForUser = useMemo(() => {
    const emptyArray = []
    return createSelector(
      (res) => res.data,
      (res, userId) => userId,
      (data, userId) =>
        data?.filter((post) => post.user === userId) ?? emptyArray
    )
  }, [])

  const { postsForUser } = useGetPostsQuery(undefined, {
    selectFromResult: (result) => ({
      ...result,
      postsForUser: selectPostsForUser(result, userId),
    }),
  })

  const postTitles = postsForUser.map((post) => (
    <li key={post.id}>
      <Link to={`/posts/${post.id}`}>{post.title}</Link>
    </li>
  ))
  return (
    <section>
      <h2>{user.name}</h2>
      <ul>{postTitles}</ul>
    </section>
  )
}

export default UserPage
