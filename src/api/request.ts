import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { useUserStore } from "@/stores/userStore";


let userStore = useUserStore();

const axiosInstance = axios.create({
    baseURL: "http://localhost:8080/",
    timeout: 5000,
});
axiosInstance.interceptors.request.use(
    config => {
        if (userStore.userINfo.token) {
            config.headers.token = userStore.userINfo.token;
        }
        return config;
    }
)

axiosInstance.interceptors.response.use(
    (response): any => {
        const res = response.data;
        return res;
    },
    (error) => {
        console.log("err" + error);

        return Promise.reject(error);
    }
);
export default axiosInstance;
