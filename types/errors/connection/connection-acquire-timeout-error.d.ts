import ConnectionError from '../connection-error';
/**
 * Thrown when connection is not acquired due to timeout
 */
declare class ConnectionAcquireTimeoutError extends ConnectionError {
    diagnostics?: string;
    constructor(parent: Error, diagnostics?: string);
}
export default ConnectionAcquireTimeoutError;
