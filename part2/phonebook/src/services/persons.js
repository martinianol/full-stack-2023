import axios from "axios";

const baseUrl = "http://localhost:3001/persons";

const getAll = () => {
  const request = axios.get(baseUrl);
  return request.then((response) => response.data);
};

const create = (payload) => {
  const request = axios.post(baseUrl, payload);
  return request.then((response) => response.data);
};

const deletePerson = (id) => {
  const deleteUrl = `${baseUrl}/${id}`;
  const request = axios.delete(deleteUrl);
  return request.then((response) => response);
};

export default {
  getAll,
  create,
  deletePerson,
};
