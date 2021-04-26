import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "/api/review/";

const addReview = (review,startupId) => {
    return axios.post(API_URL + "add", review, {headers: authHeader(),params:{startupId:startupId}});
};

const updateReview = (review,startupId) => {
    return axios.put(API_URL + "update", review, {headers: authHeader(),params:{startupId:startupId}});
};

const getStartupRating = id => {
    return axios.get(API_URL+"startupInfo/"+id);
};
const checkUserWrittenReview = (params)=>{
    return axios.get(API_URL+"checkUserWrittenReview",{params});
};
const getSpecificReview = (params)=>{
    return axios.get(API_URL+"getReviewFromStartupAndUser",{params});
};
export default {
    addReview,
    getStartupRating,
    checkUserWrittenReview,
    getSpecificReview,
    updateReview,
};