import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    data: [],
    displayedData: [],
    status: 'idle',
    filter: 'All',
    page: 0,
    hasMore: true,
};

export const fetchCountries = createAsyncThunk('countries/fetchCountries', async () => {
    const response = await axios.get(`https://restcountries.com/v2/all?fields=name,region,flag`);
    return response.data;
});

const countriesSlice = createSlice({
    name: 'countries',
    initialState,
    reducers: {
        setFilter(state, action) {
            state.filter = action.payload;
            state.page = 0;
            const filteredData = getFilteredData(state.data, action.payload);
            state.displayedData = filteredData.slice(0, 12);
            state.hasMore = filteredData.length > 12; 
        },
        loadMore(state) {
            if (!state.hasMore) return; 

            state.page += 1;
            const filteredData = getFilteredData(state.data, state.filter);
            const start = state.page * 12;
            const end = start + 12;

            if (start >= filteredData.length) {
                state.hasMore = false;
                return;
            }

            state.displayedData = filteredData.slice(0, end);
            state.hasMore = end < filteredData.length; 
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchCountries.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchCountries.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.data = action.payload;
                const filteredData = getFilteredData(action.payload, state.filter);
                state.displayedData = filteredData.slice(0, 12);
                state.hasMore = filteredData.length > 12; 
            })
            .addCase(fetchCountries.rejected, (state) => {
                state.status = 'failed';
            });
    },
});

const getFilteredData = (data, filter) => {
    if (filter === 'All') {
        return data;
    }
    return data.filter(item => item.region === filter);
};

export const { setFilter, loadMore } = countriesSlice.actions;
export default countriesSlice.reducer;
