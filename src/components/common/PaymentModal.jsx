import { useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import tossIcon from "../../assets/img/tossIcon.png";
import kakaopayIcon from "../../assets/img/kakaoIcon.png";

export default function PaymentModal({
  isOpen,
  onClose,
  paymentAmount,
  onPayment,
}) {
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState("");
  const [agreements, setAgreements] = useState({
    amountInfo: false,
    purchaseAgreement: false,
    emailNotification: false,
  });

  // 결제 모달 닫기
  const handleClosePaymentModal = () => {
    setSelectedPaymentMethod("");
    setAgreements({
      amountInfo: false,
      purchaseAgreement: false,
      emailNotification: false,
    });
    onClose(); // 부모의 onClose 호출
  };

  // 결제 수단 선택
  const handleSelectPaymentMethod = (method) => {
    setSelectedPaymentMethod(method);
  };

  // 약관 동의 체크박스 변경
  const handleAgreementChange = (key) => {
    setAgreements((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 결제하기
  const handlePayment = () => {
    // 결제 수단 선택 확인
    if (!selectedPaymentMethod) {
      alert("결제 수단을 선택해주세요.");
      return;
    }

    // 필수 약관 동의 확인
    if (!agreements.amountInfo || !agreements.purchaseAgreement) {
      alert("필수 약관에 동의해주세요.");
      return;
    }

    // 부모의 onPayment 콜백 호출 (결제 정보 전달)
    onPayment({
      paymentMethod: selectedPaymentMethod,
      amount: paymentAmount,
      agreements,
    });

    // 모달 닫기
    handleClosePaymentModal();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white rounded-[16px] shadow-lg w-[500px] max-w-[90vw] max-h-[90vh] overflow-y-auto relative">
        {/* 닫기 버튼 */}
        <button
          onClick={handleClosePaymentModal}
          className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center text-gray-500 hover:text-gray-700 transition-colors z-10 bg-white rounded-full"
        >
          <XMarkIcon className="w-6 h-6" />
        </button>

        {/* 모달 내용 */}
        <div className="p-6">
          {/* 제목 */}
          <h2 className="text-[24px] font-semibold text-[#0a0a0a] mb-6">
            결제하기
          </h2>

          {/* 결제 수단 선택 */}
          <div className="mb-6">
            <h3 className="text-[16px] font-semibold text-[#0a0a0a] mb-3">
              간편 결제 
            </h3>
            <div className="grid grid-cols-2 gap-3">
           <button
              onClick={() => handleSelectPaymentMethod("tosspay")}
              className={`h-11 px-4 rounded-[10px] text-[14px] font-semibold transition-colors flex justify-center items-center gap-2 ${
                selectedPaymentMethod === "tosspay"
                  ? "bg-blue-500 text-white ring-2 ring-blue-300"
                  : "bg-blue-500 text-white hover:bg-blue-200"
              }`}
            >
              <img src={tossIcon} alt="tossIcon" className="w-6 h-6" />
              toss pay
            </button>
              <button
                onClick={() => handleSelectPaymentMethod("kakaopay")}
              className={`h-11 px-4 rounded-[10px] text-[14px] font-semibold transition-colors flex justify-center items-center gap-2 ${
                selectedPaymentMethod === "kakaopay"
                  ? "bg-yellow-400 text-white ring-2 ring-yellow-300"
                  : "bg-yellow-400 text-white  hover:bg-yellow-200"
                              }`}
              >
                <img
                  src={kakaopayIcon}
                  alt="kakaopayIcon"
                  className="w-4 h-4"
                />
                kakao pay
              </button>
              <button
                onClick={() => handleSelectPaymentMethod("card")}
                className={`h-11 px-4 rounded-[10px] text-[14px] font-semibold transition-all ${
                  selectedPaymentMethod === "card"
                    ? "bg-gray-300 text-gray-900 ring-2 ring-gray-400"
                    : "bg-gray-300 text-gray-900 hover:bg-gray-400"
                }`}
              >
                신용/체크카드
              </button>

              <button
                onClick={() => handleSelectPaymentMethod("phone")}
                className={`h-11 px-4 rounded-[10px] text-[14px] font-semibold transition-all ${
                  selectedPaymentMethod === "phone"
                    ? "bg-gray-300 text-gray-900 ring-2 ring-gray-400"
                    : "bg-gray-300 text-gray-900 hover:bg-gray-400"
                }`}
              >
                휴대폰 결제
              </button>
            </div>
          </div>

          {/* 최종 결제금액 */}
          <div className="mb-6">
            <div className="bg-[#eef4ff] rounded-[10px] p-5 text-center">
              <p className="text-[14px] text-[#6a7282] mb-1">최종 결제금액</p>
              <p className="text-[30px] font-bold text-blue-600">
                {paymentAmount.toLocaleString()}원
              </p>
            </div>
          </div>

          {/* 약관 동의 */}
          <div className="mb-6 space-y-3">
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreements.amountInfo}
                onChange={() => handleAgreementChange("amountInfo")}
                className="mt-1 w-4 h-4 rounded border-[#d1d5dc]"
              />
              <span className="text-[14px] text-[#364153]">
                거래(결제) 금액 안내를 위해 사용됩니다.{" "}
                <span className="text-red-500">(필수)</span>
              </span>
            </label>
            <label className="flex items-start gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={agreements.purchaseAgreement}
                onChange={() => handleAgreementChange("purchaseAgreement")}
                className="mt-1 w-4 h-4 rounded border-[#d1d5dc]"
              />
              <span className="text-[14px] text-[#364153]">
                상기 결제정보를 확인하였으며, 구매진행에 동의합니다.{" "}
                <span className="text-red-500">(필수)</span>
              </span>
            </label>
                        <label className="flex items-start gap-2 cursor-pointer">
             <input
                type="checkbox"
                checked={agreements.emailAgreement}
                onChange={() => handleAgreementChange("emailAgreement")}
                className="mt-1 w-4 h-4 rounded border-[#d1d5dc]"
              />
              <span className="text-[14px] text-[#364153]">
                주문·결제 정보 안내를 이메일로 수신하는 것에 동의합니다. {" "}
                <span className="text-red-500">(선택)</span>
              </span>
            </label>
          </div>

          {/* 결제 버튼 */}
          <button
            onClick={handlePayment}
            disabled={
              !selectedPaymentMethod ||
              !agreements.amountInfo ||
              !agreements.purchaseAgreement
            }
            className={`
            w-full
            bg-blue-500 text-white
            py-4 rounded-[12px]
            text-[16px] font-semibold

            shadow-md
            hover:bg-blue-600 hover:shadow-lg
            active:scale-[0.98]

            transition-all duration-150

            disabled:bg-blue-300
            disabled:opacity-60
            disabled:cursor-not-allowed
          `}
          >
            {paymentAmount.toLocaleString()}원 결제하기
          </button>
        </div>
      </div>
    </div>
  );
}
