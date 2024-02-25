/** Instancia de axios pre configurado */
import axios from "axios";
import * as buildUrl from "axios/lib/helpers/buildURL";
import { secureStorage } from "./secureStorage.js";

const axiosRequests = axios.create({
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: secureStorage.getItem("token")
  }
});

const http = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  headers: {
    "Access-Control-Allow-Origin": "*",
    Authorization: secureStorage.getItem("token")
  }
});

function getFromStorage(url = "", config = {}) {
  url = buildUrl(url, config.params);
  var stringValue = secureStorage.getItem(url);
  if (stringValue && !config.NO_CACHE) {
    return new Promise((rsv) => {
      rsv(JSON.parse(stringValue));
    });
  } else {
    return new Promise((rsv) => {
      http.get(url).then(({ data }) => {
        secureStorage.setItem(url, JSON.stringify(data));
        rsv(data);
      });
    });
  }
}

http.getFromStorage = getFromStorage;

export default http;
export { getFromStorage, axiosRequests };
