import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { getBaseUrl } from "../stores/apiStore";

const API_BASE_URL = getBaseUrl();

/**
 * axios 인스턴스 생성
 * httpOnly 쿠키 기반 인증 사용 (토큰은 쿠키에 자동으로 포함됨)
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // CORS 쿠키 전송 및 세션 관리를 위해 필요
});

/**
 * 응답 인터셉터: 401 에러 시 refreshToken으로 accessToken 갱신 시도
 */
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // refresh 엔드포인트 자체가 401이면 무한 루프 방지
      if (originalRequest.url?.includes("/refresh")) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(error);
      }

      // /api/user/me는 사용자 정보 확인용이므로 refresh 시도하지 않음
      // (로그아웃 상태에서 호출될 수 있음)
      if (originalRequest.url?.includes("/api/user/me")) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(error);
      }

      // 이미 재시도한 요청이면 무한 루프 방지
      if (originalRequest._retry) {
        useAuthStore.getState().clearAuth();
        return Promise.reject(error);
      }

      originalRequest._retry = true;

      try {
        // refreshToken으로 accessToken 갱신 시도
        await apiClient.post("/api/user/refresh");
        // 갱신 성공 시 원래 요청 재시도
        return apiClient(originalRequest);
      } catch (refreshError) {
        // refreshToken도 만료된 경우 로그아웃
        useAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

/**
 * 로그아웃 API 호출
 * 서버에서 httpOnly 쿠키 삭제
 * 주의: clearAuth()는 호출하지 않음 (호출하는 쪽에서 처리)
 */
export const logout = async () => {
  try {
    await apiClient.post("/api/user/logout");
  } catch (error) {
    // 쿠키는 이미 삭제되었을 수 있으므로 에러는 무시
    console.error("로그아웃 API 호출 실패:", error);
  }
};

/**
 * 소셜 로그인 시작 (OAuth2 리다이렉트)
 * @param {string} provider - 'google', 'kakao', 'naver'
 */
export const socialLogin = (provider) => {
  const validProviders = ["google", "kakao", "naver"];

  if (!validProviders.includes(provider)) {
    throw new Error("지원하지 않는 소셜 로그인입니다.");
  }

  // Spring Security OAuth2 기본 엔드포인트로 이동
  window.location.href = `${API_BASE_URL}/oauth2/authorization/${provider}`;
};

/**
 * 현재 로그인한 사용자 정보 조회
 * @returns {Promise<Object>} 사용자 정보 { userId, nickname, profileUrl, ... }
 */
export const getCurrentUser = async () => {
  try {
    const response = await apiClient.get("/api/user/me");

    // Content-Type 확인
    const contentType = response.headers?.["content-type"] || "";
    if (contentType.includes("text/html")) {
      const authError = new Error("Unauthorized");
      authError.response = { status: 401 };
      authError.status = 401;
      throw authError;
    }

    // 응답이 HTML인지 확인 (대소문자 구분 없이)
    if (typeof response.data === "string") {
      const trimmedData = response.data.trim();
      if (
        trimmedData.toLowerCase().startsWith("<!doctype") ||
        trimmedData.toLowerCase().startsWith("<html") ||
        trimmedData.startsWith("<!DOCTYPE")
      ) {
        const authError = new Error("Unauthorized");
        authError.response = { status: 401 };
        authError.status = 401;
        throw authError;
      }
    }
    
    return response.data;
  } catch (error) {
    // 401 에러는 인증되지 않은 상태이므로 그대로 전달
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      const authError = new Error("Unauthorized");
      authError.response = error.response;
      authError.status = 401;
      throw authError;
    }

    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "사용자 정보를 가져오는데 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("사용자 정보를 가져오는데 실패했습니다.");
  }
};
