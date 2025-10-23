// Small helpers used across the app
export const wait = (ms: number) => new Promise((res) => setTimeout(res, ms));


export function formatDateISO(date?: Date) {
return (date || new Date()).toISOString();
}