export default function range(end: number, start = 0, step = 1) {
  const length = Math.floor((end - start) / step);
  return Array.from({ length }, (_, i) => start + i * step);
}
