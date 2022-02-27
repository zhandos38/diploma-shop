import axios from "axios";
export const baseApi = axios.create({
    baseURL: process.env.APP_URL,
    headers: {
        "Content-type": "application/json",
    },
});
const TIMEOUT = 1000000;
export const onRequestSuccess = async (config) => {
    // await store.dispatch(LoaderActions.SET_LOADER, true);
    const token = localStorage.getItem("token");
    if (token) {
        if (!config.headers) {
            config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;
    }
    config.timeout = TIMEOUT;
    return config;
};
export const setupAxiosInterceptors = () => {
    const onResponseError = async (err) => {
        // await store.dispatch(LoaderActions.SET_LOADER, false);
        return Promise.reject(err);
    };
    const onResponseSuccess = async (response) => {
        // await store.dispatch(LoaderActions.SET_LOADER, false);
        return response;
    };
    if (baseApi.interceptors) {
        baseApi.interceptors.request.use(onRequestSuccess);
        baseApi.interceptors.response.use((response) => onResponseSuccess(response), (error) => onResponseError(error));
    }
};
export function getIpAddress() {
    return process.env.VUE_APP_API_URL || "http://localhost:4090";
}
export function getUrlAddress(route) {
    const ipAddress = getIpAddress();
    return ipAddress + "/" + route;
}
//# sourceMappingURL=config.js.map