
export async function toClipboard(text: string): Promise<boolean> {
  try {
    if (!text) {
      return false
    }
    await navigator.clipboard.writeText(text)
    return true
  } catch (error) {
    return false
  }
}
export const delay = (ms: number) => new Promise(res => setTimeout(res, ms));
