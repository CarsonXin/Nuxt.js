export const isDev = process.env.NODE_ENV === 'development';
export const projectTokenName = 'baotopToken';
export const baseURL = isDev
    ? 'http://xxx.vdoou.local.cn/api/baotop'
    : `/api/baotop`;
export const DATE = new Date();
let today = {
  year: DATE.getFullYear(),
  month: `${DATE.getMonth() + 1}`.padStart(2, '0'),
  day: `${DATE.getDate()}`.padStart(2, '0'),
};
today.todayStr = `${today.year}-${today.month}`;
today.todayFullStr = `${today.todayStr}-${today.day}`;
export const TODAY = today;

export const pathPrefix = '/baotop/roshambo';