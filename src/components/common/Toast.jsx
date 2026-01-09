import { useEffect, useState } from "react";
import { 
  CheckCircleIcon, 
  XCircleIcon, 
  ExclamationTriangleIcon, 
  InformationCircleIcon 
} from "@heroicons/react/24/solid";
import { getPositionClass } from "../../utils/positionUtils";

/**
 * 통합 토스트 알림 컴포넌트
 * @param {string} type - 토스트 타입 ('success', 'error', 'warning', 'info')
 * @param {string} message - 토스트 메시지
 * @param {string} position - 위치 ('top-right', 'top-left', 'center' 등)
 * @param {number} duration - 표시 시간 (밀리초, 기본값 1000ms)
 * @param {function} onClose - 닫힐 때 호출되는 콜백 함수
 */
export default function Toast({ 
  type = "success",
  message = "성공했습니다!", 
  position = "top-right",
  duration = 1000,
  onClose
}) {
  const [isVisible, setIsVisible] = useState(true);
  const [progress, setProgress] = useState(0);

  // 타입별 아이콘과 색상 설정
  const toastConfig = {
    success: {
      icon: CheckCircleIcon,
      iconColor: "text-green-500",
      progressColor: "bg-green-500",
    },
    error: {
      icon: XCircleIcon,
      iconColor: "text-red-500",
      progressColor: "bg-red-500",
    },
    warning: {
      icon: ExclamationTriangleIcon,
      iconColor: "text-yellow-500",
      progressColor: "bg-yellow-500",
    },
    info: {
      icon: InformationCircleIcon,
      iconColor: "text-blue-500",
      progressColor: "bg-blue-500",
    },
  };

  const config = toastConfig[type] || toastConfig.success;
  const IconComponent = config.icon;

  useEffect(() => {
    // 진행 바 애니메이션
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return prev + 2; // 50단계로 나누어 부드럽게 진행 (1000ms / 50 = 20ms 간격)
      });
    }, duration / 50);

    // duration 후 자동으로 닫기
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) {
        setTimeout(onClose, 300); // 페이드 아웃 애니메이션 후 콜백 호출
      }
    }, duration);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(timer);
    };
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`${getPositionClass(position)} z-50 animate-in fade-in slide-in-from-top-2 duration-300`}>
      <div className="bg-white rounded-lg shadow-xl border border-[#e5e7eb] overflow-hidden min-w-[300px]">
        {/* 메인 컨텐츠 */}
        <div className="p-4 flex items-center gap-3">
          <IconComponent className={`w-6 h-6 ${config.iconColor} flex-shrink-0`} />
          <span className="text-[14px] text-[#2d2520] font-medium flex-1">
            {message}
          </span>
        </div>
        
        {/* 진행 바 */}
        <div className="h-1 bg-gray-100 relative">
          <div 
            className={`h-full ${config.progressColor} transition-all ease-linear`}
            style={{ 
              width: `${progress}%`,
              transitionDuration: `${duration / 50}ms`
            }}
          />
        </div>
      </div>
    </div>
  );
}

