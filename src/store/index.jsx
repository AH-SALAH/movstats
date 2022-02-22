import { configureStore } from '@reduxjs/toolkit';
import moviesReducer from './features/movies/moviesSlice';
import usersReducer from './features/users/usersSlice';

export const store = configureStore({
    reducer: {
        movies: moviesReducer,
        users: usersReducer,
    }
});