export function formatCount(num: number) {
  if (num > 100000) {
    return Math.floor(num / 10000) + '万'
  } else {
    return num
  }
}

export function formatImageUrl(url: string, w: number, h: number = w) {
  return url + `?param=${w}x${h}`
}
