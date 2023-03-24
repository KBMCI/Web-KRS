import axios from "axios";

export const urlMatkul = "http://localhost:8080/matkul";

export const url = axios.create({
  baseURL: "http://localhost:8080",
});
