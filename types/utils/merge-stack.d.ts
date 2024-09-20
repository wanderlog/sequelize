/**
 * Uses the given `stack` derived from an `error.stack`, but overrides the
 * first line with the given message.
 */
export declare function mergeStack({ name, message, stack }: {
    /** Can be omitted if the name is already included */
    name: string | null;
    message: string;
    stack: string;
}): string;
