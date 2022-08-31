import axios from "axios"
import config from "../config.json"

export const client = async (
    method,
    endpoints,
    data,
    auth,
    headers
  ) => {
    try {
      const response = await axios({
        method,
        data,
        headers: {
          ...headers,
          Authorization: auth ? "Bearer " + auth : "",
        },
        url: (__DEV__ ? config.DEV_API_URL : config.API_URL)  + endpoints,
        withCredentials: true,
      });
      return {
        data: response.data.data,
        error: false,
        status: 200,
        message: response.data.message,
      };
    } catch (response) {
      return {
        data: response.response.data.data,
        status: response.response.data.status,
        error: true,
        message: response.response.data.message,
      };
    }
  };