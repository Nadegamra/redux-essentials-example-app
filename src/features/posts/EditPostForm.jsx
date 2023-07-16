import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { postUpdated } from './postsSlice'

function EditPostForm() {
  const { postId } = useParams()
  const post = useSelector((state) =>
    state.posts.find((post) => post.id === postId)
  )
  const dispatch = useDispatch()
  const history = useHistory()

  const [title, setTitle] = useState(post.title)
  const [content, setContent] = useState(post.content)

  return (
    <section>
      <h2>Edit Post</h2>
      <form>
        <label htmlFor="postTitle">Post Title:</label>
        <input
          type="text"
          id="postTitle"
          name="postTitle"
          placeholder="What's on your mind?"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <label htmlFor="postContent">Content:</label>
        <textarea
          id="postContent"
          name="postContent"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
      </form>
      <button
        type="button"
        onClick={() => {
          dispatch(postUpdated({ id: postId, title, content }))
          history.push(`/posts/${post.id}`)
        }}
      >
        Save Post
      </button>
    </section>
  )
}

export default EditPostForm
