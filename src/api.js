import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class FrienderApi {

  // TODO: This token expires after a few minutes! Must be refreshed for app to
  // work as logged in user
  static token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4MzMwNTQ1NCwianRpIjoiN2JiYmE0YTItNzgxNC00OWFjLThkNzQtYTEwN2I3ZGU2MWYzIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImpkYXdnIiwibmJmIjoxNjgzMzA1NDU0LCJpc19hZG1pbiI6dHJ1ZX0.jXxfuGiIs4D4F8EX9eF5KlJ1Q3ZkDvaNaCM7ATeL4MM";

  static async request(endpoint, data = {}, method = "get") {
    console.debug("API Call:", endpoint, data, method);

    const url = `${BASE_URL}/${endpoint}`;
    const headers = { Authorization: `Bearer ${FrienderApi.token}` };
    const params = (method === "get")
      ? data
      : {};

    try {
      return (await axios({ url, method, data, params, headers })).data;
    } catch (err) {
      console.error("API Error:", err.response);
      let message = err.response.data.error.message;
      throw Array.isArray(message) ? message : [message];
    }
  }

  // Individual API routes

  /** Get data on a single user. */
  static async getUserData(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Create new user and add to db. */
  static async createUser(data) {
    console.log("createUser data=", data);
    let res = await this.request(`users`, data, "post");
    return res.user;
  }

  /** Get array of accepted friends of user */
  static async getFriendsOfUser(username) {
    let res = await this.request(`users/${username}/friends`);
    return res.friends;
  }

  /** Get array of messages sent or received by user */
  static async getMessagesOfUser(username) {
    let res = await this.request(`users/${username}/messages`);
    return res.messages;
  }

  // ########## Auth Routes

  /** Get token for login from username, password. */
  static async login(data) {
    let res = await this.request(`auth/login`, data, "post");
    return res.token;
  }

  /** Signup for site. */
  static async signup(data) {
    let res = await this.request(`auth/register`, data, "post");
    return res.token;
  }
}

export default FrienderApi;