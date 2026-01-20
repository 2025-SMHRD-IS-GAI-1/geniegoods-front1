import { useEffect, useRef } from "react";
import { useAuthStore } from "./stores/authStore";
import { getCurrentUser } from "./services/authService";

import Router from "./Router";

export default function App() {
  const { user, setUser, clearAuth } = useAuthStore();
  const hasProcessed = useRef(false);

  useEffect(() => {
    if (user || hasProcessed.current) return;

    hasProcessed.current = true;

    getCurrentUser()
      .then((userData) => {
        if (userData && typeof userData === "object" && userData.nickname) {
          setUser(userData);
        } else {
          clearAuth();
        }
      })
      .catch(() => {
        clearAuth();
      });
  }, []); // 빈 배열 : 마운트 시 한 번만 실행
  return <Router />;
}
