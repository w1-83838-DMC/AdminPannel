import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  jobs:[],
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addJob: (state,job) => {
      console.log('inside addJob of card slice')
        console.log(job)
      state.jobs.push(job.payload)
    },

    clear:(state)=>{
      state.jobs = []
    },
    removeJob: (state) => {},
  },
})

// Action creators are generated for each case reducer function
export const { addJob,removeJob ,clear} = cartSlice.actions

export default cartSlice.reducer