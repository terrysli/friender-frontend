import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:5000";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class FrienderApi {

  static token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY4MzI2ODY2NiwianRpIjoiZmQ0ZDZhMDUtM2Y5NC00YmUzLWFlNTYtYjIzYjkyNjhhYzYxIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6ImpkYXdnIiwibmJmIjoxNjgzMjY4NjY2LCJleHAiOjE2ODMyNjk1NjYsImlzX2FkbWluIjp0cnVlfQ.rhE18i83mLpO1Hok_pkeUU8iPyApkcZj6QO9FX438uk";

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

  /** Get data on a single user */
  static async getUserData(username) {
    let res = await this.request(`users/${username}`);
    return res.user;
  }

  /** Create new user and add to db */
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
}

export default FrienderApi;