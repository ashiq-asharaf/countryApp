import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  slides: [
    { src: 'https://via.placeholder.com/800x400?text=Image+1', alt: 'Slide 1' },
    { src: 'https://via.placeholder.com/800x400?text=Image+2', alt: 'Slide 2' },
    { src: 'https://via.placeholder.com/800x400?text=Image+3', alt: 'Slide 3' },
    { src: 'https://via.placeholder.com/800x400?text=Image+4', alt: 'Slide 4' },
  ],
  currentIndex: 0,
};

const sliderSlice = createSlice({
  name: 'slider',
  initialState,
  reducers: {
    nextSlide(state) {
      state.currentIndex = (state.currentIndex + 1) % state.slides.length;
    },
    prevSlide(state) {
      state.currentIndex = (state.currentIndex - 1 + state.slides.length) % state.slides.length;
    },
    goToSlide(state, action) {
      state.currentIndex = action.payload;
    },
  },
});

export const { nextSlide, prevSlide, goToSlide } = sliderSlice.actions;
export default sliderSlice.reducer;
