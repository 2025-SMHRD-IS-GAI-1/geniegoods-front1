import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";

// router import
import App from "./App";

// React Query 관련 import
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

const queryClient = new QueryClient({
  // 필요에 따라 기본 설정을 여기서 지정할 수 있습니다.
  defaultOptions: {
    queries: {
      // 예를 들어, 데이터가 5분 동안 fresh하다고 설정 (기본값 0)
      staleTime: 1000 * 60 * 5,
    },
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    {/* QueryClientProvider로 앱 전체를 감싸서 상태 관리 기능을 제공합니다. */}
    <QueryClientProvider client={queryClient}>
      <App />
      {/* Devtools 컴포넌트 추가 */}
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  </StrictMode>
);
