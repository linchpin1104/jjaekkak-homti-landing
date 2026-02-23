# 째깍홈티 설정 및 배포 - 단계별 가이드

## 🎯 Step 1: Google Apps Script 설정 (5분)

### 1-1. Google Sheets 만들기

1. 브라우저에서 https://sheets.google.com 접속
2. **빈 스프레드시트** 클릭
3. 상단 제목을 "째깍홈티 신청서"로 변경

### 1-2. 시트 2개 생성

1. 하단의 "Sheet1" 탭 우클릭 → **이름 바꾸기** → `부모신청` 입력
2. 하단의 **+** 버튼 클릭
3. "Sheet2" 이름 바꾸기 → `치료사신청` 입력

**⚠️ 주의**: 띄어쓰기 없이 정확히 "부모신청", "치료사신청"으로 입력!

### 1-3. 스프레드시트 ID 복사

1. 브라우저 주소창 확인:
   ```
   https://docs.google.com/spreadsheets/d/1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p/edit
                                        ↑ 이 부분이 ID
   ```
2. `/d/` 다음부터 `/edit` 전까지 복사
3. 메모장에 저장

### 1-4. Apps Script 편집기 열기

1. Google Sheets에서 **확장 프로그램** 메뉴 클릭
2. **Apps Script** 선택
3. 새 탭이 열림

### 1-5. 코드 붙여넣기

1. 편집기에 있는 기본 코드 모두 삭제
2. 로컬의 `google-apps-script/Code.gs` 파일 열기
3. 전체 내용 복사
4. Apps Script 편집기에 붙여넣기

### 1-6. 스프레드시트 ID 입력

코드 5번째 줄 찾기:
```javascript
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
```

앞서 복사한 ID로 변경:
```javascript
const SPREADSHEET_ID = '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p';
```

**저장** 버튼 클릭 (💾)

### 1-7. 테스트 실행

1. 상단 함수 선택 드롭다운 → `testParentSubmission` 선택
2. **▶ 실행** 버튼 클릭
3. 권한 요청 팝업이 뜨면:
   - **권한 검토** 클릭
   - 본인 계정 선택
   - **고급** 클릭
   - **[프로젝트명](안전하지 않음)으로 이동** 클릭
   - **허용** 클릭
4. Google Sheets로 돌아가서 "부모신청" 시트 확인
   - 헤더와 테스트 데이터가 있어야 함!

### 1-8. 웹 앱으로 배포

1. Apps Script 우측 상단 **배포** 버튼 클릭
2. **새 배포** 선택
3. 좌측 톱니바퀴(⚙️) 아이콘 클릭
4. **유형 선택** → **웹 앱** 선택
5. 설정:
   ```
   설명: 째깍홈티 API
   다음 계정으로 실행: 나
   액세스 권한: 모든 사용자 ⭐ 중요!
   ```
6. **배포** 클릭
7. **웹 앱 URL** 전체 복사 (이게 중요!)
   ```
   https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXX/exec
   ```

### 1-9. 프론트엔드에 URL 연결

1. 로컬 에디터에서 `landing-pages/assets/js/form-handler.js` 열기
2. 2번째 줄 찾기:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';
   ```
3. 복사한 웹 앱 URL로 변경:
   ```javascript
   const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXX/exec';
   ```
4. **저장** (중요!)

---

## 🚀 Step 2: Git & Vercel 배포 (5분)

### 2-1. Git 초기화 및 커밋

터미널에서:

```bash
cd /Users/healin/Downloads/develop/conneting_development/landing-pages

# Git 초기화
git init

# .gitignore 생성 (선택사항)
echo ".DS_Store" > .gitignore
echo "*.txt" >> .gitignore

# 파일 추가
git add .

# 커밋
git commit -m "feat: 째깍홈티 랜딩 페이지 및 신청서 시스템 초기 버전"
```

### 2-2. GitHub 저장소 생성

1. https://github.com 접속 및 로그인
2. 우측 상단 **+** → **New repository** 클릭
3. 설정:
   ```
   Repository name: jjaekkak-homti-landing
   Description: 째깍홈티 발달재활 홈티 매칭 플랫폼
   Public 선택
   ```
4. **Create repository** 클릭

### 2-3. GitHub에 푸시

GitHub 저장소 페이지의 안내대로:

```bash
# 원격 저장소 연결
git remote add origin https://github.com/{your-username}/jjaekkak-homti-landing.git

# 브랜치 이름 변경 (필요시)
git branch -M main

