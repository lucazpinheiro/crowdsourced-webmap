/**
 * @param {Promise} handler
 * @returns {Promise<[Awaited<HandlerReturnType>, Error]>}
 */
export default async (handler) => {
  try {
    return [await handler(), null]
  } catch (err) {
    return [null, err]
  }
}
