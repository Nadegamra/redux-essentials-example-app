import { createAsyncThunk, createSlice, nanoid } from '@reduxjs/toolkit'
import { client } from '../../api/client'

const initialState = {
  status: 'idle',
  error: null,
  posts: [],
}

export const addNewPost = createAsyncThunk('posts/addNewPost', async (post) => {
  const response = await client.post('/fakeApi/posts', post)
  return response.data
})

export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const response = await client.get('/fakeApi/posts')
  return response.data
})

const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    postUpdated: (state, action) => {
      const { id, title, content } = action.payload
      const post = state.posts.find((post) => post.id === id)
      if (post) {
        post.title = title
        post.content = content
      }
    },
    reactionAdded: (state, action) => {
      const { postId, reaction } = action.payload
      const post = state.posts.find((post) => post.id === postId)
      post.reactions[reaction]++
    },
  },
  extraReducers: (builder) =>
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = 'loading'
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.posts = action.payload
        state.status = 'succeeded'
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.error.message
      })
      .addCase(addNewPost.fulfilled, (state, action) => {
        state.posts.push(action.payload)
      }),
})
export const { postAdded, postUpdated, reactionAdded } = postsSlice.actions
export default postsSlice.reducer

export const selectAllPosts = (state) => state.posts.posts

export const selectPostById = (state, postId) =>
  state.posts.posts.find((post) => post.id === postId)
