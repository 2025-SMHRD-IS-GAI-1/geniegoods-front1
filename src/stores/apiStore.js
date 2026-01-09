import { create } from "zustand";

const API_BASE_URL = "http://localhost:8090";

// baseurl 설정
export const getBaseUrl = () => {
  return API_BASE_URL;
};
