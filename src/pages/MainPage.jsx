import { useNavigate } from "react-router-dom";
import dogImage from "../assets/img/dog.png";
import catImage from "../assets/img/cat.png";
import personImage from "../assets/img/person.png";
import resultImage from "../assets/img/result.png";
import result1Image from "../assets/img/result1.png";

export default function MainPage() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#f5f3f0] overflow-x-hidden">
      {/* 히어로 섹션 */}
      <section className="bg-[#faf7f3] py-4 flex overflow-hidden">
        <div className="max-w-[1440px] mx-auto w-full">
          <div className="flex flex-col xl:flex-row items-center gap-1">
            {/* 왼쪽: 텍스트 */}
            <div className="flex-1 max-w-[560px]">
              <h1 className="text-[44px] leading-[50px] text-[#2d2520] mb-2">
                AI 시안 제작부터
                <br />
                <span className="text-[#8b7355]">굿즈 주문까지</span>
              </h1>

              <p className="text-[18px] text-[#4a5565] leading-[30px] mb-4">
                사진을 업로드하면 AI 이미지 생성 서비스가
                <br />
                맞춤 이미지를 제작하고 굿즈로 주문할 수 있습니다.
              </p>

              <div className="flex items-center gap-4">
                <button
                  onClick={() => navigate("/create")}
                  className="bg-[#b89a7c] text-white px-6 py-3 rounded-full text-[16px] shadow hover:bg-[#a68a6c] transition flex items-center gap-2"
                >
                  AI 굿즈 만들기
                </button>

                <button
                  onClick={() => navigate("/browse")}
                  className="bg-white border border-[#8b7355] text-[#8b7355] px-6 py-3 rounded-full text-[15px] hover:bg-gray-50 transition"
                >
                  인기굿즈 둘러보기
                </button>
              </div>
            </div>

            {/* 오른쪽: 이미지 플로우 */}
            <div className="flex-1 flex items-center justify-center gap-4">
              {/* 입력 이미지들 */}
              <div className="flex flex-col gap-3 items-center relative -mr-8">
                {/* 강아지 (위) */}
                <div
                  className="bg-white border-4 border-white rounded-[24px] shadow-lg overflow-hidden
                          w-[130px] h-[150px]
                          relative left-[-100px] top-[80px] z-10"
                >
                  <img
                    src={dogImage}
                    alt="강아지"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* + */}
                <div
                  className="bg-[#d4cfc7] rounded-[10px] w-[40px] h-[40px]
                          flex items-center justify-center
                          relative left-[-10px] top-[4px]"
                >
                  +
                </div>

                {/* 고양이 (중앙 기준) */}
                <div
                  className="bg-white border-4 border-white rounded-[24px] shadow-lg overflow-hidden
                        w-[130px] h-[150px]
                        relative left-[-24px] z-20"
                >
                  <img
                    src={catImage}
                    alt="고양이"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* + */}
                <div
                  className="bg-[#d4cfc7] rounded-[10px] w-[40px] h-[40px]
                          flex items-center justify-center
                          relative left-[-10px] top-[-4px]"
                >
                  +
                </div>

                {/* 사람 (아래) */}
                <div
                  className="bg-white border-4 border-white rounded-[24px] shadow-lg overflow-hidden
                          w-[130px] h-[150px]
                          relative left-[-100px] top-[-80px] z-10"
                >
                  <img
                    src={personImage}
                    alt="사람들"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* 화살표 */}
              <span className="text-[#9ca3af] text-[28px]">→</span>

              {/* AI 결과 */}
              <div className="bg-white rounded-[28px] shadow-lg overflow-hidden w-[200px] h-[270px]">
                <img
                  src={resultImage}
                  alt="AI 결과"
                  className="w-full h-full object-cover"
                />
              </div>

              <span className="text-[#9ca3af] text-[28px]">→</span>

              {/* 굿즈 */}
              <div className="bg-white rounded-[28px] overflow-hidden w-[200px] h-[270px] shadow-[0_12px_30px_rgba(0,0,0,0.18),0_0_25px_rgba(184,154,124,0.45)] transition">
                <img
                  src={result1Image}
                  alt="굿즈"
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 프로세스 단계 섹션 */}
      <section className="bg-white py-8 border-t border-[#eee]">
        <div className="max-w-[1440px] mx-auto px-24">
          <div className="flex items-center justify-between">
            {/* STEP 1 */}
            <div className="flex items-start gap-4 w-[360px]">
              <div className="bg-[#b89a7c] text-white w-7 h-7 rounded-full flex items-center justify-center text-[13px] shrink-0">
                1
              </div>
              <div>
                <p className="text-[15px] font-semibold text-[#2d2520] mb-1">
                  사진 업로드
                </p>
                <p className="text-[13px] text-[#6b7280] leading-[18px]">
                  반려동물 사진을 여러 장 선택해
                  <br />
                  업로드합니다
                </p>
              </div>
            </div>

            {/* 화살표 */}
            <div className="flex items-center justify-center w-[72px]">
              <span className="text-[#4b443d] text-[28px] font-bold leading-none">
                →
              </span>
            </div>

            {/* STEP 2 */}
            <div className="flex items-start gap-4 w-[360px]">
              <div className="bg-[#8a8f98] text-white w-7 h-7 rounded-full flex items-center justify-center text-[13px] shrink-0">
                2
              </div>
              <div>
                <p className="text-[15px] font-semibold text-[#2d2520] mb-1">
                  AI 자동완성
                </p>
                <p className="text-[13px] text-[#6b7280] leading-[18px]">
                  AI가 사진을 분석해
                  <br />
                  하나의 장면을 완성합니다
                </p>
              </div>
            </div>

            {/* 화살표 */}
            <div className="flex items-center justify-center w-[72px]">
              <span className="text-[#4b443d] text-[28px] font-bold leading-none">
                →
              </span>
            </div>

            {/* STEP 3 */}
            <div className="flex items-start gap-4 w-[360px]">
              <div className="bg-[#b89a7c] text-white w-7 h-7 rounded-full flex items-center justify-center text-[13px] shrink-0">
                3
              </div>
              <div>
                <p className="text-[15px] font-semibold text-[#2d2520] mb-1">
                  굿즈 완성
                </p>
                <p className="text-[13px] text-[#6b7280] leading-[18px]">
                  완성된 이미지를
                  <br />
                  굿즈로 제작합니다
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA 배너 */}
      <div className="bg-[#b89a7c]">
        <div className="text-center py-8">
          <h2 className="text-[24px] font-medium text-white leading-[32px]">
            완성된 이미지를 굿즈로 제작해보세요
          </h2>
        </div>
      </div>
    </div>
  );
}
