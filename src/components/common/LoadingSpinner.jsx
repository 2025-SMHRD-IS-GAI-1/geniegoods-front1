import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { getPositionClass } from "../../utils/positionUtils";

/**
 * 로딩 스피너 컴포넌트
 * @param {string} message - 로딩 메시지 (선택사항)
 * @param {string} position - 위치 ('top-right', 'top-left', 'center' 등)
 * @param {boolean} showMessage - 메시지 표시 여부
 */
export default function LoadingSpinner({ 
  message = "처리 중...", 
  position = "top-right",
  showMessage = true 
}) {
  return (
    <div className={`${getPositionClass(position)} z-50`}>
      <div className="bg-white rounded-lg shadow-xl p-4 border border-[#e5e7eb] flex items-center gap-3">
        <ArrowPathIcon className="w-5 h-5 text-[#007bff] animate-spin" />
        {showMessage && (
          <span className="text-[14px] text-[#2d2520] font-medium">
            {message}
          </span>
        )}
      </div>
    </div>
  );
}

