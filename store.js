import { configureStore, createSlice } from '@reduxjs/toolkit';

//TODO:Combine modalSlice and PostIdSlice

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

const photoModalSlice = createSlice({
  name:'photoModalState',
  initialState: {
    postId:'',
    isOpen:false
  },
  reducers: {
    openPhoto(state, action) {
      state.photoUrl = action.payload.photoUrl;
      state.isOpen = true;
      return state;
    },
    closePhoto(state) {
      state.photoUrl = "";
      state.isOpen = false;
      return state;
    }
  }
})


export const { setModalState } = modalSlice.actions;
export const { setPostId } = postIdSlice.actions;
export const {openPhoto, closePhoto} = photoModalSlice.actions;

export const store = configureStore({
  reducer: {
    modalState: modalSlice.reducer,
    postIdState: postIdSlice.reducer,
    photoModalState: photoModalSlice.reducer
  },
})