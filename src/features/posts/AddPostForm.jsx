import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { postAdded } from './postsSlice'
import { nanoid } from '@reduxjs/toolkit'

function AddPostForm() {
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const dispatch = useDispatch()

  const onSavePostClicked = () => {
    if (title && content) {
      dispatch(
        postAdded({
          id: nanoid(),
          title,
          content,
        })
      )

      setTitle('')
      setContent('')
    }
  }
  return (
    <section>
      <form>
        <h2>Add a New Post</h2>
        <fieldset>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
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
        </fieldset>
        <button type="button" onClick={onSavePostClicked}>
          Save Post
        </button>
      </form>
    </section>
  )
}

export default AddPostForm
