export function secondsToTime(seconds: number): string {
  const zeroLeft = (n: number) => {
    return Math.floor(n).toString().padStart(2, '0');
  };
  const hour = zeroLeft(seconds / 60 / 60);
  const min = zeroLeft((seconds / 60) % 60);
  const sec = zeroLeft((seconds % 60) % 60);
  return `${hour}:${min}:${sec}`;
}
