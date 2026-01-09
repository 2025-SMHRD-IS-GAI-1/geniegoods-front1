import { socialLogin } from "../services/authService";
import kakaoIcon from "../assets/img/kakaoIcon.png";
import naverIcon from "../assets/img/naverIcon.png";
import googleIcon from "../assets/img/googleIcon.png";

export default function LoginPage() {
  const handleSocialLogin = (provider) => {
    socialLogin(provider);
  };

  return (
    <div className="bg-[#f5f3f0] min-h-screen flex items-center justify-center">
      <div className="bg-white border border-[#d1d5dc] rounded-[24px] w-[526px] p-8 shadow-lg">
        {/* 제목 */}
        <div className="text-center mb-4">
          <h1 className="text-[32px] font-bold text-[#0a0a0a] leading-[48px] mb-2">
            로그인
          </h1>
          <p className="text-[15px] text-[#717182] leading-[24.375px]">
            제작한 굿즈를 저장하고 주문할 수 있습니다
          </p>
        </div>

        {/* 소셜 로그인 버튼들 */}
        <div className="flex flex-col gap-3 mt-8">
          {/* 카카오 로그인 */}
          <button
            onClick={() => handleSocialLogin("kakao")}
            className="bg-[#fee500] h-[52px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <img src={kakaoIcon} alt="카카오" className="w-5 h-5" />
            <span className="text-[16px] text-black font-normal">
              Kakao 로그인
            </span>
          </button>

          {/* 네이버 로그인 */}
          <button
            onClick={() => handleSocialLogin("naver")}
            className="bg-[#03c75a] h-[52px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 hover:opacity-90 transition-opacity"
          >
            <img src={naverIcon} alt="네이버" className="w-5 h-5" />
            <span className="text-[16px] text-white font-normal">
              Naver 로그인
            </span>
          </button>

          {/* 구글 로그인 */}
          <button
            onClick={() => handleSocialLogin("google")}
            className="bg-white border border-[#d1d5dc] h-[52px] rounded-[10px] shadow-[0px_1px_3px_0px_rgba(0,0,0,0.1),0px_1px_2px_-1px_rgba(0,0,0,0.1)] flex items-center justify-center gap-2 hover:bg-gray-50 transition-colors"
          >
            <img src={googleIcon} alt="구글" className="w-5 h-5" />
            <span className="text-[16px] text-[#364153] font-normal">
              Google 로그인
            </span>
          </button>
        </div>

        {/* 구분선 */}
        <div className="border-t border-[#e5e7eb] my-8"></div>

        {/* 안내 문구 */}
        <div className="space-y-3">
          <div className="text-center space-y-1">
            <p className="text-[14px] text-[#717182] leading-[22.75px]">
              제작한 굿즈 이미지는
            </p>
            <p className="text-[14px] text-[#717182] leading-[22.75px]">
              굿즈 둘러보기 화면에 노출될 수 있습니다.
            </p>
          </div>
          <div className="text-center">
            <p className="text-[13px] text-[#999] leading-[21.125px]">
              ※ 로그인 후 제작한 굿즈를 저장하고 주문할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
