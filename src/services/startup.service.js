import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "/api/startup/";


const addStartup = (startup) => {
    return axios.post(API_URL + "add", startup, {headers: authHeader()});
};
const getStartups = (params)=>{
    return axios.get(API_URL,{params});
};
const get = id => {
    return axios.get(API_URL+id);
};

export default {
    addStartup,
    getStartups,
    get,

};