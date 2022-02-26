import { useToast } from "primevue/usetoast";
import { LoaderActions } from "@/store/loader";
import router from "@/router";
import axios from "axios";
import { store } from "@/store/index";

export const baseApi = axios.create({
  baseURL: process.env.APP_URL,
  headers: {
    "Content-type": "application/json",
  },
});

const TIMEOUT = 1000000;

export const onRequestSuccess = async (config: any) => {
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

export const setupAxiosInterceptors = (onUnauthenticated: () => void) => {
  const onResponseError = async (err: {
    status: any;
    response: { status: any; data: any };
  }) => {
    // await store.dispatch(LoaderActions.SET_LOADER, false);

    return Promise.reject(err);
  };
  const onResponseSuccess = async (response: any) => {
    // await store.dispatch(LoaderActions.SET_LOADER, false);

    return response;
  };
  if (baseApi.interceptors) {
    baseApi.interceptors.request.use(onRequestSuccess);
    baseApi.interceptors.response.use(
      (response) => onResponseSuccess(response),
      (error) => onResponseError(error)
    );
  }
};

export function getIpAddress(): string {
  return process.env.VUE_APP_API_URL || "localhost:4080";
}

export function getUrlAddress(route: string): string {
  const ipAddress = getIpAddress();
  return ipAddress + "/" + route;
}
