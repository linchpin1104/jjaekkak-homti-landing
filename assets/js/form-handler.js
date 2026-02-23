/**
 * 째깍홈티 - Google Sheets 연동 스크립트
 * 
 * 사용 방법:
 * 1. Google Apps Script 웹 앱 URL을 아래 SCRIPT_URL에 설정
 * 2. 부모/치료사 폼 제출 시 자동으로 해당 시트에 데이터 저장
 */

// ⚠️ 중요: Google Apps Script 웹 앱 배포 URL을 여기에 입력하세요
const GOOGLE_SCRIPT_URL = 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE';

/**
 * Google Sheets로 데이터 전송
 * @param {Object} data - 전송할 폼 데이터
 * @param {string} formType - 'parent' 또는 'therapist'
 */
async function submitToGoogleSheets(data, formType) {
    // URL이 설정되지 않은 경우
    if (GOOGLE_SCRIPT_URL === 'YOUR_GOOGLE_APPS_SCRIPT_URL_HERE') {
        console.warn('Google Apps Script URL이 설정되지 않았습니다.');
        console.log('제출된 데이터:', data);
        
        // 개발 모드: 로컬 스토리지에 저장
        const storageKey = `jjaekkak_${formType}_applications`;
        const applications = JSON.parse(localStorage.getItem(storageKey) || '[]');
        applications.push({
            ...data,
            id: Date.now(),
            submittedAt: new Date().toISOString()
        });
        localStorage.setItem(storageKey, JSON.stringify(applications));
        
        // 콘솔에 저장된 데이터 출력
        console.log(`로컬 스토리지에 저장됨 (${storageKey}):`, applications);
        
        return Promise.resolve({ success: true, message: '개발 모드: 로컬 스토리지에 저장됨' });
    }
    
    try {
        // formType을 데이터에 추가
        const payload = {
            ...data,
            formType: formType
        };
        
        // Google Apps Script로 POST 요청
        const response = await fetch(GOOGLE_SCRIPT_URL, {
            method: 'POST',
            mode: 'no-cors', // CORS 이슈 방지
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload)
        });
        
        // no-cors 모드에서는 응답을 읽을 수 없으므로 성공으로 간주
        return { success: true, message: 'Google Sheets에 저장됨' };
        
    } catch (error) {
        console.error('Google Sheets 전송 실패:', error);
        throw new Error('데이터 전송에 실패했습니다.');
    }
}

/**
 * 로컬 스토리지에 저장된 신청서 확인 (개발/테스트용)
 */
function viewLocalApplications(formType) {
    const storageKey = `jjaekkak_${formType}_applications`;
    const applications = JSON.parse(localStorage.getItem(storageKey) || '[]');
    console.log(`=== ${formType} 신청서 목록 (${applications.length}개) ===`);
    console.table(applications);
    return applications;
}

/**
 * 로컬 스토리지 초기화 (개발/테스트용)
 */
function clearLocalApplications(formType) {
    const storageKey = `jjaekkak_${formType}_applications`;
    localStorage.removeItem(storageKey);
    console.log(`${formType} 신청서 데이터가 초기화되었습니다.`);
}

// 개발자 도구에서 사용 가능하도록 전역 함수로 노출
window.viewLocalApplications = viewLocalApplications;
window.clearLocalApplications = clearLocalApplications;
window.submitToGoogleSheets = submitToGoogleSheets;

// 페이지 로드 시 안내 메시지 출력
console.log('%c째깍홈티 폼 핸들러', 'color: #4ECDC4; font-size: 16px; font-weight: bold;');
console.log('개발자 도구 사용 가능 명령어:');
console.log('  viewLocalApplications("parent") - 부모 신청서 확인');
console.log('  viewLocalApplications("therapist") - 치료사 신청서 확인');
console.log('  clearLocalApplications("parent") - 부모 신청서 초기화');
console.log('  clearLocalApplications("therapist") - 치료사 신청서 초기화');
