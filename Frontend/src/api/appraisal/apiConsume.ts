import axios from "axios";
import { Properties } from "../../types/appraisal/properties/properties";
const { REACT_APP_API_URL } = process.env;
const config = {
  responseType: "blob",
  headers: {
    Authorization: "Basic",
    "Content-Type": "application/json",
    Accept: "application/json",
    "Access-Control-Allow-Credentials": "true",
  },
};
export const postCollection = async (payload: Properties) =>
  axios
    .post(`${REACT_APP_API_URL}/APPRAISAL/report/collection`, config)
    .then((response) => response.data);
