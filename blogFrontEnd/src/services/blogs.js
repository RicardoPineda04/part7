import axios from "axios";
import storage from "./storage";
const baseUrl = "/api/blogs";

let token = null;

const getConfit = () => ({
  headers: { Authorization: `Bearer ${storage.loadUser().token}` },
});

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const getBlogInfo = async(id) => {
  const request = await axios.get(`${baseUrl}/${id}`)
  return request.data
}

const create = async (newObject) => {
  const response = await axios.post(baseUrl, newObject, getConfit());
  return response.data;
};

const update = async(id, newObject) => {
  const request = await axios.put(`${baseUrl}/${id}`, newObject, getConfit());
  return request.data;
};

const remove = async (id) => {
  const response = await axios.delete(`${baseUrl}/${id}`, getConfit());
  return response.data;
};

export default { getAll, create, update, remove, getBlogInfo };
