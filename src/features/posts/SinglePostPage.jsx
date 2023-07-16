import React from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { Link } from 'react-router-dom/cjs/react-router-dom.min'
import PostAuthor from './PostAuthor'
import { TimeAgo } from './TImeAgo'
import { ReactionButtons } from './ReactionButtons'
import { selectPostById } from './postsSlice'

function SinglePostPage() {
  const { postId } = useParams()
  const post = useSelector((state) => selectPostById(state, postId))
  if (!post) {
    return (
      <section>
        <h2>Post not found!</h2>
      </section>
    )
  }
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

export default SinglePostPage
