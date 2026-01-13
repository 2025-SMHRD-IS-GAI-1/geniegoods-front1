import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { logout, getCurrentUser } from "../../services/authService";
import defaultProfileIcon from "../../assets/img/defaultProfileIcon.png";

export default function Header() {
  const navigate = useNavigate();
  const {
    isAuthenticated,
    user,
    setUser,
    clearAuth,
    isLoggingOut,
    setLoggingOut,
  } = useAuthStore();
  const hasProcessed = useRef(false);

  // 사용자 정보 로드 (쿠키 기반 인증)
  useEffect(() => {
    // 로그아웃 중이면 사용자 정보를 확인하지 않음
    if (isLoggingOut) {
      return;
    }

    // user가 이미 있으면 인증 확인 완료
    if (user) {
      hasProcessed.current = true;
      return;
    }

    // 이미 처리했으면 중복 실행 방지
    if (hasProcessed.current) {
      return;
    }

    // 처리 시작 표시
    hasProcessed.current = true;

    // 쿠키에 토큰이 있는지 확인하기 위해 사용자 정보 조회
    // 성공하면 인증된 것으로 간주
    getCurrentUser()
      .then((userData) => {
        // 사용자 정보가 있으면 설정
        if (userData) {
          setUser(userData);
        }
        hasProcessed.current = true;
      })
      .catch((error) => {
        // 사용자 정보 로드 실패 시 명시적으로 인증 상태 초기화
        // 401 에러는 정상적인 로그아웃 상태이므로 로그를 남기지 않음
        const status = error?.response?.status || error?.status;
        if (status !== 401) {
          console.error("사용자 정보 로드 실패:", error);
        }
        // 인증 상태 확실히 초기화
        clearAuth();
        // 로그아웃 상태로 간주하여 다시 호출하지 않도록
        hasProcessed.current = true;
      });
  }, [user, setUser, clearAuth, isLoggingOut]);

  const handleLogout = async () => {
    // 로그아웃 시작 플래그 설정 (즉시 UI 업데이트)
    setLoggingOut(true);
    // 상태 초기화
    clearAuth();

    try {
      // 로그아웃 API 호출 (쿠키 삭제)
      await logout();
    } catch (error) {
      console.error("로그아웃 처리 중 오류:", error);
    }

    // 약간의 지연 후 페이지 새로고침 (상태 업데이트가 완료되도록)
    setTimeout(() => {
      window.location.replace("/login");
    }, 100);
  };

  return (
    <header className="bg-white border-b border-[#e5e7eb] h-14 w-full relative z-50">
      <div className="h-full flex items-center justify-between px-4 md:px-8 max-w-[1440px] mx-auto">
        {/* 왼쪽: 로고 + 네비 */}
        <div className="flex items-center gap-8">
          {/* 로고 */}
          <p
            onClick={() => navigate("/")}
            className="text-[18px] md:text-[20px] text-[#4a3f35] font-normal leading-[28px] cursor-pointer"
          >
            🐾 GenieGoods
          </p>

          {/* 네비게이션 메뉴 (태블릿 이상 가로 유지) */}
          <div className="flex flex-row items-center gap-4">
            <button
              onClick={() => navigate("/create")}
              className="h-[37px] px-4 rounded-[10px] hover:bg-gray-50 transition-colors"
            >
              <span className="text-[14px] text-[#4a5565] whitespace-nowrap">
                굿즈 만들기
              </span>
            </button>

            <button
              onClick={() => navigate("/browse")}
              className="h-[37px] px-4 rounded-[10px] hover:bg-gray-50 transition-colors"
            >
              <span className="text-[14px] text-[#4a5565] whitespace-nowrap">
                굿즈 둘러보기
              </span>
            </button>

            <button
              onClick={() => navigate("/mygoods")}
              className="h-[37px] px-4 rounded-[10px] hover:bg-gray-50 transition-colors"
            >
              <span className="text-[14px] text-[#4a5565] whitespace-nowrap">
                내가 생성한 굿즈
              </span>
            </button>
          </div>
        </div>

        {/* 오른쪽: 사용자 정보 */}
        {!isLoggingOut && user && user.nickname ? (
          <div className="hidden md:flex items-center gap-4">
            <div className="flex items-center gap-3">
              {/* 프로필 이미지 또는 이니셜 */}
              {user?.profileUrl ? (
                <img
                  src={user.profileUrl}
                  alt={user.nickname}
                  className="rounded-full w-9 h-9 object-cover shadow-md"
                  onClick={() => navigate("/mypage")}
                />
              ) : (
                <img
                  src={defaultProfileIcon}
                  alt="default"
                  className="w-9 h-9"
                  onClick={() => navigate("/mypage")}
                />
              )}
              {/* 닉네임 */}
              <span className="text-[16px] text-black">{user?.nickname}님</span>
            </div>

            <button
              onClick={handleLogout}
              className="bg-white border border-[#e2e8f0] h-[38.6px] px-4 rounded-[10px] hover:bg-gray-50 transition-colors"
            >
              <span className="text-[14px] text-[#6b6560]">로그아웃</span>
            </button>
          </div>
        ) : (
          <button
            onClick={() => navigate("/login")}
            className="hidden md:block bg-white border border-[#e2e8f0] h-[38.6px] px-4 rounded-[10px] hover:bg-gray-50 transition-colors"
          >
            <span className="text-[14px] text-[#6b6560]">로그인</span>
          </button>
        )}
      </div>
    </header>
  );
}
