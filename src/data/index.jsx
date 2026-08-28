import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_MOVIEDB_BASEURL;
const api_key = process.env.MOVIEDB_APIKEY;


export default axios.create({
    baseURL,
    // params: { api_key },
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${api_key}`
    }
});