# 푸시
git push -u origin main
```

### 2-4. Vercel 배포

#### 방법 A: Vercel 웹사이트 (추천)

1. https://vercel.com 접속
2. **Sign Up** → GitHub 계정으로 가입
3. 로그인 후 **Add New...** → **Project** 클릭
4. **Import Git Repository** 섹션에서 방금 만든 저장소 찾기
5. **Import** 클릭
6. 설정:
   ```
   Project Name: jjaekkak-homti
   Framework Preset: Other
   Root Directory: ./
   Build Command: (비워두기)
   Output Directory: (비워두기)
   ```
7. **Deploy** 클릭
8. 배포 완료 후 URL 확인:
   ```
   https://jjaekkak-homti.vercel.app
   ```

#### 방법 B: Vercel CLI (고급)

```bash
# Vercel CLI 설치
npm install -g vercel

# 로그인
vercel login

# 배포
vercel

# 프로덕션 배포
vercel --prod
```

### 2-5. 커스텀 도메인 설정 (선택사항)

Vercel 대시보드에서:
1. 프로젝트 선택
2. **Settings** → **Domains**
3. **Add** 클릭하여 도메인 추가
4. DNS 설정 안내 따라하기

---

## ✅ Step 3: 테스트

### 3-1. 브라우저 테스트

배포된 URL로 접속:
```
https://jjaekkak-homti.vercel.app
```

### 3-2. 부모 신청서 테스트

1. 부모님 카드 클릭
2. 신청서 작성
3. 제출
4. "신청이 완료되었습니다!" 메시지 확인

### 3-3. 데이터 확인

1. Google Sheets 열기
2. "부모신청" 시트에서 방금 제출한 데이터 확인
3. 타임스탬프, 이름, 연락처 등 모든 정보가 저장되었는지 확인

### 3-4. 치료사 신청서 테스트

같은 방식으로 치료사 지원서 테스트

---

## 📱 Step 4: 모바일 테스트

스마트폰으로:
1. 배포 URL 접속
2. 레이아웃 확인
3. 폼 제출 테스트
4. 데이터 저장 확인

---

## 🔧 문제 해결

### ❌ 폼 제출이 안 돼요

**원인**: Apps Script URL이 제대로 설정되지 않음

**해결**:
1. `assets/js/form-handler.js` 다시 확인
2. URL이 `https://script.google.com/macros/s/.../exec`로 끝나는지 확인
3. 파일 저장 확인
4. Vercel 재배포 (자동 배포 안 되면 수동으로)

### ❌ Sheets에 데이터가 안 들어와요

**원인 1**: 시트 이름 오타
- "부모신청", "치료사신청" 정확히 확인 (띄어쓰기 없음)

**원인 2**: 스프레드시트 ID 오류
- `Code.gs`의 `SPREADSHEET_ID` 재확인

**원인 3**: 권한 문제
- Apps Script 배포 시 "액세스: 모든 사용자" 확인
- 테스트 함수 실행하여 권한 재승인

### ❌ CORS 오류

**해결**: Apps Script는 자동으로 CORS 처리됨
- 웹 앱 URL이 `/exec`로 끝나는지 확인
- 배포 설정에서 "모든 사용자" 액세스 확인

### ❌ Vercel 빌드 실패

**원인**: 정적 사이트이므로 빌드 없음
- Build Command는 비워두기
- Output Directory도 비워두기

---

## 📊 운영 팁

### 실시간 알림 받기

Google Sheets에서:
1. **도구** → **알림 규칙**
2. "사용자가 변경한 경우" 선택
3. "즉시" 선택
4. 저장

### 데이터 백업

주기적으로:
1. **파일** → **다운로드** → **Microsoft Excel (.xlsx)**
2. 별도 폴더에 백업

### 코드 업데이트 시

```bash
git add .
git commit -m "update: 폼 필드 수정"
git push
```

Vercel이 자동으로 재배포합니다!

---

## 🎉 완료!

이제 다음 URL들을 팀원들과 공유하세요:

```
🏠 홈페이지: https://jjaekkak-homti.vercel.app
👶 부모 신청: https://jjaekkak-homti.vercel.app/parent/apply.html
👨‍⚕️ 치료사 지원: https://jjaekkak-homti.vercel.app/therapist/apply.html
📊 데이터 관리: [Google Sheets URL]
```

### 단축 URL 만들기

마케팅용:
- bit.ly → `bit.ly/jjaekkak-parent`
- bit.ly → `bit.ly/jjaekkak-teacher`
