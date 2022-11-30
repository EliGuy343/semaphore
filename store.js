import { configureStore, createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name:'modalState',
  initialState: false,
  reducers: {
    setModalState(state, action) {
      state = action.payload
      return state;
    }
  }
});

const postIdSlice = createSlice({
  name:'postIdState',
  initialState: "",
  reducers: {
    setPostId(state, action) {
       state = action.payload;
       return state;
    }
  }
});


export const { setModalState } = modalSlice.actions;
export const { setPostId } = postIdSlice.actions;

export const store = configureStore({
  reducer: {
    modalState: modalSlice.reducer,
    postIdState: postIdSlice.reducer
  },
})