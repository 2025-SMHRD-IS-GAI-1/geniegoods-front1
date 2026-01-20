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
 * 응답 인터셉터: 401 에러 시 인증 상태 초기화
 * httpOnly 쿠키 기반 인증 사용 (토큰은 쿠키에 자동으로 포함됨)
 */
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error) && error.response?.status === 401) {
      // 401 Unauthorized 에러 시 인증 상태 초기화
      useAuthStore.getState().clearAuth();
    }
    return Promise.reject(error);
  }
);

/**
 * 굿즈 이미지 생성 호출
 * @param
 * @returns
 */
export const createGoodsImage = async (formData) => {
  try { 
    const response = await apiClient.post("/api/goods/create-image", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // 서버에서 내려주는 에러 메시지가 문자열이면 사용, 아니면 기본 메시지
      const errorMessage =
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        error.message ||
        "굿즈 이미지 생성에 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("굿즈 이미지 생성에 실패했습니다.");
  }
};


/**
 * 시안 생성
 * @param {} formData 
 * @returns 
 */
export const createGoodsSample = async (formData) => {
  try {
    const response = await apiClient.post("/api/goods/create-goods-sample", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
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
        "시안 생성에 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("시안 생성에 실패했습니다.");
  }
};


/**
 * 시안 삭제
 * @param
 * @returns
 */
export const deleteSampleImg = async (requestBody) => {
  try {
    const response = await apiClient.post(
      "/api/goods/delete-goods-sample",
      requestBody
    );
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        error.message ||
        "시안 삭제에 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("시안 삭제에 실패했습니다.");
  }
};

export const selectGoods = async (requestBody) => {
  try {
    const response = await apiClient.post("/api/goods/select-goods", requestBody);
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
          error.message ||
          "굿즈 선택에 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("굿즈 선택에 실패했습니다.");
  }
};

/**
 * 내가 생성한 굿즈
 * @returns 메세지
 */
export const selectAllMyGoods = async () => {
  try {
    const response = await apiClient.get("/api/goods/select-all-my-goods");
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        error.message ||
        "내가 생성한 굿즈 목록 불러오기에 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("내가 생성한 굿즈 목록 불러오기에 실패했습니다.");
  }
};

/**
 * 내가 생성한 굿즈 삭제
 * @param {} goodsIds
 * @returns
 */
export const deleteMyGoods = async (goodsIds) => {
  try {
    const response = await apiClient.delete("/api/goods/bulk", {
      params: {
        goodsIds: goodsIds,
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
        "내가 생성한 굿즈 삭제에 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("내가 생성한 굿즈 삭제에 실패했습니다.");
  }
};

/**
 * 내가 생성한 굿즈 단건 다운로드
 * @param {string} goodsUrl 이미지 URL
 * @returns {Blob} 이미지 blob
 */
export const downloadMyGoodsImg = async (goodsUrl) => {
  try {
    const response = await apiClient.get("/api/goods/download-image", {
      params: {
        url: goodsUrl,
      },
      responseType: "blob", // blob으로 받기
    });
    return response.data; // blob 반환
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        error.message ||
        "내가 생성한 굿즈 다운로드에 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("내가 생성한 굿즈 다운로드에 실패했습니다.");
  }
};

/**
 * 내가 생성한 굿즈 여러건 다운로드
 * @param {string[]} goodsUrls 이미지 URL 배열
 * @returns {Blob} ZIP 파일 blob
 */
export const downloadMyGoodsImgZip = async (goodsUrls) => {
  try {
    const response = await apiClient.get("/api/goods/download-images-zip", {
      params: {
        urls: goodsUrls, // axios가 자동으로 urls=url1&urls=url2 형태로 변환
      },
      responseType: "blob", // blob으로 받기
    });
    return response.data; // blob 반환
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        error.message ||
        "내가 생성한 굿즈 다운로드에 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("내가 생성한 굿즈 다운로드에 실패했습니다.");
  }
};

/**
 * 굿즈 둘러보기
 */
export const selectGoodsData = async (categoryId, page, size) => {
  try {
    const response = await apiClient.get("/api/goods/browse", {
      params: {
        categoryId: categoryId || null,
        page: page || 0,
        size: size || 8,
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
        "굿즈 둘러보기에 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("굿즈 둘러보기에 실패했습니다.");
  }
};

/**
 * 굿즈 상세 조회
 */
export const selectGoodsDetail = async (goodsId) => {
  try {
    const response = await apiClient.post("/api/goods/view-goods", {
      goodsId: goodsId,
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const errorMessage =
        (typeof error.response?.data === "string"
          ? error.response.data
          : null) ||
        error.message ||
        "굿즈 상세 조회에 실패했습니다.";
      throw new Error(errorMessage);
    }
    throw new Error("굿즈 상세 조회에 실패했습니다.");
  }
};
