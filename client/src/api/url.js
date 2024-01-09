import axios from "axios";

export const url = axios.create({
  baseURL: "http://api.desasumberpucung.web.id/api/",
  // baseURL: "http://localhost:8080",
});
