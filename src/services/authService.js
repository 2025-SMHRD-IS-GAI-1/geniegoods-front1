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
 * 요청 인터셉터: 모든 요청 헤더에 Zustand에 저장된 토큰을 자동으로 추가
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 로그인 API 호출
 * @param {Object} loginData - { loginId, password }
 * @returns {Promise<Object>} { nickname, accessToken }
 */
export const login = async (loginData) => {
  try {
    const response = await apiClient.post("/api/members/login", loginData);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 서버에서 내려주는 에러 메시지가 문자열이면 사용, 아니면 기본 메시지
      const errorMessage =
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        error.message ||
        "로그인에 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("로그인에 실패했습니다.");
  }
};

/**
 * 로그아웃 API 호출
 * 서버에 로그아웃 알림 후 클라이언트의 Zustand 상태(토큰 등) 초기화
 */
export const logout = async () => {
  try {
    await apiClient.post("/api/members/logout");
  } catch (error) {
    // 로그아웃 실패 시에도 사용자 경험을 위해 클라이언트 상태는 지워주는 것이 좋음
    console.error("Logout API error:", error);
  } finally {
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
    return response.data;
  } catch (error) {
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
