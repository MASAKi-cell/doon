/**
 * エラーハンドリング用function
 * @param promise API処理関数
 * @param defaultError
 */
export const handleError = async <T>(
  promise: Promise<T>,
  defaultError: any = 'rejected'
): Promise<(T | undefined)[] | [T, any]> => {
  try {
    const data = await promise
    return [data, undefined]
  } catch (error) {
    return await Promise.resolve([undefined, error || defaultError])
  }
}
