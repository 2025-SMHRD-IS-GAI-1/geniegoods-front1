<table style="border:none; width:100%;">
  <tr style="border:none;">
    <td style="border:none; vertical-align:middle;">
      <img width="361" height="107" alt="Image" src="https://github.com/user-attachments/assets/bb57ba9c-27c7-4427-a148-32c0d378d0f8" />
    </td>
    <td style="border:none; text-align:right; vertical-align:middle;">
      <b>팀장</b> - 김태현
      <br>
      <b>팀원</b> - 이용일,  김다혜, 김태경, 한정훈
      <br><br><br>
       <b>프로젝트 기간</b>
       <br>
      2025.12.30 ~ 2026.01.27
    </td>
  </tr>
</table>


<br>


## 1. 서비스 소개
### 주제 : Google Gemini 2.5 Flash + YOLOv11 기반 사용자 맞춤 반려동물 굿즈 시안 자동 생성 및 주문 웹 서비스
- 여러개의 이미지를 첨부하고 프롬프트 작성 및 키워드 클릭후 굿즈 이미지 생성
- 굿즈 이미지와 비슷한 후보 2안 자동 생성.미리보기/다운로드
- 굿즈 생성 후 (Toss Pay, Kakao Pay, 휴대폰 결제, 무통장 입금) 결제 및 주문 가능


<br>


## 2. 주요 기능

- 객체탐지 및 이미지 생성/편집 기술을 결합하여, 사용자가 사진만 업로드해도 자동으로 재구성된 굿즈 시안을 볼수 있음
- 사용자는 굿즈 후보 3안을 자동 생성.미리보기/다운로드 할수 있음
- 생성된 굿즈를 주문까지 할 수 있는 편의성을 제공하여 굿즈 제작의 진입장벽을 낮춤


<br>


## 3. 기술 스택
<table>
  <tr>
    <th>구분</th>
    <th>사용 기술</th>
  </tr>

  <tr>
    <td><b>FrontEnd</b></td>
    <td>
      <img src="https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
      <img src="https://img.shields.io/badge/javascript-%23323330.svg?style=for-the-badge&logo=javascript&logoColor=%23F7DF1E" />
      <img src="https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white" />
      <img src="https://img.shields.io/badge/axios.js-854195?style=for-the-badge&logo=axios&logoColor=5A29E4" />
      <img src="https://img.shields.io/badge/zustand-602c3c?style=for-the-badge&logo=data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAOCAMAAAAolt3jAAAA8FBMVEVHcExXQzpKQDlFV16lpqyGh4tPPTdWT0weHRU7LRZGQzmxYjlaTkZsbmywVyxtXDSFhISXm6WWpcaytb6bm56gprY0LiiXmp2prLamsMa0XS42MSxkTUVDSkuyYzGihXdDV2GprbmedVxaRD1kTUWUdGFGOCN4a2OfpbI0SFFAMSddTkbCc0dWQiGFRypXQyJUQCBcTTWviDVXQyJcUDjlqCWxjkG+hBTiohtURD6lr8lORTtDVVZmPyxwSipaRSJDOzaWpsyYqMyYqM2dq8tPOjBERTs6QUKTcCeKaCJvViZdSDK4iSngoiDvqx7KkRuGEi1hAAAAOXRSTlMApZ78cB8hCAMQO/j/FOH4KlT1wFfJTjaY6SxtVexFn3Tn2sN6d671mVuJ+/PPN9CT6TfpS4C9jJaVLRihAAAAi0lEQVQIHXXBxRKCUAAF0Es/QMDubsVuGrv1///GBQ4bx3PwgwC8gFCRohs8QrQV0ZtKOZ9JcgBmU8MwqFa9kjNTUWB58f2jPOjU9juTBTbPq+vIar972MZjwPr1uDvqCFw2wQpQVm/t7Oo9gAgAFtrtZNtMFQFp7nkWU5IQECfjYbuQFvBFRJHgjw9L0A80UmaGpAAAAABJRU5ErkJggg==" />
      <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" />
      <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white" />
    </td>
  </tr>

  <tr>
    <td><b>Backend</b></td>
    <td>
      <img src="https://img.shields.io/badge/spring-%236DB33F.svg?style=for-the-badge&logo=spring&logoColor=white" />
      <img src="https://img.shields.io/badge/Apache Tomcat-F8DC75?style=for-the-badge&logo=apachetomcat&logoColor=black" />
      <img src="https://img.shields.io/badge/springsecurity-6DB33F?style=for-the-badge&logo=springsecurity&logoColor=white" />
      <img src="https://img.shields.io/badge/OAuth2-Authorization-000000" />
      <img src="https://img.shields.io/badge/JWT-Token-000000" />
      <img src="https://img.shields.io/badge/Swagger-85EA2D?logo=swagger&logoColor=black" />
      <img src="https://img.shields.io/badge/JPA%2FHibernate-59666C?logo=hibernate&logoColor=white" />
      <img src="https://img.shields.io/badge/FastAPI-005571?style=for-the-badge&logo=fastapi" />
    </td>
  </tr>

  <tr>
    <td><b>모델</b></td>
    <td>
      <img src="https://img.shields.io/badge/YOLO11-Ultralytics-00FFFF?style=flat&logo=yolo" />
      
    </td>
  </tr>

  <tr>
    <td><b>개발도구</b></td>
    <td>
      <img src="https://img.shields.io/badge/Eclipse-2C2255?style=for-the-badge&logo=Eclipse&logoColor=white"/>
      <img src="https://img.shields.io/badge/intellijidea-000000?style=for-the-badge&logo=intellijidea&logoColor=white"/>
      <img src="https://img.shields.io/badge/Google Colab-F9AB00?style=for-the-badge&logo=googlecolab&logoColor=white"/>
      <img src="https://img.shields.io/badge/pycharm-000000?style=for-the-badge&logo=pycharm&logoColor=white"/>
      <img src="https://img.shields.io/badge/Visual%20Studio%20Code-007ACC?logo=visualstudiocode&logoColor=fff&style=plastic" />
    </td>
  </tr>

  <tr>
    <td><b>협업도구</b></td>
    <td>
      <img src="https://img.shields.io/badge/GitHub-181717?style=for-the-badge&logo=GitHub&logoColor=white"/>
    </td>
  </tr>

  <tr>
    <td><b>데이터베이스</b></td>
    <td>
      <img src="https://img.shields.io/badge/MySQL-4479A1?logo=MySQL&logoColor=white" />
    </td>
  </tr>

  <tr>
    <td><b>스토리지</b></td>
    <td>
      <img src="https://img.shields.io/badge/Amazon_S3-438534?style=flat&logo=amazon-s3" />
    </td>
  </tr>

  <tr>
    <td><b>디자인</b></td>
    <td>
      <img src="https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=Figma&logoColor=white"/>
    </td>
  </tr>
