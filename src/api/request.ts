import axios from "axios";
import type { AxiosRequestConfig, AxiosResponse } from "axios";
import { defineStore } from "pinia";

const axiosStore = defineStore("axios", () => {
    

}

)

const axiosInstance = axios.create({
    baseURL: "http://localhost:3000/",
    timeout: 5000,
});
axiosInstance.interceptors.request.use(
    config => {
        if (store.state.token) {
            config.headers.token = store.state.token
        }
        return config;
    }
)

interface Data {
    [index: string]: unknown;
}
interface Http {
    get(
        url: string,
        data: Data,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse>;
    post(
        url: string,
        data: Data,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse>;
    put(
        url: string,
        data: Data,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse>;
    patch(
        url: string,
        data: Data,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse>;
    delete(
        url: string,
        data: Data,
        config?: AxiosRequestConfig
    ): Promise<AxiosResponse>;
}

const http: Http = {
    get(url, data, config) {
        return axiosInstance.get(url, {
            params: data,
            ...config,
        });
    },
    post(url: string, data: any, config: AxiosRequestConfig<any> | undefined) {
        return axiosInstance.post(url, data, config);
    },
    put(url, data, config) {
        return axiosInstance.put(url, data, config);
    },
    patch(url, data, config) {
        return axiosInstance.patch(url, data, config);
    },
    delete(url, data, config) {
        return axiosInstance.delete(url, {
            data,
            ...config,
        });
    },
}
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
export default http;
