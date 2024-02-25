import http from "../utils/http.js";
import { secureStorage } from "../utils/secureStorage.js";

class AuthServices {
  constructor() {}

  static checkIfHasToken() {
    return secureStorage.getItem("token") !== null;
  }

  static async login(username = "", password = "") {
    var res = await http.post("api/auth/token/login/", {
      username,
      password
      // grant_type: process.env.VUE_APP_GRANT_TYPE,
      // client_id: process.env.VUE_APP_CLIENT_ID,
      // client_secret: process.env.VUE_APP_CLIENT_SECRET,
      // scope: process.env.VUE_APP_SCOPE
    });
    console.log("res", res, res.data);
    AuthServices.saveAccessToken(res.data);
    console.log("aqui no paso nada");
  }

  static saveAccessToken(tokenResponse) {
    secureStorage.setItem("token", `Token ${tokenResponse.auth_token}`);
    http.defaults.headers["Authorization"] = secureStorage.getItem("token");
    console.log("aqui 2");
  }

  static removeToken() {
    localStorage.clear();
    sessionStorage.clear();
  }

  static logout() {
    AuthServices.removeToken();
    delete http.defaults.headers["Authorization"];
  }
}

export default AuthServices;
export { AuthServices };
