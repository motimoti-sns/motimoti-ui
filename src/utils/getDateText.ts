/**
 * returns date text.
 */
export const getDateText = (now?: Date, target?: Date): string => {
  if (!now) {
    return ''
  }

  if (!target) {
    return ''
  }

  const nowTime = now.getTime()
  const targetTime = target.getTime()
  const subSeconds = Math.floor((nowTime - targetTime) / 1000)

  if (subSeconds < 60) {
    return `${subSeconds}秒`
  }

  const subMinitues = Math.floor(subSeconds / 60)

  if (subMinitues < 60) {
    return `${subMinitues}分`
  }

  const subHours = Math.floor(subMinitues / 60)

  if (subHours < 24) {
    return `${subHours}時間`
  }

  const subDays = Math.floor(subHours / 24)

  if (subDays < 3) {
    return `${subDays}日`
  }

  return `${now.getFullYear()}/${now.getMonth() + 1}/${now.getDate()}`
}
