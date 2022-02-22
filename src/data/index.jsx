import axios from 'axios';

export const baseURL = process.env.NEXT_PUBLIC_MOVIEDB_BASEURL;
const api_key = process.env.NEXT_PUBLIC_MOVIEDB_APIKEY;


export default axios.create({
    baseURL,
    params: { api_key },
    // headers: {
    //     'Access-Control-Allow-Origin': '*',
    //     'Content-Type': 'application/json;charset=utf-8'
    // },
    // withCredentials: true
});