import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { getBaseUrl } from "../stores/apiStore";

const API_BASE_URL = getBaseUrl();

/**
 * axios 인스턴스 생성
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // CORS 쿠키 전송 및 세션 관리를 위해 필요
});

/**
 * 응답 인터셉터: 401 에러 시 인증 상태 초기화
 * httpOnly 쿠키 기반 인증 사용 (토큰은 쿠키에 자동으로 포함됨)
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // 401 Unauthorized 에러 시 인증 상태 초기화
      useAuthStore.getState().clearAuth();
    }
    return Promise.reject(error);
  }
);

export const changeSubScribePlan = async (subscriptionPlan) => {
  try {
    const response = await apiClient.post(
      "/api/subscribe/change-plan",
      subscriptionPlan
    );
    return response.data;
  } catch (error) {
    throw new Error("구독 PRO 플랜 변경에 실패했습니다.");
  }
};
