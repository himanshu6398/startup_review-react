import axios from 'axios';

const url = "https://localhost:8081:/user/signup";

class UserService {

    getUser() {
        return axios.get(url);
    }
    createUser(user)  {
        return axios.post(url, user);
    }
}

export default new UserService();