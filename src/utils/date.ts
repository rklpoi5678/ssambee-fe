// 한국 시간 기준으로 날짜 객체 생성
const getKoreaDate = (date?: string | Date) => {
  return date ? new Date(date) : new Date();
};

// "YYYY-MM-DD" 형식으로 반환
export const getTodayYMD = () => {
  const d = getKoreaDate();
  return d.toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });
};

// 서버 ISO 날짜 -> 한국 날짜 문자열
export const formatYMDFromISO = (iso?: string | null) => {
  if (!iso) return null;
  const d = new Date(iso);
  if (isNaN(d.getTime())) return null;

  return d.toLocaleDateString("sv-SE", { timeZone: "Asia/Seoul" });
};

// ISO 8601 -> YYYY-MM-DD (sv-SE)
export const formatDateYMD = (isoDate?: string | null) => {
  if (!isoDate) return undefined;
  const date = new Date(isoDate);
  if (Number.isNaN(date.getTime())) return undefined;
  return date.toLocaleDateString("sv-SE");
};
