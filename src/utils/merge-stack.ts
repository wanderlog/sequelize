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
  const stackLines = stack.split('\n');
  // Remove the first line of the stacktrace, unless it contains the word `at`
  if (stackLines.length > 0 && !/ *at /.test(stackLines[0])) {
    stackLines.shift();
  }
  return `${name}: ${message}\n${stackLines.join('\n')}`;
}
