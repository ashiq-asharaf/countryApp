import { configureStore } from "@reduxjs/toolkit";
import countriesReducer  from '../features/myCountries/MycountriesSlice';
import sliderReducer from '../features/mySlider/SliderSlice';
import loginReducer from '../features/myLogin/loginSlice'

export const store = configureStore({
    reducer: {
        countries: countriesReducer,
        slider: sliderReducer, 
        auth: loginReducer,
    }
});