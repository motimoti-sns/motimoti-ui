/**
 * wait for ms.
 */
export const waitFor = (ms: number): Promise<void> =>
  new Promise((r) => setTimeout(r, ms))
