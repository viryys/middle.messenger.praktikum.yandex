import HTTPTransport from "../utils/HTTPTransport";
import { BodyRequest } from "../utils/types";

export default class UserAPI {
  private api = new HTTPTransport();

  public changePassword(data: BodyRequest) {
    const options = {
      data,
    };

    return this.api.put("/user/password", options);
  }

  public editProfile(data: BodyRequest) {
    const options = {
      data,
    };

    return this.api.put("/user/profile", options);
  }

  public findUser(login: string) {
    const options = {
      data: { login },
    };

    return this.api.post("/user/search", options);
  }
}
