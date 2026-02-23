# 째깍홈티 배포 가이드

이 문서는 째깍홈티 랜딩 페이지를 처음부터 끝까지 배포하는 상세한 가이드입니다.

## 📋 목차

1. [Google Sheets 설정](#1-google-sheets-설정)
2. [Google Apps Script 설정](#2-google-apps-script-설정)
3. [프론트엔드 설정](#3-프론트엔드-설정)
4. [웹 호스팅 배포](#4-웹-호스팅-배포)
5. [테스트](#5-테스트)
6. [운영 팁](#6-운영-팁)

---

## 1. Google Sheets 설정

### 1-1. 새 스프레드시트 만들기

1. 브라우저에서 https://sheets.google.com 접속
2. 좌측 상단 **빈 스프레드시트** 클릭
3. 상단에서 제목을 "째깍홈티 신청서 DB"로 변경

### 1-2. 시트 생성

1. 하단의 "Sheet1" 탭 우클릭 > **이름 바꾸기** > "부모신청" 입력
2. 하단의 **+** 버튼 클릭하여 새 시트 추가
3. 새로 생성된 시트 이름을 "치료사신청"으로 변경

### 1-3. 스프레드시트 ID 복사

1. 브라우저 주소창의 URL 확인
   ```
   https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p/edit
   ```
2. `d/` 다음부터 `/edit` 전까지의 문자열이 스프레드시트 ID입니다
   - 위 예시: `1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p`
3. 메모장이나 메모 앱에 복사해두기

---

## 2. Google Apps Script 설정

### 2-1. Apps Script 편집기 열기

1. Google Sheets에서 **확장 프로그램** 메뉴 클릭
2. **Apps Script** 선택
3. 새 탭에서 Apps Script 편집기가 열림

### 2-2. 코드 입력

1. 편집기에 기본으로 있는 코드를 모두 삭제
2. `google-apps-script/Code.gs` 파일을 열어 전체 내용 복사
3. Apps Script 편집기에 붙여넣기
4. 코드 상단의 `SPREADSHEET_ID` 찾기:
   ```javascript
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
   ```
5. `'YOUR_SPREADSHEET_ID_HERE'` 부분을 앞서 복사한 실제 ID로 변경:
   ```javascript
   const SPREADSHEET_ID = '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p';
   ```
6. 상단의 **💾 저장** 아이콘 클릭

### 2-3. 테스트 실행

1. 함수 선택 드롭다운에서 `testParentSubmission` 선택
2. **▶ 실행** 버튼 클릭
3. 권한 요청 팝업이 뜨면:
   - **권한 검토** 클릭
   - 본인 Google 계정 선택
   - **고급** 클릭 > **[프로젝트명](안전하지 않음)으로 이동** 클릭
   - **허용** 클릭
4. Google Sheets로 돌아가서 "부모신청" 시트 확인
   - 헤더와 테스트 데이터가 추가되어 있어야 함
5. 같은 방법으로 `testTherapistSubmission`도 실행하여 "치료사신청" 시트 확인

### 2-4. 웹 앱으로 배포

1. Apps Script 편집기 우측 상단 **배포** 버튼 클릭
2. **새 배포** 선택
3. 배포 설정:
   - 좌측의 톱니바퀴(⚙️) 아이콘 클릭
   - **유형 선택** > **웹 앱** 선택
4. 세부 정보 입력:
   - **설명**: "째깍홈티 신청서 API" (선택사항)
   - **다음 계정으로 실행**: **나** 선택
   - **액세스 권한**: **모든 사용자** 선택
5. **배포** 버튼 클릭
6. **웹 앱 URL** 전체를 복사
   ```
   https://script.google.com/macros/s/AKfycbx.../exec
   ```
7. 이 URL을 안전한 곳에 저장

> **⚠️ 중요**: 배포 후 URL이 표시되면 반드시 복사해두세요. 나중에 다시 확인하려면 "배포 관리" 메뉴를 사용해야 합니다.

---

## 3. 프론트엔드 설정

### 3-1. Google Apps Script URL 연결

1. 코드 에디터(VS Code, 메모장 등)로 프로젝트 폴더 열기
2. `assets/js/form-handler.js` 파일 열기
3. 파일 상단의 `GOOGLE_SCRIPT_URL` 찾기:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
4. 앞서 복사한 Apps Script URL로 변경:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx.../exec';
   ```
5. 파일 저장

### 3-2. 회사 정보 수정 (선택사항)

각 HTML 파일의 하단 푸터 섹션에서 회사 정보를 실제 정보로 변경:

**수정할 파일들:**
- `parent/index.html`
- `parent/apply.html`
- `therapist/index.html`
- `therapist/apply.html`

**푸터 섹션 찾기:**
```html
<footer class="footer">
    <p><strong>째깍홈티 by 째깍악어</strong></p>
    <p>사업자등록번호: [추후 입력]</p>
    <p>고객센터: contact@jjaekkak.com</p>
    <p>서울특별시 [주소 추후 입력]</p>
    ...
</footer>
```

**실제 정보로 변경:**
```html
<footer class="footer">
    <p><strong>째깍홈티 by 째깍악어</strong></p>
    <p>사업자등록번호: 123-45-67890</p>
    <p>고객센터: support@jjaekkak.com | 02-1234-5678</p>
    <p>서울특별시 강남구 테헤란로 123</p>
    ...
</footer>
```

---

## 4. 웹 호스팅 배포

### 옵션 A: Netlify (추천 - 가장 쉬움)

#### 4-1. 계정 생성

1. https://netlify.com 접속
2. **Sign up** 클릭
3. GitHub, GitLab, 또는 이메일로 가입

#### 4-2. 사이트 배포

1. 로그인 후 **Sites** 탭 선택
2. **Add new site** > **Deploy manually** 클릭
3. `landing-pages` 폴더 전체를 드래그하여 업로드 영역에 드롭
4. 배포 완료 대기 (약 1-2분)
5. 자동 생성된 URL 확인 (예: `random-name-123.netlify.app`)

#### 4-3. 커스텀 도메인 설정 (선택사항)

1. **Site settings** > **Domain management** 클릭
2. **Add custom domain** 클릭
3. 도메인 입력 및 DNS 설정 안내 따라하기

#### 4-4. 접근 경로 설정

Netlify는 자동으로 모든 HTML 파일을 서빙하므로 추가 설정 불필요.

**접근 URL:**
- 부모 랜딩: `https://your-site.netlify.app/parent/`
- 부모 신청: `https://your-site.netlify.app/parent/apply.html`
- 치료사 랜딩: `https://your-site.netlify.app/therapist/`
- 치료사 신청: `https://your-site.netlify.app/therapist/apply.html`

### 옵션 B: GitHub Pages

#### 4-1. GitHub 저장소 생성

1. https://github.com 접속 및 로그인
2. 우측 상단 **+** > **New repository** 클릭
3. Repository name: `jjaekkak-landing`
4. Public 선택
5. **Create repository** 클릭

#### 4-2. 코드 업로드

**방법 1: GitHub 웹사이트 사용**
1. 저장소 페이지에서 **uploading an existing file** 클릭
2. `landing-pages` 폴더 내의 모든 파일 드래그 앤 드롭
3. **Commit changes** 클릭

**방법 2: Git 명령어 사용**
```bash
cd landing-pages
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/{username}/jjaekkak-landing.git
git push -u origin main
```

#### 4-3. GitHub Pages 활성화

1. 저장소 페이지에서 **Settings** 탭 클릭
2. 좌측 메뉴에서 **Pages** 선택
3. Source 섹션:
   - Branch: **main** 선택
   - Folder: **/ (root)** 선택
4. **Save** 클릭
5. 페이지 새로고침 후 상단에 배포 URL 확인
   ```
   Your site is published at https://{username}.github.io/jjaekkak-landing/
   ```

**접근 URL:**
- 부모 랜딩: `https://{username}.github.io/jjaekkak-landing/parent/`
- 부모 신청: `https://{username}.github.io/jjaekkak-landing/parent/apply.html`
- 치료사 랜딩: `https://{username}.github.io/jjaekkak-landing/therapist/`
- 치료사 신청: `https://{username}.github.io/jjaekkak-landing/therapist/apply.html`

### 옵션 C: 기타 호스팅 서비스

- **Vercel**: Netlify와 유사한 프로세스
- **Firebase Hosting**: Google 통합, 추가 기능 많음
- **AWS S3 + CloudFront**: 대규모 트래픽 대응

---

## 5. 테스트

### 5-1. 브라우저 테스트

1. 배포된 URL로 접속
2. 부모 신청 페이지 테스트:
   - `{your-url}/parent/apply.html` 접속
   - 모든 필수 항목 입력
   - "무료 상담 신청하기" 버튼 클릭
   - "신청이 완료되었습니다!" 메시지 확인
3. 치료사 신청 페이지 테스트:
   - `{your-url}/therapist/apply.html` 접속
   - 모든 필수 항목 입력
   - "지원서 제출하기" 버튼 클릭
   - "지원이 완료되었습니다!" 메시지 확인

### 5-2. 데이터 확인

1. Google Sheets 열기
2. "부모신청" 시트에서 방금 제출한 데이터 확인
3. "치료사신청" 시트에서 방금 제출한 데이터 확인

### 5-3. 모바일 테스트

1. 스마트폰으로 URL 접속
2. 레이아웃 확인
3. 폼 제출 테스트

---

## 6. 운영 팁

### 6-1. 실시간 알림 설정

Google Sheets에서 신청이 들어오면 이메일로 알림받기:

1. Google Sheets 열기
2. **도구** > **알림 규칙** 선택
3. 알림 규칙 설정:
   - **변경사항 유형**: 사용자가 변경한 경우
   - **알림 빈도**: 즉시
4. **저장** 클릭

### 6-2. 데이터 백업

1. Google Sheets 자동 버전 기록 활용
2. 정기적으로 엑셀 파일로 다운로드:
   - **파일** > **다운로드** > **Microsoft Excel (.xlsx)**

### 6-3. 스프레드시트 권한 관리

1. 우측 상단 **공유** 버튼 클릭
2. 팀원 이메일 추가
3. 권한 선택:
   - **뷰어**: 보기만 가능
   - **댓글 작성자**: 댓글 가능
   - **편집자**: 편집 가능

### 6-4. 마케팅 활용

**단축 URL 만들기:**
- bit.ly, 네이버 단축URL 등 활용
- 예: `bit.ly/jjaekkak-parent`

**QR 코드 생성:**
- https://www.qr-code-generator.com
- 오프라인 홍보 자료에 활용

### 6-5. 분석 도구 추가 (선택사항)

**Google Analytics:**

1. https://analytics.google.com 에서 계정 생성
2. 추적 ID 복사 (예: `G-XXXXXXXXXX`)
3. 모든 HTML 파일의 `<head>` 섹션에 추가:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-XXXXXXXXXX');
</script>
```

---

## ❓ 문제 해결

### 폼 제출이 안 돼요

**증상**: 버튼을 눌러도 아무 반응이 없음

**해결 방법:**
1. F12로 개발자 도구 열기
2. Console 탭 확인
3. 오류 메시지 확인
4. `form-handler.js`의 `GOOGLE_SCRIPT_URL`이 올바른지 확인

### 데이터가 Sheets에 저장되지 않아요

**해결 방법:**
1. Apps Script의 `SPREADSHEET_ID`가 올바른지 확인
2. 시트 이름이 정확히 "부모신청", "치료사신청"인지 확인 (띄어쓰기 주의)
3. Apps Script 웹 앱 배포 시 "액세스: 모든 사용자" 설정 확인
4. Apps Script 편집기에서 테스트 함수 실행하여 권한 확인

### 페이지가 제대로 표시되지 않아요

**해결 방법:**
1. 브라우저 캐시 삭제 후 새로고침 (Ctrl+Shift+R)
2. CSS, JS 파일 경로 확인
3. 배포 시 모든 파일이 업로드되었는지 확인

### Apps Script 권한 오류

**해결 방법:**
1. Apps Script 편집기에서 **실행** > `testParentSubmission` 실행
2. 권한 요청 승인
3. 다시 웹 앱 배포

---

## 📞 추가 지원

배포 중 문제가 발생하면:

1. README.md의 "문제 해결" 섹션 참고
2. Google Apps Script 공식 문서: https://developers.google.com/apps-script
3. 째깍홈티 기술 팀 문의: dev@jjaekkak.com

---

**축하합니다! 🎉**

째깍홈티 랜딩 페이지가 성공적으로 배포되었습니다.
