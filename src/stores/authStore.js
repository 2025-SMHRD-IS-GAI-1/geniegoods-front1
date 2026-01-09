import { create } from "zustand";

const TOKEN_STORAGE_KEY = "auth-token";

// localStorage에서 토큰 로드
const loadTokenFromStorage = () => {
  if (typeof window !== "undefined") {
    return localStorage.getItem(TOKEN_STORAGE_KEY);
  }
  return null;
};

// localStorage에 토큰 저장
const saveTokenToStorage = (token) => {
  if (typeof window !== "undefined") {
    if (token) {
      localStorage.setItem(TOKEN_STORAGE_KEY, token);
    } else {
      localStorage.removeItem(TOKEN_STORAGE_KEY);
    }
  }
};

/**
 * 인증 상태 관리 Store
 */
export const useAuthStore = create((set) => ({
  // 초기 상태 설정
  accessToken: loadTokenFromStorage(),
  isAuthenticated: !!loadTokenFromStorage(),
  user: null, // 사용자 정보

  // 토큰 저장 함수
  setAccessToken: (token) => {
    saveTokenToStorage(token);
    set({
      accessToken: token,
      isAuthenticated: !!token,
    });
  },

  // 사용자 정보 설정 함수
  setUser: (user) => {
    set({ user });
  },

  // 로그아웃/인증 정보 삭제 함수
  clearAuth: () => {
    saveTokenToStorage(null);
    set({
      accessToken: null,
      isAuthenticated: false,
      user: null,
    });
  },
}));
