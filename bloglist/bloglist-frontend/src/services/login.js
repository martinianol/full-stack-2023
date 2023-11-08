import axios from "axios";
const baseUrl = "http://localhost:3003/api/login";

const login = async (user) => {
  const response = await axios.post(baseUrl, user);
  return response.data;
};

export default { login };
