// src/services/api.js
import axios from "axios";

const API = axios.create({
  baseURL: "https://eventos-reserv.onrender.com/api/",
  // timeout: 10000,
});

export default API;
