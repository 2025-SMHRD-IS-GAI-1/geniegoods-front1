import axios from "axios";
import { useAuthStore } from "../stores/authStore";
import { getBaseUrl } from "../stores/apiStore";

const API_BASE_URL = getBaseUrl();

/**
 * axios 인스턴스 생성
 */
export const apiClient = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // CORS 쿠키 전송 및 세션 관리를 위해 필요
});

/**
 * 요청 인터셉터: 모든 요청 헤더에 Zustand에 저장된 토큰을 자동으로 추가
 */
apiClient.interceptors.request.use(
  (config) => {
    const token = useAuthStore.getState().accessToken;
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * 주문 생성
 * @param {} dto
 * @returns
 */
export const createOrder = async (createOrderRequest) => {
  try {
    const response = await apiClient.post(
      "/api/order/create",
      createOrderRequest
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        error.message ||
        "주문 생성에 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("주문 생성에 실패했습니다.");
  }
};

/**
 * 최근 주문 내역 2건 조회
 * @returns
 */
export const selectRecentOrder = async () => {
  try {
    const response = await apiClient.get("/api/order/recent-order");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        error.message ||
        "최근 주문 내역을 불러오는데 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("최근 주문 내역을 불러오는데 실패했습니다.");
  }
};

/**
 * 전체 주문 내역 조회 (페이징)
 * @param {Object} options - { months: number, page: number }
 * @returns {Promise<Object>} { content: Array, totalElements: number, totalPages: number }
 */
export const selectAllOrders = async (options) => {
  try {
    const response = await apiClient.get("/api/order/all-orders", {
      params: {
        months: options.months || null,
        page: options.page || 0,
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        error.message ||
        "주문 내역을 불러오는데 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("주문 내역을 불러오는데 실패했습니다.");
  }
};

/**
 * 주문 상세 조회
 */
export const selectOrderDetail = async (orderId) => {
  try {
    const response = await apiClient.get(`/api/order/${orderId}`);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        error.message ||
        "주문 상세 정보를 불러오는데 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("주문 상세 정보를 불러오는데 실패했습니다.");
  }
};

/**
 * 주문 주소 수정
 */
export const updateOrderAddress = async (orderId, addressRequest) => {
  try {
    const response = await apiClient.put(
      `/api/order/${orderId}/address`,
      addressRequest
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        error.message ||
        "주문 주소를 수정하는데 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("주문 주소를 수정하는데 실패했습니다.");
  }
};
