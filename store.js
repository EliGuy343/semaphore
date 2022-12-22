import { configureStore, createSlice } from '@reduxjs/toolkit';

const modalSlice = createSlice({
  name:'modalState',
  initialState: {
    isOpen:false,
    postId:""
  },
  reducers: {
    setIsOpen(state, action) {
      state.isOpen = action.payload;
      return state;
    },
    setPostId(state, action) {
      state.postId = action.payload;
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

const advancedSearchModalSlice = createSlice({
  name:'advancedSearchModalState',
  initialState: {
    isOpen: false,
  },
  reducers: {
    setSearchIsOpen(state, action) {
      state.isOpen = action.payload;
      return state;
    },
  }
})

export const { setIsOpen, setPostId } = modalSlice.actions;
export const {openPhoto, closePhoto} = photoModalSlice.actions;
export const { setSearchIsOpen } = advancedSearchModalSlice.actions;

export const store = configureStore({
  reducer: {
    modalState: modalSlice.reducer,
    photoModalState: photoModalSlice.reducer,
    advancedSearchModalState: advancedSearchModalSlice.reducer,
  },
})