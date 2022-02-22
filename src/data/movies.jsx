import axios from '.';

export const getGuestSession = () => axios.get('authentication/guest_session/new');

export const getDetails = (movie_id, params) => axios.get(`movie/${movie_id}`, { params });
export const getPopular = (params) => axios.get('movie/popular', { params });
export const getTopRated = (params) => axios.get('movie/top_rated', { params });
export const searchMovie = (params) => axios.get(`search/movie`, { params });
export const sortMovie = (params) => axios.get(`discover/movie`, { params });
export const rateMovie = (movie_id, value) => axios.post(`movie/${movie_id}/rating`, { value });