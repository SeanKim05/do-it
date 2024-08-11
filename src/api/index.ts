import axios from "axios";

const getApiHost = () => {
  const api = process.env.NEXT_PUBLIC_API_URL;
  return api;
};
const api = axios.create({
  baseURL: getApiHost(),
});

api.interceptors.request.use((request: any) => {
  const token = localStorage.getItem("token");
  if (!request.headers.Authorization) {
    request.headers = {
      Authorization: `Bearer ${token}`,
    };
  }

  return request;
});

export default api;
