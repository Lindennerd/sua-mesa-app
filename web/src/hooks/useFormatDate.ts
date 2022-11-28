export function useFormatDate() {
  return {
    formatDate(date: string) {
      const dateParsed = new Date(date)
      return `${dateParsed.toLocaleString()}`
    },
  }
}
