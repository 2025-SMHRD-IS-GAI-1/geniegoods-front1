import { useEffect, useRef } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuthStore } from "../stores/authStore";
import { getCurrentUser } from "../services/authService";

/**
 * OAuth2 로그인 콜백 페이지
 * 백엔드에서 리다이렉트된 토큰을 받아서 저장하고 메인 페이지로 이동
 */
export default function OAuthCallbackPage() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { setAccessToken, setUser } = useAuthStore();
  const hasProcessed = useRef(false);

  useEffect(() => {
    // 이미 처리했으면 중복 실행 방지
    if (hasProcessed.current) {
      return;
    }

    // URL에서 토큰과 에러 추출
    const token = searchParams.get("token");
    const error = searchParams.get("error");

    // 처리 시작 표시
    hasProcessed.current = true;

    if (error) {
      // 에러가 있으면 알림 표시 후 로그인 페이지로 이동
      alert(decodeURIComponent(error));
      navigate("/login", { replace: true });
      return;
    }

    if (token) {
      // 토큰 저장
      setAccessToken(token);
      
      // 사용자 정보 로드
      getCurrentUser()
        .then((userData) => {
          setUser(userData);
          // 메인 페이지로 이동
          navigate("/", { replace: true });
        })
        .catch((error) => {
          console.error("사용자 정보 로드 실패:", error);
          // 사용자 정보 로드 실패해도 메인 페이지로 이동
          navigate("/", { replace: true });
        });
    } else {
      // 토큰이 없으면 로그인 페이지로 이동
      navigate("/login", { replace: true });
    }
  }, [searchParams, navigate, setAccessToken, setUser]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <p className="text-lg">로그인 처리 중...</p>
      </div>
    </div>
  );
}
