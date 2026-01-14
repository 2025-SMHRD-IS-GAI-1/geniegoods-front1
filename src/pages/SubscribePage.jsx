import { useState } from "react";
import { CheckIcon } from "@heroicons/react/24/outline";

const subscriptionPlans = [
  {
    id: "free",
    name: "FREE",
    price: "₩ 0",
    period: "/ month",
    icon: "🆓",
    features: ["프롬프트 10번 제한", "월 5개 굿즈 이미지 제한"],
    buttonText: "무료로 시작하기",
    isPopular: true,
  },
  {
    id: "pro",
    name: "PRO",
    price: "₩ 9,900",
    period: "/ month",
    icon: "⭐",
    features: ["프롬프트 무제한", "무제한 굿즈 이미지 생성"],
    buttonText: "프로로 업그레이드",
    isPopular: false,
  },
];

export default function SubscribePage() {
  const [selectedPlan, setSelectedPlan] = useState(null);

  const handleSubscribe = (planId) => {
    setSelectedPlan(planId);
    alert("구독기능은 준비중입니다.");
  };

  return (
    <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 min-h-screen py-16">
      <div className="max-w-[1200px] mx-auto px-8">
        {/* 헤더 섹션 */}
        <div className="text-center mb-12">
          <h1 className="text-[42px] font-bold text-[#101828] mb-4">
            Flexible Plans & Pricing
          </h1>
          <p className="text-[16px] text-[#6b7280] max-w-2xl mx-auto leading-relaxed">
            지니굿즈의 다양한 구독 플랜을 확인해보세요. 무료로 시작하거나 프로
            플랜으로 더 많은 기능을 이용하실 수 있습니다.
          </p>
        </div>

        {/* 구독 플랜 카드 */}
        <div className="flex flex-col md:flex-row items-center justify-center gap-8">
          {subscriptionPlans.map((plan) => (
            <div
              key={plan.id}
              className={`w-full md:w-[400px] bg-white rounded-2xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-xl ${
                plan.isPopular ? "ring-2 ring-blue-500 ring-offset-2" : ""
              }`}
            >
              {/* 플랜 헤더 */}
              <div className="bg-gradient-to-br from-blue-50 to-indigo-50 px-6 py-8 text-center">
                <div className="mb-4">
                  <span className="text-[14px] font-semibold text-blue-600 uppercase tracking-wider">
                    {plan.name}
                  </span>
                </div>
                <div className="w-16 h-16 mx-auto mb-4 bg-white rounded-full flex items-center justify-center shadow-md border-2 border-blue-100">
                  <span className="text-3xl">{plan.icon}</span>
                </div>
                <div className="mb-2">
                  <span className="text-[36px] font-bold text-[#101828]">
                    {plan.price}
                  </span>
                  <span className="text-[14px] text-[#6b7280] ml-1">
                    {plan.period}
                  </span>
                </div>
              </div>

              {/* 기능 목록 */}
              <div className="px-6 py-6">
                <ul className="space-y-3 mb-6">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <CheckIcon className="w-5 h-5 text-green-500" />
                      </div>
                      <span className="text-[14px] text-[#4b5563] leading-relaxed">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* 구독 버튼 */}
                <button
                  onClick={() => handleSubscribe(plan.id)}
                  className={`w-full py-3 px-6 rounded-xl font-semibold text-[14px] transition-all duration-200 cursor-pointer ${
                    plan.isPopular
                      ? "bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg"
                      : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                  }`}
                >
                  {plan.buttonText}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
