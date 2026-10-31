# 포트폴리오 UI 컴포넌트

`../design.md`를 기준으로 만든 설치 없는 HTML·CSS·JavaScript 컴포넌트입니다. `index.html`을 브라우저로 열면 버튼, 입력 검증, 이미지 선택·제거, 알림 닫기, 삭제 대화상자를 확인할 수 있습니다.

## 파일 구성

- `styles/tokens.css`: 공통 색상과 모서리 값
- `styles/components.css`: 컴포넌트 스타일, 반응형 배치, 키보드 포커스
- `components/core.js`: 공통 DOM 생성과 고유 ID, 링크 처리
- `components/Button.js`: 크기·색상·비활성·처리 중 상태
- `components/Badge.js`: 태그와 초안·공개 배지
- `components/ProjectCard.js`: 이미지·요약·날짜·태그 카드
- `components/TextField.js`: 한 줄·여러 줄 입력, 글자 수, 오류 안내
- `components/Alert.js`: 성공·주의·오류 안내와 닫기
- `components/EmptyState.js`: 빈 화면과 선택적 동작 버튼
- `components/Modal.js`: 기본 대화상자와 비동기 확인 콜백
- `components/Header.js`: 사이트 제목과 메뉴
- `components/ImageUpload.js`: 파일 검증, 로컬 미리보기, 설명 입력·제거
- `preview.js`: 각 컴포넌트를 조합한 사용 예시

## 사용 방법

CSS 두 파일을 순서대로 연결하고 `core.js`를 먼저 불러온 다음 필요한 컴포넌트를 불러옵니다. 별도 프레임워크가 없으며 각 함수는 DOM 요소를 반환합니다. 실제 사용 시 `index.html`의 스크립트 순서를 참고하세요.

```javascript
// 필요한 영역에 재사용 버튼을 추가합니다.
const button = PortfolioUI.Button({
  label: '저장',
  variant: 'primary',
  onClick: async () => {
    button.setLoading(true);
    try {
      await saveProfile();
    } finally {
      button.setLoading(false);
    }
  }
});
document.querySelector('#actions').append(button);
```

`saveProfile`은 실제 서비스에서 구현할 저장 함수입니다.

| 컴포넌트 | 주요 옵션·메서드 |
| --- | --- |
| Button | `label`, `variant`, `size`, `disabled`, `type`, `href`, `onClick`, `setLoading(boolean)` |
| Badge | `text`, `status: draft / published` |
| ProjectCard | `title`, `summary`, `href`, `image`, `imageAlt`, `date`, `tags` |
| TextField | `label`, `value`, `hint`, `required`, `multiline`, `maxLength`, `type`, `onInput`, `.input`, `.setError(message)` |
| Alert | `message`, `tone: success / warning / error`, `dismissible` |
| EmptyState | `title`, `description`, `action: Button 옵션` |
| Modal | `title`, `description`, `confirmLabel`, `danger`, `onConfirm`, `.openModal()` |
| Header | `title`, `homeHref`, `links: [{label, href, current}]` |
| ImageUpload | `label`, `maxFiles`, `onChange`, `.destroy()` |

카드에 `href`가 없으면 정적인 예시 카드로 표시합니다. 링크 이동과 버튼 동작을 구분하며, 버튼의 비활성·로딩 기능은 실제 버튼에 적용됩니다. `Modal`과 `Alert`는 `Button`에, `ProjectCard`는 `Badge`에, `ImageUpload`는 `TextField`·`Button`·`Alert`에 의존합니다.

이미지 선택 콜백은 `{file, description}` 배열을 반환합니다. 화면을 제거할 때 업로더의 `destroy()`를 호출하면 임시 이미지 URL도 해제됩니다. 선택은 로컬 미리보기이며 실제 업로드·저장 함수는 연결해야 합니다. 이미지의 최종 파일 검증과 접근 권한은 서버에서도 확인해야 합니다.

## 적용 범위와 확인

공개·관리자 화면에서 재사용할 UI 기반입니다. 계정 인증, 실제 업로드, 영구 저장, 페이지 라우팅은 포함하지 않습니다. 모달은 브라우저의 기본 `dialog`를 사용해 키보드 포커스 제한과 Esc 취소를 제공합니다.

이 실행 환경에는 Node.js가 없어 빌드나 자동 브라우저 검사를 수행하지 않았습니다. `index.html`을 열어 다음을 확인하세요.

- 키보드 Tab 이동과 모달 취소·확인 후 포커스 복귀
- 빈 이름 입력 시 오류 표시, 정상 입력 시 확인 안내
- 허용 이미지 선택·제거와 용량 초과 오류
- 360px·768px·1280px 너비에서 카드 1·2·3열 배치
- 200% 확대 시 글자·버튼의 줄바꿈

화면의 카드와 상태 문구는 컴포넌트 표현을 보여주는 예시입니다.

