class ErrorUtil extends Error {
    constructor(message, messageCode) {
        super(message);
        this.statusCode = messageCode;
        this.status = `${messageCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;
        Error.captureStackTrace(this, this.constructor);
    }
}
module.exports = ErrorUtil;