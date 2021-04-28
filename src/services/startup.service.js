import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "/api/startup/";


const addStartup = (startup) => {
    return axios.post(API_URL + "add", startup, {headers: authHeader()});
};
const getStartups = (params)=>{
    return axios.get(API_URL,{params});
};
const displayStartups = () => {
    return axios.get(API_URL + "all");
};
const get = id => {
    return axios.get(API_URL+id);
};

const updateStartup = (id,startup) => {
    return axios.put(API_URL + "update/"+id, startup, {headers: authHeader()});
};

const deleteStartup =(id) => {
    return axios.delete(API_URL + "delete/"+id, {headers: authHeader()});
}

export default {
    addStartup,
    getStartups,
    get,
    updateStartup,
    displayStartups,
    deleteStartup,
};