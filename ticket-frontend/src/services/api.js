import axios from "axios";

const API = axios.create({
  baseURL:
    "https://vj92xp9pyd.execute-api.us-east-1.amazonaws.com/prod"
});

export default API;