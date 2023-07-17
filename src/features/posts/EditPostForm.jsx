import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min'
import { useGetPostQuery, useEditPostMutation } from '../api/apiSlice'

function EditPostForm() {
  const { postId } = useParams()
  const history = useHistory()

  const { data: post } = useGetPostQuery(postId)
  const [updatePost, { isLoading }] = useEditPostMutation()

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
        onClick={async () => {
          if (title && content) {
            await updatePost({ id: postId, title, content })
            history.push(`/posts/${post.id}`)
          }
        }}
      >
        Save Post
      </button>
    </section>
  )
}

export default EditPostForm
