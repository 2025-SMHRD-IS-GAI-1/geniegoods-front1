import { create } from "zustand";

/**
 * 인증 상태 관리 Store
 * httpOnly 쿠키 기반 인증 사용 (토큰은 쿠키에 저장되어 JavaScript로 접근 불가)
 */
export const useAuthStore = create((set) => ({
  // 초기 상태 설정
  isAuthenticated: false, // API 호출로 확인
  user: null, // 사용자 정보

  // 인증 상태 설정 함수
  setAuthenticated: (isAuthenticated) => {
    set({ isAuthenticated });
  },

  // 사용자 정보 설정 함수
  setUser: (user) => {
    set({
      user,
      isAuthenticated: !!user, // 사용자 정보가 있으면 인증된 것으로 간주
      isLoggingOut: false, // 로그인 성공 시 로그아웃 플래그 해제
    });
  },

  // 로그아웃/인증 정보 삭제 함수
  clearAuth: () => {
    set({
      isAuthenticated: false,
      user: null,
    });
  },
}));
