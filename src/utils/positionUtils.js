/**
 * 알림 컴포넌트의 위치 클래스를 반환하는 유틸 함수
 * @param {string} position - 위치 ('top-right', 'top-left', 'center', 'bottom-right', 'bottom-left')
 * @returns {string} Tailwind CSS 클래스 문자열
 */
export function getPositionClass(position = "top-right") {
  const positionClasses = {
    "top-right": "fixed top-4 right-4",
    "top-left": "fixed top-4 left-4",
    "center": "fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2",
    "bottom-right": "fixed bottom-4 right-4",
    "bottom-left": "fixed bottom-4 left-4",
  };

  return positionClasses[position] || positionClasses["top-right"];
}

