export function getYear(date: string) {
  if (!date.includes('T')) date = `${date}T00:00:00`
  return new Date(date).getFullYear().toString()
}

export function getMonth(date: string) {
  if (!date.includes('T')) date = `${date}T00:00:00`
  return new Date(date).getMonth() + 1
}

export function formatMonthDay(date: string) {
  if (!date.includes('T')) date = `${date}T00:00:00`
  const d = new Date(date)
  return `${d.getMonth() + 1}/${d.getDate()}`
}