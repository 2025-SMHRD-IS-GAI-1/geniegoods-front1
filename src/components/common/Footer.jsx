import { useNavigate } from "react-router-dom";

export default function Footer() {
  const navigate = useNavigate();
  return (
    <footer className="w-full border-t border-[#eee] h-14 bg-white">
      <div className="max-w-[1440px] mx-auto px-8">
        <div className="flex items-center justify-between pt-[18px] pb-[14px]">
          {/* 왼쪽: 고객지원 */}
          <div
            className="text-[#6a7282] text-[13px] hover:text-[#b89a7c] transition cursor-pointer"
            onClick={() => navigate("/question")}
          >
            고객지원 · 자주 묻는 질문
          </div>

          {/* 가운데 */}
          <div className="flex items-center gap-5">
            <span className="text-[#6a7282] text-[13px]">회사정보</span>
            <span className="text-[#6a7282] text-[13px]">이용약관</span>
            <span className="text-[#6a7282] text-[13px]">
              개인정보 처리방침
            </span>
          </div>

          {/* 오른쪽 */}
          <div className="text-[#6a7282] text-[13px] mt-[1px]">
            © 2025 GenieGoods
          </div>
        </div>
      </div>
    </footer>
  );
}
