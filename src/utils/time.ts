// utils/time.ts
export function formatTimestamp(
  timestamp: number | string,
  format = 'YYYY-MM-DD HH:mm:ss'
): string {
  if (!timestamp) return '';

  // 转换为数字
  let ts = Number(timestamp);

  // 判断是否是秒级（10位）还是毫秒级（13位）
  if (ts.toString().length === 10) {
    ts = ts * 1000;
  }

  const date = new Date(ts);

  const pad = (n: number) => (n < 10 ? '0' + n : n);

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hour = pad(date.getHours());
  const minute = pad(date.getMinutes());
  const second = pad(date.getSeconds());

  switch (format) {
    case 'YYYY-MM-DD':
      return `${year}-${month}-${day}`;
    case 'HH:mm:ss':
      return `${hour}:${minute}:${second}`;
    case 'YYYY-MM-DD HH:mm':
      return `${year}-${month}-${day} ${hour}:${minute}`;
    default:
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
  }
}
