import ConnectionError from '../connection-error';

/**
 * Thrown when connection is not acquired due to timeout
 */
class ConnectionAcquireTimeoutError extends ConnectionError {
  diagnostics?: string;

  constructor(parent: Error, diagnostics?: string) {
    super(parent);
    this.name = 'SequelizeConnectionAcquireTimeoutError';
    this.diagnostics = diagnostics;
    
    // Include diagnostics in the error message if provided
    if (diagnostics) {
      this.message = `${this.message}\n\n${diagnostics}`;
    }
  }
}

export default ConnectionAcquireTimeoutError;
