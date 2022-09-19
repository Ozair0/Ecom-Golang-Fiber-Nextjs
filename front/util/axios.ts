import axios from "axios";
import getConfig from "next/config";
const { publicRuntimeConfig } = getConfig();

const Axios = axios.create({
  withCredentials: true,
  baseURL: publicRuntimeConfig.backendUrl,
});

export default Axios;
