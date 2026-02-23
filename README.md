# 째깍홈티 랜딩 페이지 & 신청서

발달재활 홈티 매칭 플랫폼 MVP를 위한 랜딩 페이지 및 신청서 시스템입니다.

## 📁 프로젝트 구조

```
landing-pages/
├── parent/                    # 부모용 페이지
│   ├── index.html            # 부모용 랜딩 페이지
│   └── apply.html            # 부모용 신청서
├── therapist/                # 치료사용 페이지
│   ├── index.html            # 치료사용 랜딩 페이지
│   └── apply.html            # 치료사용 신청서
├── assets/                   # 공통 리소스
│   ├── css/
│   │   ├── common.css       # 공통 스타일
│   │   ├── parent.css       # 부모 페이지 스타일
│   │   ├── therapist.css    # 치료사 페이지 스타일
│   │   └── form.css         # 폼 공통 스타일
│   └── js/
│       └── form-handler.js  # Google Sheets 연동 스크립트
├── google-apps-script/       # Google Apps Script 코드
│   └── Code.gs              # 백엔드 스크립트
└── README.md                 # 이 문서
```

## 🚀 빠른 시작

### 1단계: 파일 다운로드

이 프로젝트 폴더를 다운로드합니다.

### 2단계: Google Sheets 설정

#### 2-1. 스프레드시트 생성

1. [Google Sheets](https://sheets.google.com) 접속
2. 새 스프레드시트 만들기
3. "부모신청"과 "치료사신청" 두 개의 시트 생성
4. 스프레드시트 URL에서 ID 복사
   - URL: `https://docs.google.com/spreadsheets/d/{SPREADSHEET_ID}/edit`
   - `{SPREADSHEET_ID}` 부분을 복사

#### 2-2. Apps Script 설정

1. 스프레드시트에서 **확장 프로그램 > Apps Script** 선택
2. `google-apps-script/Code.gs` 파일의 내용을 복사하여 붙여넣기
3. `SPREADSHEET_ID` 변수를 실제 스프레드시트 ID로 변경
4. **저장** 버튼 클릭

#### 2-3. 웹 앱 배포

1. Apps Script 편집기에서 **배포 > 새 배포** 선택
2. 톱니바퀴 아이콘 클릭 > **웹 앱** 선택
3. 설정:
   - **다음 계정으로 실행**: 나
   - **액세스 권한**: 모든 사용자
4. **배포** 버튼 클릭
5. **웹 앱 URL** 복사 (예: `https://script.google.com/macros/s/.../exec`)

#### 2-4. 프론트엔드 연결

1. `assets/js/form-handler.js` 파일 열기
2. `GOOGLE_SCRIPT_URL` 변수에 복사한 웹 앱 URL 입력:

```javascript
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/.../exec';
```

3. 파일 저장

### 3단계: 웹사이트 배포

#### 옵션 A: GitHub Pages (무료, 추천)

1. GitHub 저장소 생성
2. `landing-pages` 폴더 내용 업로드
3. **Settings > Pages** 에서 GitHub Pages 활성화
4. 배포 URL 확인: `https://{username}.github.io/{repo-name}/`

#### 옵션 B: Netlify (무료, 추천)

1. [Netlify](https://netlify.com) 가입
2. **Sites > Add new site > Deploy manually** 선택
3. `landing-pages` 폴더를 드래그 앤 드롭
4. 배포 완료 후 URL 확인

#### 옵션 C: 로컬 테스트

간단한 웹 서버로 로컬에서 테스트:

```bash
# Python 3
cd landing-pages
python3 -m http.server 8000

# 브라우저에서 http://localhost:8000 접속
```

## 📝 페이지 접근 경로

### 부모용
- 랜딩 페이지: `/parent/index.html`
- 신청서: `/parent/apply.html`

### 치료사용
- 랜딩 페이지: `/therapist/index.html`
- 신청서: `/therapist/apply.html`

## 🎨 디자인 커스터마이징

### 색상 변경

`assets/css/parent.css`:
```css
:root {
    --parent-primary: #FFD93D;      /* 부모 메인 색상 (노란색) */
    --parent-secondary: #FFC837;    /* 부모 서브 색상 */
}
```

`assets/css/therapist.css`:
```css
:root {
    --therapist-primary: #4ECDC4;   /* 치료사 메인 색상 (청록색) */
    --therapist-secondary: #44B8B0; /* 치료사 서브 색상 */
}
```

### 텍스트 수정

각 HTML 파일을 열어 직접 수정하면 됩니다.

## 📊 제출 데이터 확인

### Google Sheets에서 확인

1. 생성한 Google Sheets 열기
2. "부모신청" 또는 "치료사신청" 시트 선택
3. 실시간으로 제출된 데이터 확인

### 개발 모드 (로컬 테스트)

Google Apps Script URL을 설정하지 않으면 자동으로 로컬 스토리지에 저장됩니다.

브라우저 개발자 도구 콘솔에서:

```javascript
// 부모 신청서 확인
viewLocalApplications('parent')

// 치료사 신청서 확인
viewLocalApplications('therapist')

// 데이터 초기화
clearLocalApplications('parent')
clearLocalApplications('therapist')
```

## 🔧 문제 해결

### 폼 제출 후 아무 반응이 없어요

1. 브라우저 개발자 도구(F12) > Console 탭 확인
2. 오류 메시지 확인
3. `GOOGLE_SCRIPT_URL`이 올바르게 설정되었는지 확인

### Google Sheets에 데이터가 저장되지 않아요

1. Apps Script 웹 앱 배포 시 "액세스 권한: 모든 사용자" 설정 확인
2. Apps Script의 `SPREADSHEET_ID`가 올바른지 확인
3. Apps Script 편집기 > 실행 > `testParentSubmission` 또는 `testTherapistSubmission` 실행하여 테스트

### CORS 오류가 발생해요

Google Apps Script는 `no-cors` 모드로 요청하므로 CORS 오류는 발생하지 않아야 합니다. 만약 발생한다면:

1. Apps Script 웹 앱 URL이 `/exec`로 끝나는지 확인
2. 웹 앱을 "모든 사용자" 권한으로 재배포

## 📱 반응형 디자인

모든 페이지는 모바일, 태블릿, 데스크톱에서 최적화되어 표시됩니다.

- 모바일: 320px 이상
- 태블릿: 768px 이상
- 데스크톱: 1024px 이상

## 🔐 개인정보 보호

- 제출된 데이터는 Google Sheets에만 저장됩니다
- Google Sheets의 공유 설정을 "특정 사용자만" 으로 설정하세요
- HTTPS를 사용하는 호스팅 서비스 이용을 권장합니다

## 📞 지원

문제가 발생하면 다음을 확인하세요:

1. 브라우저 콘솔의 오류 메시지
2. Google Apps Script 실행 로그
3. Google Sheets의 시트 이름 (정확히 "부모신청", "치료사신청")

## 🎯 다음 단계

1. **도메인 연결**: Netlify나 GitHub Pages에서 커스텀 도메인 설정
2. **Google Analytics**: 방문자 추적 설정
3. **이메일 알림**: Apps Script에 이메일 전송 기능 추가
4. **자동 응답**: 신청 후 자동 확인 이메일 발송

## 📄 라이선스

이 프로젝트는 째깍홈티의 소유입니다.

---

**째깍홈티 by 째깍악어**  
문의: contact@jjaekkak.com
