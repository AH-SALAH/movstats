import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getTopRated, getDetails, getPopular, searchMovie, sortMovie, rateMovie } from '@/data/movies';

let initialState = {
    loading: true,
    moviesData: [],
    movieDetails: {},
    searchValue: '',
    sortValue: '',
    rating: { loading: false },
    top10: []
};

export const fetchAllMovies = createAsyncThunk('movies/fetchAllMovies', async (page) => {
    let { data } = await getPopular({ page });
    return data;
});

export const fetchMovieDetails = createAsyncThunk('movies/fetchMovieDetails', async (id) => {
    let { data } = await getDetails(id, { append_to_response: 'credits,similar' });
    return data;
});

export const searchAllMovies = createAsyncThunk('movies/searchAllMovies', async ({ searchValue, page }) => {
    let { data } = await searchMovie({ query: encodeURI(searchValue), page });
    return data;
});

export const sortAllMovies = createAsyncThunk('movies/sortAllMovies', async ({ sort_by, page }) => {
    let { data } = await sortMovie({ sort_by: sort_by, page });
    return data;
});

export const fetchTop10 = createAsyncThunk('movies/fetchTop10', async () => {
    let { data } = await getTopRated();
    return data;
});

export const rateTheMovie = createAsyncThunk('movies/rateTheMovie', async ({ movie_id, value }) => {
    if (localStorage.getItem('rated_movie_' + movie_id)) return false;

    let { data } = await rateMovie(movie_id, value);
    return { ...data, movie_id, value };
});

export const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        setSearchValue: (state, { payload }) => {
            state.searchValue = payload;
        },
        setSortValue: (state, { payload }) => {
            state.sortValue = payload;
        },
    },
    extraReducers: (builder) => {
        // get movie details cases
        builder.addCase(fetchMovieDetails.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchMovieDetails.fulfilled, (state, { payload }) => {
            state.movieDetails = payload;
            state.loading = false;
        });
        builder.addCase(fetchMovieDetails.rejected, (state) => {
            state.loading = false;
        });

        // get all movies cases
        builder.addCase(fetchAllMovies.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchAllMovies.fulfilled, (state, { payload }) => {
            state.moviesData = payload;
            state.loading = false;
        });
        builder.addCase(fetchAllMovies.rejected, (state) => {
            state.loading = false;
        });

        // search movies cases
        builder.addCase(searchAllMovies.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(searchAllMovies.fulfilled, (state, { payload }) => {
            state.moviesData = payload;
            state.loading = false;
        });
        builder.addCase(searchAllMovies.rejected, (state) => {
            state.loading = false;
        });

        // sort movies cases
        builder.addCase(sortAllMovies.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(sortAllMovies.fulfilled, (state, { payload }) => {
            state.moviesData = payload;
            state.loading = false;
        });
        builder.addCase(sortAllMovies.rejected, (state) => {
            state.loading = false;
        });

        // sort movies cases
        builder.addCase(rateTheMovie.pending, (state) => {
            state.rating.loading = true;
        });
        builder.addCase(rateTheMovie.fulfilled, (state, { payload }) => {
            localStorage.setItem('rated_movie_' + payload.movie_id, payload.value);
            state.rating.loading = false;
        });
        builder.addCase(rateTheMovie.rejected, (state) => {
            state.rating.loading = false;
        });

        // sort top10 cases
        builder.addCase(fetchTop10.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchTop10.fulfilled, (state, { payload }) => {
            state.top10 = payload?.results?.slice(0, 10);
            state.loading = false;
        });
        builder.addCase(fetchTop10.rejected, (state) => {
            state.loading = false;
        });
    },
})

// Action creators are generated for each case reducer function
export const { setSearchValue, setSortValue } = moviesSlice.actions;

export default moviesSlice.reducer;