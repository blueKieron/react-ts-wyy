export function getSongPlayUrl(id: number) {
  return `https://music.163.com/song/media/outer/url?id=${id}.mp3`
}

export interface ILyric {
  time: number
  text: string
}
const timeReg = /\[(\d{2}):(\d{2}).(\d{2,3})\]/
export function parseLyric(lycString: string) {
  const lines: string[] = lycString.split('\n')

  const lyrics: ILyric[] = []
  for (const line of lines) {
    const results = timeReg.exec(line)
    if (!results) continue
    const time1 = Number(results[1]) * 60 * 1000
    const time2 = Number(results[2]) * 1000
    const time3 = Number(results[3])
    const time = time1 + time2 + time3

    const text = line.replace(timeReg, '')
    lyrics.push({ time, text })
  }
  return lyrics
}
