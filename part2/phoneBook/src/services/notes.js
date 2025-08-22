import axios from "axios";
const baseUrl = "http://localhost:3001/persons";

const httpGet = async () => {
  return await axios.get(baseUrl).then((response) => response.data);
};

const httpPost = async (payload) => {
  return await axios.post(baseUrl, payload).then((response) => response.data);
};

export default { httpGet, httpPost };
