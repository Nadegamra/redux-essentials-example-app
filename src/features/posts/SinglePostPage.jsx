import React from 'react'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import PostAuthor from './PostAuthor'
import { TimeAgo } from './TImeAgo'
import { ReactionButtons } from './ReactionButtons'
import { useGetPostQuery } from '../api/apiSlice'
import { Spinner } from '../../components/Spinner'

function SinglePostPage() {
  const { postId } = useParams()
  const { data: post, isFetching, isSuccess } = useGetPostQuery(postId)
  if (isFetching) {
    return (
      <section>
        <Spinner text="Loading..." />
      </section>
    )
  } else if (isSuccess) {
    return (
      <section>
        <article className="post">
          <h2>{post.title}</h2>
          <PostAuthor userId={post.user} />
          <TimeAgo timestamp={post.date} />
          <p className="post-content">{post.content}</p>
          <ReactionButtons post={post} />
          <Link to={`/editPost/${postId}`}>Edit Post</Link>
        </article>
      </section>
    )
  }
}

export default SinglePostPage
