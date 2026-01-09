import { useState, useEffect, useRef } from "react";

/**
 * 다음 주소 검색 API를 사용하는 커스텀 훅
 * @param {Object} initialAddress - 초기 주소 정보 { zipcode, address, detailAddress }
 * @param {string} detailInputId - 상세주소 입력 필드의 ID (선택사항)
 * @returns {Object} { addressInfo, setAddressInfo, handleAddressSearch, isScriptLoaded }
 */
export function useAddressSearch(
  initialAddress = null,
  detailInputId = "detailAddress"
) {
  const [addressInfo, setAddressInfo] = useState({
    zipcode: initialAddress?.zipcode || "",
    address: initialAddress?.address || "",
    detailAddress: initialAddress?.detailAddress || "",
  });

  const postcodeScriptLoaded = useRef(false);

  // 다음 주소 API 스크립트 로드
  useEffect(() => {
    if (postcodeScriptLoaded.current) return;

    const script = document.createElement("script");
    script.src =
      "//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js";
    script.async = true;
    script.onload = () => {
      postcodeScriptLoaded.current = true;
    };
    document.head.appendChild(script);
  }, []);

  // 초기 주소 정보가 변경되면 업데이트
  useEffect(() => {
    if (initialAddress) {
      setAddressInfo({
        zipcode: initialAddress.zipcode || "",
        address: initialAddress.address || "",
        detailAddress: initialAddress.detailAddress || "",
      });
    }
  }, [initialAddress]);

  // 주소 검색 핸들러
  const handleAddressSearch = () => {
    if (!window.daum || !window.daum.Postcode) {
      alert("주소 검색 서비스를 불러오는 중입니다. 잠시 후 다시 시도해주세요.");
      return;
    }

    new window.daum.Postcode({
      oncomplete: function (data) {
        // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.
        // 각 주소의 노출 규칙에 따라 주소를 조합한다.
        let addr = ""; // 주소 변수
        let extraAddr = ""; // 참고항목 변수

        // 사용자가 선택한 주소 타입에 따라 해당 주소 값을 가져온다.
        if (data.userSelectedType === "R") {
          // 사용자가 도로명 주소를 선택했을 경우
          addr = data.roadAddress;
        } else {
          // 사용자가 지번 주소를 선택했을 경우(J)
          addr = data.jibunAddress;
        }

        // 사용자가 선택한 주소가 도로명 타입일때 참고항목을 조합한다.
        if (data.userSelectedType === "R") {
          // 법정동명이 있을 경우 추가한다. (법정리는 제외)
          // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
          if (data.bname !== "" && /[동|로|가]$/g.test(data.bname)) {
            extraAddr += data.bname;
          }
          // 건물명이 있고, 공동주택일 경우 추가한다.
          if (data.buildingName !== "" && data.apartment === "Y") {
            extraAddr +=
              extraAddr !== "" ? ", " + data.buildingName : data.buildingName;
          }
          // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
          if (extraAddr !== "") {
            extraAddr = " (" + extraAddr + ")";
          }
        }

        // 우편번호와 주소 정보를 해당 필드에 넣는다.
        setAddressInfo({
          zipcode: data.zonecode,
          address: addr + extraAddr,
          detailAddress: addressInfo.detailAddress || "",
        });

        // 상세주소 입력 필드로 포커스 이동
        setTimeout(() => {
          const detailInput = document.getElementById(detailInputId);
          if (detailInput) {
            detailInput.focus();
          }
        }, 100);
      },
      width: "100%",
      height: "100%",
      maxSuggestItems: 5,
    }).open();
  };

  return {
    addressInfo,
    setAddressInfo,
    handleAddressSearch,
    isScriptLoaded: postcodeScriptLoaded.current,
  };
}
