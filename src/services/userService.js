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

/**
 * 프로필 이미지 업로드
 * @param {File} file - 업로드할 이미지 파일
 * @returns {Promise<Object>} { message, profileUrl }
 */
export const uploadProfileImage = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiClient.post("/api/user/profile-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.error ||
        error.response?.data?.message ||
        error.message ||
        "프로필 이미지 업로드에 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("프로필 이미지 업로드에 실패했습니다.");
  }
};

/**
 * 회원 탈퇴
 * @returns {}
 */
export const withdrawUser = async () => {
  try {
    const response = await apiClient.delete("/api/user/me/withdraw");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "회원 탈퇴에 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("회원 탈퇴에 실패했습니다.");
  }
};

/**
 * 닉네임 중복체크
 * @param {} nickname
 * @returns
 */
export const checkNicknameDuplicate = async (nickname) => {
  try {
    const response = await apiClient.get("/api/user/nickname/check", {
      params: { nickname },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "닉네임 중복확인에 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("닉네임 중복확인에 실패했습니다.");
  }
};

/**
 * 닉네임 변경
 * @param {} nickname
 * @returns
 */
export const updateNickname = async (nickname) => {
  try {
    const response = await apiClient.patch("/api/user/nickname/update", {
      nickname,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "닉네임 변경에 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("닉네임 변경에 실패했습니다.");
  }
};
