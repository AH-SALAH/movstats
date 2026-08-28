import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_MOVIEDB_BASEURL;
const api_key = process.env.NEXT_PUBLIC_MOVIEDB_APIKEY;


export default axios.create({
    baseURL,
    params: {},
    headers: {
        accept: 'application/json',
        Authorization: `Bearer ${api_key}`
    }
});