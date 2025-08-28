import axios from "axios";
const baseUrl = "http://localhost:3001/api/persons";

const httpGet = async () => {
  return await axios.get(baseUrl).then((response) => response.data);
};

const httpPost = async (payload) => {
  return await axios.post(baseUrl, payload).then((response) => response.data);
};

const httpDelete = async (id) => {
  return await axios
    .delete(`${baseUrl}/${id}`)
    .then((response) => response.data);
};

const httpPut = async (id, payload) => {
  return await axios
    .put(`${baseUrl}/${id}`, payload)
    .then((response) => response.data);
};

export default { httpGet, httpPost, httpDelete, httpPut };
