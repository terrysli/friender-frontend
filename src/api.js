import axios from "axios";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://127.0.0.1:5000";

/** API Class.
 *
 * Static class tying together methods used to get/send to to the API.
 *
 */

class FrienderApi {

  static token;

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

  static async getFriendsOfUser(username) {
    let res = await this.request(`users/${username}/friends`);
    console.log("API getFriends:", res);
    return res.friends;
  }

  static async createUser({username, email, password, location, bio, friend_radius, photo }) {
    let res = await this.request(
      `users`,
      {username, email, password, location, bio, friend_radius, photo},
      "post"
      );
    return res.user;
  }
}

export default FrienderApi;