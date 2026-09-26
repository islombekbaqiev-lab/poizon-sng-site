/**
 * Загрузчик картинок для next/image.
 *
 * CDN Poizon (Aliyun OSS) сам ресайзит и отдаёт WebP по параметру
 * `x-oss-process`: кроссовок 42 КБ → ~9 КБ при той же чёткости. Это быстрее,
 * чем гонять каждую из ~3000 фотографий через оптимизатор Vercel, и не
 * упирается в его месячный лимит.
 */
const OSS_HOST = "cdn-img.thepoizon.ru"

export function poizonImg(src: string, width: number, quality = 75): string {
  if (!src || !src.includes(OSS_HOST) || src.includes("x-oss-process")) return src
  return `${src}?x-oss-process=image/resize,w_${width}/quality,q_${quality}/format,webp`
}

export default function imageLoader({ src, width, quality }: { src: string; width: number; quality?: number }) {
  return poizonImg(src, width, quality ?? 75)
}
