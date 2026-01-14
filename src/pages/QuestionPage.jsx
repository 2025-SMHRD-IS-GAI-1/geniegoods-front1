import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

// FAQ 데이터
const faqData = [
  {
    id: 1,
    question: "배송은 얼마나 걸리나요?",
    answer:
      "일반 택배의 경우 2-3일, 빠른 배송은 1-2일 소요됩니다. 제작 기간은 별도입니다.",
  },
  {
    id: 2,
    question: "지니굿즈의 배송비는 얼마인가요?",
    answer: "배송비는 3,000원의 배송비가 발생합니다.",
  },
  {
    id: 3,
    question: "주문 취소를 하고 싶어요",
    answer:
      "주문 취소는 주문 내역에서 가능합니다. 제작이 시작되기 전까지 취소가 가능하며, 제작이 시작된 경우 취소가 제한될 수 있습니다.",
  },
  {
    id: 4,
    question: "회원탈퇴는 어떻게 하나요?",
    answer:
      "마이페이지의 '회원탈퇴' 메뉴를 통해 탈퇴할 수 있습니다. 탈퇴 시 모든 주문 정보와 생성한 굿즈 정보가 잠시 삭제되며, 90일 이후 재가입이 가능합니다.",
  },
  {
    id: 5,
    question: "해외배송은 가능한가요?",
    answer:
      "현재는 국내 배송만 가능합니다. 해외배송 서비스는 추후 제공 예정입니다.",
  },
];

export default function QuestionPage() {
  const navigate = useNavigate();
  const [openIdList, setOpenIdList] = useState([]); // 첫 번째 질문이 기본으로 열려있음

  const toggleQuestion = (id) => {
    if (openIdList.includes(id)) {
      setOpenIdList(openIdList.filter((item) => item !== id));
    } else {
      setOpenIdList([...openIdList, id]);
    }
    console.log(openIdList);
  };

  const handleBackToMain = () => {
    navigate("/");
  };

  return (
    <div className="bg-[#f5f3f0] h-[calc(100vh-124px)]">
      <div className="max-w-[1440px] mx-auto px-8 py-8">
        {/* 페이지 제목 */}
        <div className="text-center mb-8">
          <h1 className="text-[28px] font-bold text-[#101828] mb-4">
            자주 묻는 질문
          </h1>
          <p className="text-[16px] text-[#4a5565]">
            궁금한점이 있다면 가장 먼저 확인해보세요
          </p>
        </div>

        {/* FAQ 아코디언 */}
        <div className="max-w-[768px] mx-auto">
          <div className="bg-white border border-[#d1d5dc] rounded-[24px] p-8">
            <div className="space-y-3">
              {faqData.map((faq) => {
                const isOpen = openIdList.includes(faq.id);
                return (
                  <div
                    key={faq.id}
                    className="border border-[#e5e7eb] rounded-[14px] overflow-hidden"
                  >
                    {/* 질문 버튼 */}
                    <button
                      onClick={() => toggleQuestion(faq.id)}
                      className={`w-full flex items-center justify-between px-5 py-4 text-left transition-colors cursor-pointer ${
                        isOpen
                          ? "bg-[#f9fafb]"
                          : "bg-[#f9fafb] hover:bg-gray-50"
                      }`}
                    >
                      <span className="text-[16px] text-[#101828] font-normal">
                        {faq.question}
                      </span>
                      <div className="flex-shrink-0 ml-4">
                        {/* 화살표 */}
                        <ChevronDownIcon
                          className={`w-5 h-5 transition-transform ${
                            isOpen ? "rotate-180" : ""
                          }`}
                        />
                      </div>
                    </button>

                    {/* 답변 */}
                    {isOpen && (
                      <div className="bg-white px-5 py-4 border-t border-[#e5e7eb]">
                        <p className="text-[16px] text-[#4a5565] leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* 메인으로 돌아가기 버튼 */}
        <div className="flex justify-center mt-8">
          <button
            onClick={handleBackToMain}
            className="bg-white border border-[#e5e7eb] px-6 py-3 rounded-[10px] text-[16px] text-[#364153] hover:bg-gray-50 transition-colors flex items-center gap-2 cursor-pointer"
          >
            <span>←</span>
            <span>메인으로 돌아가기</span>
          </button>
        </div>
      </div>
    </div>
  );
}
