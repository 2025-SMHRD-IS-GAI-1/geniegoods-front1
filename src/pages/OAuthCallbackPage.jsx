import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { getCurrentUser } from "../services/authService";
import { useAuthStore } from "../stores/authStore";

/**
 * OAuth2 로그인 콜백 페이지
 * 백엔드에서 httpOnly 쿠키로 토큰을 설정한 후 리다이렉트됨
 * 쿠키에 토큰이 설정되어 있으므로 사용자 정보를 조회하여 인증 상태 설정
 */
export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setUser } = useAuthStore();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // 이미 처리했으면 중복 실행 방지
    if (hasProcessed.current) {
      return;
    }

    // URL에서 에러 추출
    const error = searchParams.get("error");

    // 처리 시작 표시
    hasProcessed.current = true;

    if (error) {
      // 에러가 있으면 알림 표시 후 로그인 페이지로 이동
      alert(decodeURIComponent(error));
      navigate("/login", { replace: true });
      return;
    }

    // 쿠키에 토큰이 설정되어 있으므로 사용자 정보 조회
    // 성공하면 인증된 것으로 간주하고 사용자 정보 저장
    getCurrentUser()
      .then((userData) => {
        setUser(userData);
        // 메인 페이지로 이동
        navigate("/", { replace: true });
      })
      .catch((error) => {
        console.error("사용자 정보 로드 실패:", error);
        // 사용자 정보 로드 실패 시 로그인 페이지로 이동
        navigate("/login", { replace: true });
      });
  }, [searchParams, navigate, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg">로그인 처리 중...</p>
      </div>
    </div>
  );
}