</table>


<br>


## 4. 시스템 아키텍쳐
<img width="740" height="341" alt="image" src="https://github.com/user-attachments/assets/ca8c5d41-7f83-4153-bae7-4954558a99cd" />


<br>


## 5. 유스케이스
<img width="869" height="593" alt="image" src="https://github.com/user-attachments/assets/fb9f5902-df6f-4941-ae9e-7c69dba54cd4" />


<br>


## 6. 서비스 흐름도
#### 6-1 회원가입 / 로그인
<img width="912" height="572" alt="image" src="https://github.com/user-attachments/assets/6ad51630-8bca-46e8-a276-9f3b5e0ba180" />

#### 6-2 아이디 / 비밀번호 찾기
<img width="890" height="564" alt="image" src="https://github.com/user-attachments/assets/7f6fda87-622f-460d-b0a8-5f478ebf65ed" />

#### 6-2 메인 / 학습
<img width="945" height="464" alt="image" src="https://github.com/user-attachments/assets/27a7581d-033d-4485-828a-2a37ec06f209" />


<br>


## 7. ER 다이어그램
<img width="839" height="233" alt="image" src="https://github.com/user-attachments/assets/a2bea3e5-be24-4eca-9a9d-4f3a544404a4" />



<br>


## 8. 주요 화면 구성
#### 로그인
<img width="1416" height="916" alt="image" src="https://github.com/user-attachments/assets/1cfce9ad-d5fc-43fb-ac0b-32d819e7c2fa" />

#### 메인 화면
<img width="1416" height="919" alt="image" src="https://github.com/user-attachments/assets/86c316e5-0cab-49ea-ac2c-6a7f939c4d13" />

#### 학습하기
<img width="1416" height="917" alt="image" src="https://github.com/user-attachments/assets/b6db8528-067f-459f-b5e2-a78d899076e8" />

#### 테스트
<img width="1415" height="917" alt="image" src="https://github.com/user-attachments/assets/a0193834-f22d-4fdf-ae27-b5d8ca43a494" />

#### 랭킹
<img width="1417" height="914" alt="image" src="https://github.com/user-attachments/assets/baf62303-478b-445e-92cc-797ef1f84b02" />

#### 지난 학습 결과
<img width="1417" height="916" alt="image" src="https://github.com/user-attachments/assets/07bb57f7-d1de-4306-9b96-017e149f1954" />


<br>


## 9. 팀원 역할
<img width="1030" height="556" alt="image" src="https://github.com/user-attachments/assets/8373cc63-58a1-4ab8-a86a-54ddaad51650" />


<br>


## 10. 트러블 슈팅

<img width="1033" height="548" alt="image" src="https://github.com/user-attachments/assets/c6058909-6776-4d0e-9aa4-cd565ec18491" />


<br>


## 11. 시연 영상
([동영상 링크](https://youtu.be/hL2iqkVBzTc))


<br>
