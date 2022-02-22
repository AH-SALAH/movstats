import { createSlice, createAsyncThunk, current } from '@reduxjs/toolkit';
import { getGuestSession } from '@/data/movies';
import axios from '@/data';

let initialState = {
    loading: false,
    guestSessionId: null 
};

export const reqGuestSession = createAsyncThunk('users/reqGuestSession', async () => {
    let { data } = await getGuestSession();
    return data;
});


export const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {
    },
    extraReducers: (builder) => {
        // get guest cases
        builder.addCase(reqGuestSession.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(reqGuestSession.fulfilled, (state, { payload }) => {
            state.guestSessionId = payload;
            localStorage.setItem('g_session', payload.guest_session_id);
            axios.defaults.params.guest_session_id = payload.guest_session_id;
            state.loading = false;
            console.log("state: ", current(state));
        });
        builder.addCase(reqGuestSession.rejected, (state) => {
            state.loading = false;
        });
    },
})

// Action creators are generated for each case reducer function
// export const {  } = usersSlice.actions;

export default usersSlice.reducer;