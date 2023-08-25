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

export function formatTime(time: number) {
  const timeSeconds = time / 1000
  const minutes = Math.floor(timeSeconds / 60)
  const seconds = Math.floor(timeSeconds) % 60

  const formatMinute = String(minutes).padStart(2, '0')
  const formatSecond = String(seconds).padStart(2, '0')
  return `${formatMinute}:${formatSecond}`
}
