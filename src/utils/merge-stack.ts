// eslint-disable-next-line jsdoc/require-param
/**
 * Uses the given `stack` derived from an `error.stack`, but overrides the
 * first line with the given message.
 */
export function mergeStack({
  name,
  message,
  stack
}: {
  /** Can be omitted if the name is already included */
  name: string | null;
  message: string;
  stack: string;
}) {
  const trimmedStack = stack.replace(/^(Error)?\s*[\r\n]/gm, '');
  return `${name}: ${message}\n${trimmedStack}`;
}
