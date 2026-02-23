# 🔧 Google Apps Script 빠른 설정 가이드

## 📋 체크리스트

아래 단계를 따라하며 체크하세요:

### ✅ 1단계: Google Sheets 만들기 (1분)

```
1. https://sheets.google.com 접속
2. 빈 스프레드시트 클릭
3. 제목: "째깍홈티 신청서"
4. 시트1 이름: "부모신청" (띄어쓰기 없이!)
5. 시트2 이름: "치료사신청" (띄어쓰기 없이!)
```

### ✅ 2단계: 스프레드시트 ID 복사 (30초)

브라우저 주소창에서:
```
https://docs.google.com/spreadsheets/d/[여기를_복사]/edit
```

예시:
```
1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p
```

📝 복사한 ID: ___________________________________

### ✅ 3단계: Apps Script 열기 (30초)

```
1. Google Sheets에서 "확장 프로그램" 메뉴
2. "Apps Script" 클릭
3. 새 탭에서 편집기 열림
```

### ✅ 4단계: 코드 붙여넣기 (1분)

```
1. 편집기의 기본 코드 모두 삭제
2. 로컬 파일 열기: google-apps-script/Code.gs
3. 전체 복사 (Cmd+A, Cmd+C)
4. Apps Script 편집기에 붙여넣기 (Cmd+V)
5. 5번째 줄 찾기:
   const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';
6. 복사한 ID로 교체:
   const SPREADSHEET_ID = '1a2b3c4d5e6f7g8h9i0j1k2l3m4n5o6p';
7. 저장 (💾 또는 Cmd+S)
```

### ✅ 5단계: 권한 승인 (1분)

```
1. 함수 선택: testParentSubmission
2. 실행 버튼 (▶) 클릭
3. 권한 요청 팝업:
   - "권한 검토" 클릭
   - 본인 계정 선택
   - "고급" 클릭
   - "[프로젝트명](안전하지 않음)으로 이동" 클릭
   - "허용" 클릭
4. Google Sheets에서 "부모신청" 시트 확인
   - 헤더 + 테스트 데이터 있어야 함!
```

### ✅ 6단계: 웹 앱 배포 (1분)

```
1. 우측 상단 "배포" 버튼
2. "새 배포" 선택
3. 톱니바퀴(⚙️) 클릭
4. "유형 선택" → "웹 앱"
5. 설정:
   ├─ 설명: 째깍홈티 API
   ├─ 실행: 나
   └─ 액세스: 모든 사용자 ⭐⭐⭐
6. "배포" 클릭
7. URL 복사:
```

📝 웹 앱 URL: ___________________________________

예시:
```
https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXX/exec
```

### ✅ 7단계: 프론트엔드 연결 (30초)

터미널에서 또는 에디터로:

파일: `landing-pages/assets/js/form-handler.js`

2번째 줄 수정:
```javascript
// 변경 전:
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

// 변경 후:
const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxXXXXXXXXXXXXXXX/exec';
```

**저장 필수!**

---

## 🧪 로컬 테스트

```bash
# 로컬 서버 실행 중이면
http://localhost:8080

1. 부모 신청서 작성 및 제출
2. Google Sheets 확인
3. 데이터가 들어왔으면 성공! ✅
```

---

## ⚠️ 주의사항

### 시트 이름 정확히!
```
✅ 부모신청 (띄어쓰기 없음)
✅ 치료사신청 (띄어쓰기 없음)

❌ 부모 신청 (띄어쓰기 있음)
❌ 부모신청서
❌ Parent
```

### 웹 앱 URL 끝이 /exec인지 확인
```
✅ https://script.google.com/.../exec
❌ https://script.google.com/.../dev (이건 배포 버전 아님)
```

### 액세스 권한 "모든 사용자"
```
✅ 액세스 권한: 모든 사용자
❌ 액세스 권한: 나만
```

---

## 📝 완료 기록

```
날짜: _______________
담당자: _______________
스프레드시트 ID: _______________
웹 앱 URL: _______________
테스트 완료: [ ]
```

이제 Git & Vercel 배포로 넘어가세요! →
