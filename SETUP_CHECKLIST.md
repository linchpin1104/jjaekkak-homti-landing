# 째깍홈티 설정 체크리스트

배포 전 필수 확인 사항들을 체크하세요.

## ✅ 1단계: Google Sheets 설정

- [ ] Google Sheets 새 스프레드시트 생성
- [ ] "부모신청" 시트 생성
- [ ] "치료사신청" 시트 생성
- [ ] 스프레드시트 ID 복사 완료

## ✅ 2단계: Google Apps Script 설정

- [ ] Apps Script 편집기 열기
- [ ] `Code.gs` 파일 내용 복사/붙여넣기
- [ ] `SPREADSHEET_ID` 변수에 실제 ID 입력
- [ ] 코드 저장
- [ ] `testParentSubmission` 함수 실행 및 권한 승인
- [ ] `testTherapistSubmission` 함수 실행 및 확인
- [ ] 웹 앱으로 배포 (액세스: 모든 사용자)
- [ ] 웹 앱 URL 복사 완료

## ✅ 3단계: 프론트엔드 설정

- [ ] `assets/js/form-handler.js` 파일 열기
- [ ] `GOOGLE_SCRIPT_URL` 변수에 웹 앱 URL 입력
- [ ] 파일 저장

## ✅ 4단계: 회사 정보 수정 (선택사항)

- [ ] `parent/index.html` 푸터 정보 수정
- [ ] `parent/apply.html` 푸터 정보 수정
- [ ] `therapist/index.html` 푸터 정보 수정
- [ ] `therapist/apply.html` 푸터 정보 수정
- [ ] `index.html` 푸터 정보 수정

## ✅ 5단계: 웹 호스팅 배포

### Netlify 사용 시:
- [ ] Netlify 계정 생성
- [ ] `landing-pages` 폴더 드래그 앤 드롭으로 배포
- [ ] 배포 URL 확인

### GitHub Pages 사용 시:
- [ ] GitHub 저장소 생성
- [ ] 코드 업로드
- [ ] Settings > Pages에서 활성화
- [ ] 배포 URL 확인

## ✅ 6단계: 테스트

- [ ] 부모 랜딩 페이지 접속 확인
- [ ] 부모 신청서 제출 테스트
- [ ] Google Sheets에 데이터 저장 확인
- [ ] 치료사 랜딩 페이지 접속 확인
- [ ] 치료사 신청서 제출 테스트
- [ ] Google Sheets에 데이터 저장 확인
- [ ] 모바일에서 페이지 확인
- [ ] 모바일에서 폼 제출 테스트

## ✅ 7단계: 운영 설정 (선택사항)

- [ ] Google Sheets 알림 규칙 설정
- [ ] Google Analytics 추가
- [ ] 커스텀 도메인 연결
- [ ] 단축 URL 생성
- [ ] QR 코드 생성

## 📋 배포 정보 기록

배포 완료 후 아래 정보를 기록해두세요:

```
스프레드시트 URL: ________________________________

Apps Script URL: ________________________________

배포된 웹사이트 URL: ________________________________

배포 날짜: ________________________________

배포 담당자: ________________________________
```

## 🔗 주요 URL

배포 후 팀원들과 공유할 URL:

- **홈페이지**: `{your-url}/`
- **부모 신청**: `{your-url}/parent/apply.html`
- **치료사 지원**: `{your-url}/therapist/apply.html`
- **데이터 관리**: Google Sheets URL

## 📞 문제 발생 시

1. `DEPLOYMENT_GUIDE.md` 참고
2. `README.md`의 "문제 해결" 섹션 확인
3. 브라우저 개발자 도구(F12) 콘솔 확인
4. Google Apps Script 실행 로그 확인

---

**모든 항목을 체크했다면 축하합니다! 🎉**

째깍홈티가 성공적으로 배포되었습니다.
