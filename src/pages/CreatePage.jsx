import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import starIcon from "../assets/img/starIcon.png";
import { XMarkIcon, PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useMutation } from "@tanstack/react-query";
import { apiClient } from "../services/authService";
import LoadingSpinner from "../components/common/LoadingSpinner";
import Toast from "../components/common/Toast";
import IllustrationSample from "../assets/img/illustrationSample.png";
import PaintingSample from "../assets/img/paintingSample.png";
import RealisticSample from "../assets/img/realisticSample.png";

export default function CreatePage() {
  const navigate = useNavigate();
  const location = useLocation();

  // SelectGoodsPage에서 전달받은 상태값
  const selectGoodsPageState = location.state?.selectGoodsPageState || null;
  const goodsDetail = location.state?.goodsDetail || null;

  const [uploadedImages, setUploadedImages] = useState(
    selectGoodsPageState?.uploadedImages || []
  );
  const [uploadedImageFiles, setUploadedImageFiles] = useState([]); // File 객체 저장
  const [description, setDescription] = useState(
    selectGoodsPageState?.description || ""
  );
  const [selectedOption, setSelectedOption] = useState(
    selectGoodsPageState?.selectedOption || {
      category: "",
      style: "",
      color: "",
      mood: "",
    }
  );
  const [resultImage, setResultImage] = useState(
    selectGoodsPageState?.resultImage || null
  );

  const [toastOption, setToastOption] = useState({
    type: "success",
    show: false,
    message: "굿즈 이미지 생성 완료!",
    duration: 2000,
  });

  const fileInputRef = useRef(null);
  const [uploadImgGroupId, setUploadImgGroupId] = useState(
    selectGoodsPageState?.uploadImgGroupId || null
  );

  const [hoveredStyle, setHoveredStyle] = useState(null);

  // 뒤로 버튼으로 돌아왔을 때 URL에서 File 객체로 복원
  useEffect(() => {
    if (selectGoodsPageState) {
      // uploadedImages URL 배열에서 File 객체로 변환
      const restoreFiles = async () => {
        try {
          if (
            selectGoodsPageState.uploadedImages &&
            selectGoodsPageState.uploadedImages.length > 0
          ) {
            const filePromises = selectGoodsPageState.uploadedImages.map(
              async (url) => {
                // blob: URL인 경우 (로컬 브라우저 URL)
                if (url.startsWith("blob:")) {
                  // blob URL에서 직접 fetch하여 File 객체로 변환
                  const response = await fetch(url);
                  const blob = await response.blob();
                  const fileName =
                    url.split("/").pop() || `image-${Date.now()}.jpg`;
                  const contentType = blob.type || "image/jpeg";
                  return new File([blob], fileName, { type: contentType });
                } else {
                  // HTTP/HTTPS URL인 경우 백엔드 API를 통해 다운로드
                  const response = await apiClient.get(
                    "/api/goods/download-image",
                    {
                      params: { url },
                      responseType: "blob", // 바이너리 데이터로 받기
                    }
                  );
                  const blob = response.data;
                  // URL에서 파일명 추출 시도, 없으면 기본값 사용
                  const fileName =
                    url.split("/").pop() || `image-${Date.now()}.jpg`;
                  // Content-Type 헤더에서 MIME 타입 가져오기, 없으면 blob.type 사용
                  const contentType =
                    response.headers["content-type"] ||
                    blob.type ||
                    "image/jpeg";
                  return new File([blob], fileName, { type: contentType });
                }
              }
            );
            const files = await Promise.all(filePromises);
            setUploadedImageFiles(files);
          }
        } catch (error) {
          console.error("파일 복원 실패:", error);
        }
      };
      restoreFiles();
    }

    if (goodsDetail) {
      setSelectedOption({
        category: goodsDetail.categoryKoreanName,
        style: goodsDetail.goodsStyle,
        color: goodsDetail.goodsTone,
        mood: goodsDetail.goodsMood,
      });
      setDescription(goodsDetail.prompt);
    }
  }, []);

  const categories = ["키링", "핸드폰케이스", "그립톡", "카드 지갑", "머그컵"];
  const styles = ["일러스트", "실사", "페인팅"];
  const colors = ["따뜻", "차분", "비비드"];
  const moods = ["미니멀", "캐주얼", "고급"];
  const MAX_IMAGES = 2;
  const ALLOWED_TYPES = ["image/png", "image/jpeg", "image/gif"];
  const ALLOWED_EXTENSIONS = [".png", ".jpg", ".jpeg", ".gif"]; // JFIF 제외
  const MAX_SIZE = 10 * 1024 * 1024; // 10MB

  // 이미지 드래그 업로드 연결
  const handleDrop = (e) => {
    e.preventDefault();
    const files = Array.from(e.dataTransfer.files);
    handleFiles(files);
  };

  // 이미지 업로드
  const handleFiles = (files) => {
    // 확장자 체크 함수
    const getFileExtension = (filename) => {
      return filename.toLowerCase().substring(filename.lastIndexOf("."));
    };

    // MIME 타입과 확장자 모두 체크
    const hasInvalidType = files.some((file) => {
      const extension = getFileExtension(file.name);
      return (
        !ALLOWED_TYPES.includes(file.type) ||
        !ALLOWED_EXTENSIONS.includes(extension)
      );
    });

    if (hasInvalidType) {
      alert("PNG, JPG/JPEG, GIF 확장자만 업로드 가능합니다.");
      return;
    }

    const hasInvalidSize = files.some((file) => file.size > MAX_SIZE);

    if (hasInvalidSize) {
      alert("파일 크기는 10MB를 초과할 수 없습니다.");
      return;
    }

    if (uploadedImages.length >= MAX_IMAGES) {
      alert("이미지는 최대 2개까지 업로드할 수 있습니다.");
      return;
    }

    const remainCount = MAX_IMAGES - uploadedImages.length;
    const filesToAdd = files.slice(0, remainCount);

    // File 객체와 미리보기 URL 모두 저장
    const imageUrls = filesToAdd.map((file) => URL.createObjectURL(file));
    setUploadedImageFiles((prev) => [...prev, ...filesToAdd]);
    setUploadedImages((prev) => [...prev, ...imageUrls]);
  };

  // 클릭 업로드 연결
  const handleFileInputChange = (e) => {
    const files = Array.from(e.target.files);
    handleFiles(files);
    e.target.value = "";
  };

  // 업로드한 이미지 삭제
  const handleDeleteImage = (index) => {
    URL.revokeObjectURL(uploadedImages[index]);
    setUploadedImageFiles((prev) => prev.filter((_, i) => i !== index));
    setUploadedImages((prev) => prev.filter((_, i) => i !== index));
  };

  // 옵션 선택
  const handleOptionChange = (key, value) => {
    setSelectedOption((prev) => {
      const next = { ...prev, [key]: value };
      handleDescription(next);
      return next;
    });
  };

  // 스크립트 생성
  const handleDescription = (option) => {
    const { category, style, color, mood } = option;

    let descript = "";

    if (style) {
      descript += " 화풍 " + style;
    }
    if (color) {
      descript += " 색감 " + color;
    }
    if (mood) {
      descript += " 분위기 " + mood;
    }
    if (category) {
      descript += " " + category + " 적용 시안";
    }
    setDescription(descript);
  };

  // 굿즈 이미지 생성 함수
  const handleCreateGoodsImage = () => {
    const formData = new FormData();

    // 이미지 파일 추가
    uploadedImageFiles.forEach((file) => {
      formData.append("uploadImages", file);
    });

    // 이전 상태가 있으면 이전 값들 추가 (백엔드에서 기존 리소스 삭제 및 그룹 재사용)
    if (uploadImgGroupId) {
      formData.append("prevUploadImgGroupId", uploadImgGroupId.toString());
    }
    if (resultImage) {
      formData.append("prevGoodsImageUrl", resultImage);
    }

    // 나머지 데이터 추가
    formData.append("description", description);
    formData.append("category", selectedOption.category);
    formData.append("style", selectedOption.style);
    formData.append("color", selectedOption.color);
    formData.append("mood", selectedOption.mood);

    goodsImageCreateMutation.mutate(formData);
  };

  // 굿즈 이미지 생성 mutation
  const goodsImageCreateMutation = useMutation({
    mutationFn: async (formData) => {
      const response = await apiClient.post(
        "/api/goods/create-image",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      return response.data;
    },
    onSuccess: (data) => {
      if (data.status === "SUCCESS") {
        setResultImage(data.goodsImgUrl);
        setUploadImgGroupId(data.uploadImgGroupId);
        setToastOption({
          type: "success",
          show: true,
          message: "굿즈 이미지 생성 완료!",
          duration: 2000,
        });
      } else {
        setToastOption({
          type: "error",
          show: true,
          message: "굿즈 이미지 생성에 실패했습니다.",
          duration: 2000,
        });
      }
    },
    onError: (error) => {
      console.error("굿즈 이미지 생성 실패 :", error);
      setToastOption({
        type: "error",
        show: true,
        message: "굿즈 이미지 생성에 실패했습니다.",
        duration: 2000,
      });
    },
  });

  // 시안 생성 함수 - 바로 SelectGoodsPage로 이동 (시안 생성은 SelectGoodsPage에서 처리)
  const handleCreateGoodsSampleImage = () => {
    // SelectGoodsPage로 이동하면서 현재 상태 전달 (시안 생성은 SelectGoodsPage에서 처리)
    // previousState의 uploadedImages URL 배열도 함께 전달 (뒤로 돌아왔을 때 복원용)
    navigate("/selectGoods", {
      state: {
        createPageState: {
          uploadedImages: uploadedImages,
          description: description,
          selectedOption: selectedOption,
          resultImage: resultImage,
          uploadImgGroupId: uploadImgGroupId,
        },
      },
    });
  };

  return (
    <div className="bg-[#f5f3f0] h-[calc(100vh-64px-56px)] overflow-hidden">
      {/* 로딩 스피너 */}
      {goodsImageCreateMutation.isPending && (
        <LoadingSpinner message="굿즈 이미지 생성 중..." position="top-right" />
      )}

      {/* 토스트 */}
      {toastOption.show && (
        <Toast
          type={toastOption.type}
          message={toastOption.message}
          position="top-right"
          duration={toastOption.duration}
          onClose={() => setToastOption({ ...toastOption, show: false })}
        />
      )}

      <div className="max-w-[1440px] mx-auto px-8 h-full">
        <div className="flex gap-6 min-h-full">
          {/* 왼쪽 메인 영역 */}
          <div className="flex-1 overflow-hidden mt-0">
            {/* 제목 섹션 */}
            <div className="mb-10 mt-6">
              <h1 className="text-[28px] font-bold text-[#2d2520] leading-[42px] mb-2">
                굿즈만들기
              </h1>
              <p className="text-[14px] text-[#6b6560] leading-[21px]">
                AI가 당신만의 특별한 굿즈 디자인을 만들어드립니다 ✨
              </p>
            </div>

            {/* 메인 카드 */}
            <div className="bg-white border border-[#e5e7eb] rounded-[16px] shadow-lg p-6">
              {/* 이미지 업로드 영역 */}
              <div className="bg-gradient-to-b from-[#fafaf8] to-[#f5f0eb] border border-[#e2e8f0] rounded-[14px] h-[360px] flex items-center justify-center mb-8 relative overflow-hidden">
                {resultImage ? (
                  <img
                    src={resultImage}
                    alt="결과물 이미지"
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <div className="text-center">
                    <div className="bg-white border border-[#e5e7eb] rounded-[16px] w-20 h-20 flex items-center justify-center mx-auto mb-4 shadow-md">
                      <img
                        src={starIcon}
                        alt="star"
                        className="w-10 h-10 object-cover "
                      />
                    </div>
                    <h3 className="text-[20px] font-bold text-[#2d2520] mb-2">
                      나만의 굿즈 디자인 시작하기
                    </h3>
                    <p className="text-[14px] text-[#6b6560] leading-[22.75px]">
                      오른쪽에서 이미지를 업로드하거나,
                      <br />
                      아래 입력창에 원하는 디자인을 설명해주세요
                    </p>
                  </div>
                )}
              </div>

              {/* 텍스트 입력 영역 */}
              <div className="bg-[#fafaf8] border border-[#e2e8f0] rounded-[14px] p-5 shadow-sm">
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="예: 귀여운 강아지가 있는 파스텔톤 키링 디자인을 만들어주세요"
                  className="w-full h-[90px] bg-transparent border-none outline-none resize-none text-[15px] text-[#4b5563] placeholder:text-[#99a1af] leading-[24.375px]"
                />
                <div className="border-t border-[#e2e8f0] pt-3 flex items-center justify-end">
                  <button
                    disabled={
                      selectedOption.category === "" ||
                      uploadedImages.length == 0
                    }
                    onClick={() => {
                      handleCreateGoodsImage();
                    }}
                    className={`rounded-full w-[37.6px] h-[37.6px] flex items-center justify-center
                      transition-all duration-200 ease-out
                      ${
                        selectedOption.category === "" ||
                        uploadedImages.length === 0
                          ? "bg-[#f1f3f5] text-black opacity-70 cursor-default"
                          : "bg-[#b08c6f] text-white hover:shadow-md cursor-pointer"
                      }
                    `}
                  >
                    <PaperAirplaneIcon className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* 오른쪽 사이드바 */}
          <div className="w-[380px] min-h-full bg-[#fafaf8] border-l border-[#d1d5dc] p-10 flex flex-col gap-4">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-[13px] font-bold text-[#0a0a0a]">
                  이미지 업로드
                </h3>
                <span className="text-[13px] text-[#fb2c36]">
                  * 필수(최대 2장)
                </span>
              </div>
              <div
                onClick={() => {
                  if (uploadedImages.length < MAX_IMAGES) {
                    fileInputRef.current?.click();
                  }
                }}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e)}
                className={`bg-white border rounded-[10px] h-[200px]
                            flex flex-col items-center justify-center cursor-pointer
                            ${
                              uploadedImages.length >= 2
                                ? "opacity-50 cursor-not-allowed"
                                : "hover:bg-gray-50"
                            }
                          `}
              >
                <div className="bg-[rgba(248,250,252,0.5)] border border-[#e2e8f0] rounded-full w-12 h-12 flex items-center justify-center mb-3">
                  <svg
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    className="text-[#4a5565]"
                  >
                    <path
                      d="M12 5V19M5 12H19"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>
                <p className="text-[13px] text-[#4a5565] text-center mb-1">
                  이미지를 드래그하거나
                </p>
                <p className="text-[13px] text-[#4a5565] text-center mb-2">
                  클릭하여 업로드
                </p>
                <p className="text-[11px] text-[#99a1af]">
                  PNG, JPG/JPEG, GIF (최대 10MB)
                </p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                multiple="multiple"
                accept="image/*"
                onChange={handleFileInputChange}
                className="hidden"
              />

              <div className="mt-3 h-[72px] flex gap-2 items-center">
                {uploadedImages &&
                  uploadedImages?.map((image, index) => (
                    <div
                      key={index}
                      className="relative bg-white border border-[#e2e8f0] rounded-[16px] w-[60px] h-[60px] flex items-center justify-center"
                    >
                      <img
                        src={image}
                        alt={`미리보기-${index}`}
                        className="w-full h-full object-cover rounded-[16px]"
                      />
                      <XMarkIcon
                        className="w-5 h-5 text-[#99alaf] top-0.5 right-0.5 absolute cursor-pointer"
                        onClick={() => handleDeleteImage(index)}
                      />
                    </div>
                  ))}
              </div>
            </div>

            {/* 굿즈 카테고리 */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <h3 className="text-[13px] font-bold text-[#0a0a0a]">
                  굿즈 카테고리
                </h3>
                <span className="text-[13px] text-[#fb2c36]">* 필수</span>
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleOptionChange("category", category)}
                    className={`px-3 py-2 rounded-[9px] text-[14px] transition-colors ${
                      selectedOption.category === category
                        ? "bg-[#B08C6F] border border-[#d1d5dc] text-[#FFFFFF]"
                        : "bg-white border border-[#d1d5dc] text-[#0a0a0a] hover:cursor-pointer"
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>

            {/* 화풍 */}
            <div>
              <h3 className="text-[13px] font-bold text-[#0a0a0a] mb-3">
                화풍
              </h3>

              <div className="relative flex flex-wrap gap-2">
                {styles.map((style) => (
                  <button
                    key={style}
                    onClick={() => handleOptionChange("style", style)}
                    onMouseEnter={() => setHoveredStyle(style)}
                    onMouseLeave={() => setHoveredStyle(null)}
                    className={`px-3 py-2 rounded-[9px] text-[14px] transition-colors ${
                      selectedOption.style === style
                        ? "bg-[#B08C6F] border border-[#d1d5dc] text-[#FFFFFF]"
                        : "bg-white border border-[#d1d5dc] text-[#0a0a0a] hover:cursor-pointer"
                    }`}
                  >
                    {style}
                  </button>
                ))}

                {hoveredStyle && (
                  <img
                    src={
                      hoveredStyle === "일러스트"
                        ? IllustrationSample
                        : hoveredStyle === "실사"
                        ? RealisticSample
                        : PaintingSample
                    }
                    alt={hoveredStyle}
                    className="w-32 h-32 object-cover absolute -top-36 left-1/2 -translate-x-1/2 z-10 rounded-[16px]"
                  />
                )}
              </div>
            </div>

            {/* 색감 */}
            <div>
              <h3 className="text-[13px] font-bold text-[#0a0a0a] mb-3">
                색감
              </h3>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => handleOptionChange("color", color)}
                    className={`px-3 py-2 rounded-[9px] text-[14px] transition-colors ${
                      selectedOption.color === color
                        ? "bg-[#B08C6F] border border-[#d1d5dc] text-[#FFFFFF]"
                        : "bg-white border border-[#d1d5dc] text-[#0a0a0a] hover:cursor-pointer"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* 분위기 */}
            <div>
              <h3 className="text-[13px] font-bold text-[#0a0a0a] mb-3">
                분위기
              </h3>
              <div className="flex flex-wrap gap-2">
                {moods.map((mood) => (
                  <button
                    key={mood}
                    onClick={() => handleOptionChange("mood", mood)}
                    className={`px-3 py-2 rounded-[9px] text-[14px] transition-colors ${
                      selectedOption.mood === mood
                        ? "bg-[#B08C6F] border border-[#d1d5dc] text-[#FFFFFF]"
                        : "bg-white border border-[#d1d5dc] text-[#0a0a0a] hover:cursor-pointer"
                    }`}
                  >
                    {mood}
                  </button>
                ))}
              </div>
            </div>

            {/* 시안 생성 버튼 */}
            <button
              onClick={handleCreateGoodsSampleImage}
              disabled={resultImage === null}
              className="bg-[#b08c6f] text-white h-[52px] w-full max-w-[260px] mx-auto rounded-[12px] text-[16px] font-medium shadow-md hover:bg-[#9d7a5f] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              시안 생성
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
