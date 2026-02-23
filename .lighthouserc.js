module.exports = {
  ci: {
    collect: {
      startServerCommand: "pnpm start", // 빌드 후 서버를 띄우는 명령어
      url: ["https://www.ssambee.com"], // 검사할 URL
      numberOfRuns: 3, // 측정 신뢰도를 위해 3번 실행
    },
    upload: {
      target: "temporary-public-storage", // 검사 결과 리포트를 구글 서버에 임시 업로드 (팀원 공유용 링크 생성)
    },
    assert: {
      preset: "lighthouse:recommended",
      assertions: {
        "categories:performance": ["warn", { minScore: 0.8 }], // 성능 80점 미만 시 경고
        "categories:accessibility": ["warn", { minScore: 0.8 }],
      },
    },
  },
};
