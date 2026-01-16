import { useState, useEffect, useRef, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { CheckIcon } from "@heroicons/react/24/outline";
import { useAuthStore } from "../stores/authStore";
import { useMutation } from "@tanstack/react-query";
import { changeSubScribePlan } from "../services/subscribe";
import PaymentModal from "../components/common/PaymentModal";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Toast from "../components/common/Toast";

const baseSubscriptionPlans = [
  {
    id: "FREE",
    name: "FREE",
    price: "₩ 0",
    period: "/ month",
    icon: "🆓",
    features: ["월 5개 굿즈 이미지 제한"],
    buttonText: "무료로 시작하기",
    isPopular: false,
  },
  {
    id: "PRO",
    name: "PRO",
    price: "₩ 9,900",
    period: "/ month",
    icon: "⭐",
    features: ["무제한 굿즈 이미지 생성"],
    buttonText: "프로로 업그레이드",
    isPopular: false,
  },
];

export default function SubscribePage() {
  const { user, setUser } = useAuthStore();
  const navigate = useNavigate();
  const [selectedSubscriptionPlan, setSelectedSubscriptionPlan] =
    useState(null);

  const [toastOption, setToastOption] = useState({
    type: "",
    show: false,
    message: "",
    duration: 2000,
  });
  const [isPaymentModalOpen, setIsPaymentModalOpen] = useState(false);

  const portoneScriptLoaded = useRef(false);

  // 포트원(아임포트) 스크립트 로드
  useEffect(() => {
    if (portoneScriptLoaded.current) return;

    const script = document.createElement("script");
    script.src = "https://cdn.iamport.kr/js/iamport.payment-1.2.0.js";
    script.async = true;
    script.onload = () => {
      portoneScriptLoaded.current = true;
    };
    document.head.appendChild(script);
  }, []);

  const subscriptionPlans = useMemo(() => {
    return baseSubscriptionPlans.map((plan) => ({
      ...plan,
      isPopular: user?.subscriptionPlan === plan.id,
    }));
  }, [user?.subscriptionPlan]);

  const handleSubscribe = (planId) => {
    setSelectedSubscriptionPlan(planId);

    // 결제 모달 열기
    if (planId !== "FREE") {
      setIsPaymentModalOpen(true);
    }
  };

  // 구독 플랜 변경 뮤테이션
  const changeSubScribePlanMutation = useMutation({
    mutationFn: async (subscriptionPlanData) => {
      const response = await changeSubScribePlan(subscriptionPlanData);
      return response;
    },
    onSuccess: (data) => {
      setUser({ ...user, subscriptionPlan: data.subscriptionPlan });
      navigate("/mypage");
    },
  });

  return (
    <div className="bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50 min-h-screen py-16">
      {changeSubScribePlanMutation.isPending && (
        <LoadingSpinner
          message="구독 PRO 플랜 변경 중..."
          position="top-right"
        />
      )}
      {toastOption.show && (
        <Toast
          type={toastOption.type}
          message={toastOption.message}
          position="top-right"
          duration={toastOption.duration}
          onClose={() => setToastOption({ ...toastOption, show: false })}
        />
      )}
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
                {plan.id === "PRO" && (
                  <button
                    onClick={() => handleSubscribe(plan.id)}
                    disabled={plan.isPopular}
                    className={`w-full py-3 px-6 rounded-xl font-semibold text-[14px] transition-all duration-200 cursor-pointer ${
                      plan.isPopular
                        ? "disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-200 disabled:text-gray-500 disabled:border-gray-300"
                        : "bg-white text-blue-600 border-2 border-blue-600 hover:bg-blue-50"
                    }`}
                  >
                    {plan.buttonText}
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 결제하기 모달 */}
      <PaymentModal
        isOpen={isPaymentModalOpen}
        onClose={() => {
          setIsPaymentModalOpen(false);
          setSelectedSubscriptionPlan(null);
        }}
        paymentAmount={selectedSubscriptionPlan === "PRO" ? 9900 : 0}
        onPayment={async (paymentData) => {
          if (!window.IMP) {
            alert("포트원을 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
            return;
          }

          try {
            // 포트원 초기화
            window.IMP.init(import.meta.env.VITE_PORTONE_IMP_ID);

            // 주문 ID 생성
            const subscriptionPlanId = `SUBSCRIPTION_PLAN_${Date.now()}_${Math.random()
              .toString(36)
              .substr(2, 9)}`;

            // 결제 수단에 따른 포트원 PG사 코드 매핑
            const pgMap = {
              tosspay: "tosspay.tosstest",
              kakaopay: "kakaopay.TC0ONETIME",
              card: "mobilians.170622040674", // 또는 "kcp" (포트원 콘솔에서 설정한 PG사에 따라 다름)
              phone: "mobilians.170622040674", // 또는 "kcp"
            };

            // 결제 방법 매핑
            const payMethodMap = {
              tosspay: "tosspay",
              kakaopay: "kakaopay",
              card: "card",
              phone: "phone",
            };

            const pgCode = pgMap[paymentData.paymentMethod];
            const pay_method = payMethodMap[paymentData.paymentMethod];

            if (!pgCode || !pay_method) {
              alert("지원하지 않는 결제 수단입니다.");
              return;
            }

            // 결제 요청 옵션 기본 설정
            const paymentOptions = {
              pg: pgCode, // PG사 코드
              pay_method: pay_method, // 결제 방법
              merchant_uid: subscriptionPlanId, // 주문 ID
              name: `구독 PRO 플랜 결제`, // 상품명
              amount: selectedSubscriptionPlan === "PRO" ? 9900 : 0, // 결제 금액
              buyer_name: `${user?.nickname}`, // 구매자 이름 (실제로는 사용자 정보에서 가져오기)
              buyer_tel: "", // 구매자 전화번호 (실제로는 사용자 정보에서 가져오기)
            };

            // 주문 데이터에 결제 수단 추가 (결제 성공 시 사용)
            const subscriptionPlanDataWithMethod = {
              subscriptionPlan: selectedSubscriptionPlan,
              method: pay_method,
            };

            // 결제 요청 (프론트엔드에서 직접 처리)
            window.IMP.request_pay(paymentOptions, async (response) => {
              // 결제 모달 닫기
              setIsPaymentModalOpen(false);

              if (response.success) {
                // 결제 성공 - 구독 플랜 변경
                try {
                  changeSubScribePlanMutation.mutate(
                    subscriptionPlanDataWithMethod
                  );
                } catch (error) {
                  setToastOption({
                    type: "error",
                    show: true,
                    message: error.message || "구독 플랜 변경에 실패했습니다.",
                    duration: 2000,
                  });
                }
              } else {
                // 결제 실패
                console.error("결제 실패:", response);
                const errorMessage =
                  response.error_msg || "결제 처리 중 오류가 발생했습니다.";

                // 사용자가 결제를 취소한 경우
                if (response.error_code === "PAY_CANCEL") {
                  setToastOption({
                    type: "info",
                    show: true,
                    message: "결제가 취소되었습니다.",
                    duration: 2000,
                  });
                } else {
                  setToastOption({
                    type: "error",
                    show: true,
                    message: errorMessage,
                    duration: 2000,
                  });
                }
              }
            });
          } catch (error) {
            console.error("결제 실패:", error);
            setToastOption({
              type: "error",
              show: true,
              message: error.message || "결제 처리 중 오류가 발생했습니다.",
              duration: 2000,
            });
          }
        }}
      />
    </div>
  );
}
