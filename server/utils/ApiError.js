class ApiError extends Error {
  constructor(status, message, errors = [], stack){
    super(message)
    this.status = status
    this.message = message,
    this.errors = errors,
    this.data = null

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export {ApiError}