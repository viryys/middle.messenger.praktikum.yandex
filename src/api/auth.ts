import HTTPTransport from "../utils/HTTPTransport";
import { BodyRequest } from "../utils/types";

export default class AuthAPI {
  private api = new HTTPTransport();

  public signIn(data: BodyRequest) {
    const options = {
      data,
    };

    return this.api.post("/auth/signin", options);
  }

  public logout() {
    const options = {};

    return this.api.post("/auth/logout", options);
  }

  public getCurrentUser() {
    return this.api.get("/auth/user");
  }

  public signUp(data: BodyRequest) {
    const options = {
      data,
    };

    return this.api.post("/auth/signup", options);
  }
}
