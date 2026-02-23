/**
 * 째깍홈티 - Google Apps Script
 * Google Sheets에 폼 데이터를 저장하는 백엔드 스크립트
 * 
 * 설치 방법:
 * 1. Google Sheets 새 스프레드시트 생성
 * 2. "부모신청" 시트와 "치료사신청" 시트 생성
 * 3. 확장 프로그램 > Apps Script 메뉴 선택
 * 4. 이 코드를 붙여넣기
 * 5. 배포 > 새 배포 > 웹 앱 선택
 * 6. 액세스 권한: "모든 사용자" 선택
 * 7. 배포 URL을 복사하여 form-handler.js의 GOOGLE_SCRIPT_URL에 설정
 */

// ⚠️ 중요: 실제 스프레드시트 ID를 여기에 입력하세요
const SPREADSHEET_ID = 'YOUR_SPREADSHEET_ID_HERE';

/**
 * POST 요청 처리 - 웹 앱 진입점
 */
function doPost(e) {
  try {
    // JSON 데이터 파싱
    const data = JSON.parse(e.postData.contents);
    const formType = data.formType;
    
    // 폼 타입에 따라 해당 시트에 저장
    if (formType === 'parent' || formType === '부모') {
      saveToSheet('부모신청', data, getParentHeaders());
    } else if (formType === 'therapist' || formType === '치료사') {
      saveToSheet('치료사신청', data, getTherapistHeaders());
    } else {
      throw new Error('알 수 없는 폼 타입: ' + formType);
    }
    
    return ContentService
      .createTextOutput(JSON.stringify({ success: true, message: '저장 완료' }))
      .setMimeType(ContentService.MimeType.JSON);
      
  } catch (error) {
    Logger.log('Error: ' + error.toString());
    return ContentService
      .createTextOutput(JSON.stringify({ success: false, error: error.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * GET 요청 처리 - 테스트용
 */
function doGet(e) {
  return ContentService
    .createTextOutput('째깍홈티 Google Apps Script가 정상 작동 중입니다.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * 시트에 데이터 저장
 */
function saveToSheet(sheetName, data, headers) {
  const ss = SpreadsheetApp.openById(SPREADSHEET_ID);
  let sheet = ss.getSheetByName(sheetName);
  
  // 시트가 없으면 생성
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
    // 헤더 행 추가
    sheet.appendRow(headers);
    // 헤더 스타일 적용
    const headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground('#4ECDC4');
    headerRange.setFontColor('#FFFFFF');
    headerRange.setFontWeight('bold');
    sheet.setFrozenRows(1);
  }
  
  // 데이터 행 생성
  const row = headers.map(header => {
    const key = headerToKey(header);
    return data[key] || '';
  });
  
  // 시트에 추가
  sheet.appendRow(row);
  
  // 자동 열 너비 조정
  for (let i = 1; i <= headers.length; i++) {
    sheet.autoResizeColumn(i);
  }
}

/**
 * 부모 신청서 헤더
 */
function getParentHeaders() {
  return [
    '제출시간',
    '보호자명',
    '연락처',
    '선호연락방법',
    '카카오톡ID',
    '아이나이',
    '진단명',
    '현재문제',
    '현재치료여부',
    '치료상세',
    '희망치료종류',
    '희망수업빈도',
    '가능요일',
    '가능시간대',
    '희망시작일',
    '지역',
    '추가정보',
    '유입경로'
  ];
}

/**
 * 치료사 신청서 헤더
 */
function getTherapistHeaders() {
  return [
    '제출시간',
    '성함',
    '연락처',
    '이메일',
    '출생년도',
    '성별',
    '활동가능지역',
    '보유자격증',
    '자격증상세',
    '최종학력',
    '전공',
    '경력년수',
    '경력상세',
    '홈티경험',
    '제공가능치료',
    '경험있는진단명',
    '선호연령대',
    '강점분야',
    '활동가능요일',
    '활동가능시간대',
    '주당희망케이스수',
    '활동시작가능일',
    '희망시급',
    '자기소개',
    '유입경로'
  ];
}

/**
 * 헤더 이름을 데이터 키로 변환
 */
function headerToKey(header) {
  const mapping = {
    // 부모
    '제출시간': 'timestamp',
    '보호자명': 'parentName',
    '연락처': 'parentPhone',
    '선호연락방법': 'contactMethod',
    '카카오톡ID': 'kakaoId',
    '아이나이': 'childAge',
    '진단명': 'diagnosis',
    '현재문제': 'currentIssue',
    '현재치료여부': 'currentTreatment',
    '치료상세': 'treatmentDetail',
    '희망치료종류': 'therapyType',
    '희망수업빈도': 'frequency',
    '가능요일': 'availableDays',
    '가능시간대': 'availableTime',
    '희망시작일': 'startDate',
    '지역': 'location',
    '추가정보': 'additionalInfo',
    '유입경로': 'howKnow',
    
    // 치료사
    '성함': 'therapistName',
    '이메일': 'therapistEmail',
    '출생년도': 'birthYear',
    '성별': 'gender',
    '활동가능지역': 'location',
    '보유자격증': 'certification',
    '자격증상세': 'certificationDetail',
    '최종학력': 'education',
    '전공': 'major',
    '경력년수': 'experienceYears',
    '경력상세': 'careerDetail',
    '홈티경험': 'homeExperience',
    '제공가능치료': 'therapyType',
    '경험있는진단명': 'diagnosisExperience',
    '선호연령대': 'preferredAge',
    '강점분야': 'specialtyArea',
    '활동가능요일': 'availableDays',
    '활동가능시간대': 'availableTime',
    '주당희망케이스수': 'weeklyCapacity',
    '활동시작가능일': 'startDate',
    '희망시급': 'desiredRate',
    '자기소개': 'introduction'
  };
  
  return mapping[header] || header;
}

/**
 * 테스트 함수 - Apps Script 에디터에서 실행
 */
function testParentSubmission() {
  const testData = {
    formType: '부모',
    timestamp: new Date().toLocaleString('ko-KR'),
    parentName: '테스트부모',
    parentPhone: '010-1234-5678',
    contactMethod: '전화',
    kakaoId: 'test_parent',
    childAge: '만 5세',
    diagnosis: '자폐스펙트럼',
    currentIssue: '언어 발달이 늦습니다',
    currentTreatment: '예',
    treatmentDetail: '언어치료 주 1회',
    therapyType: '언어치료, 놀이치료',
    frequency: '주 2회',
    availableDays: '월, 수, 금',
    availableTime: '오후 (3-6시)',
    startDate: '최대한 빨리',
    location: '서울 강남구',
    additionalInfo: '낯을 많이 가립니다',
    howKnow: '검색'
  };
  
  saveToSheet('부모신청', testData, getParentHeaders());
  Logger.log('부모 신청서 테스트 완료');
}

function testTherapistSubmission() {
  const testData = {
    formType: '치료사',
    timestamp: new Date().toLocaleString('ko-KR'),
    therapistName: '테스트선생님',
    therapistPhone: '010-9876-5432',
    therapistEmail: 'test@example.com',
    birthYear: '1990',
    gender: '여성',
    location: '서울 강남구, 서초구',
    certification: '언어재활사, 놀이치료사',
    certificationDetail: '언어재활사 2급 (2015년), 놀이치료사 1급 (2017년)',
    education: '석사',
    major: '언어병리학',
    experienceYears: '5-7년',
    careerDetail: 'OO발달센터 (2015-2020), 프리랜서 (2020-현재)',
    homeExperience: '예',
    therapyType: '언어치료, 놀이치료',
    diagnosisExperience: '자폐스펙트럼(ASD), 언어발달지연, ADHD',
    preferredAge: '유치원 (4-7세), 초등 저학년 (8-10세)',
    specialtyArea: '무발화 아동 언어 유도',
    availableDays: '월, 화, 수, 목',
    availableTime: '오후 (3-6시), 저녁 (6-9시)',
    weeklyCapacity: '주 10-15회',
    startDate: '즉시 가능',
    desiredRate: '8만원대',
    introduction: '10년간 발달장애 아동을 치료해왔습니다.',
    howKnow: '검색'
  };
  
  saveToSheet('치료사신청', testData, getTherapistHeaders());
  Logger.log('치료사 신청서 테스트 완료');
}
