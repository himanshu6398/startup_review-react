import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "/api/comment/";

const addComment = (comment) => {
    return axios.post(API_URL + "add", comment, {headers: authHeader()});
};
const getCommentsFromStartupID= (params)=>{
    return axios.get(API_URL+"getAllComments",{params});
}
const getFirst3Comments=(params)=>{
    return axios.get(API_URL+"getFirst3Comments",{params});
}
const getCommentFromId=(params)=>{
    return axios.get(API_URL+"getCommentFromId",{params});
}
const updateComment = (comment) => {
    return axios.put(API_URL + "update", comment, {headers: authHeader()});
};
export default {
    addComment,
    getFirst3Comments,
    getCommentsFromStartupID,
    getCommentFromId,
    updateComment,
};