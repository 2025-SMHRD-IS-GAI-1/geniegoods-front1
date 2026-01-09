import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../stores/authStore";
import { logout, getCurrentUser } from "../../services/authService";
import defaultProfileIcon from "../../assets/img/defaultProfileIcon.png";

export default function Header() {
  const navigate = useNavigate();
  const { isAuthenticated, user, setUser } = useAuthStore();

  // 사용자 정보 로드
  useEffect(() => {
    if (isAuthenticated && !user) {
      getCurrentUser()
        .then((userData) => {
          setUser(userData);
        })
        .catch((error) => {
          console.error("사용자 정보 로드 실패:", error);
        });
    }
  }, [isAuthenticated, user, setUser]);

  const handleLogout = async () => {
    // 백엔드 성공 여부와 관계없이 Zustand Store 초기화
    useAuthStore.getState().clearAuth();
    navigate("/login");
  };

  return (
    <header className="bg-white border-b border-[#e5e7eb] h-[56px] w-full relative z-50">
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
        {isAuthenticated ? (
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
