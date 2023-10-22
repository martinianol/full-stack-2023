import axios from "axios";
const baseUrl = "http://localhost:3003/api/blogs";

let token = null;

const setToken = (newToken) => {
  token = `Bearer ${newToken}`;
};

const getAll = async () => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.get(baseUrl, config);
  return response.data;
};

const createBlog = async (blog) => {
  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.post(baseUrl, blog, config);
  return response.data;
};

const editBlog = async (blog) => {
  const url = baseUrl + "/" + blog.id;

  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.put(url, blog, config);
  return response.data;
};

const deleteBlog = async (blogId) => {
  const url = baseUrl + "/" + blogId;

  const config = {
    headers: { Authorization: token },
  };

  const response = await axios.delete(url, config);
  return response.data;
};

export default { getAll, createBlog, editBlog, deleteBlog, setToken };
