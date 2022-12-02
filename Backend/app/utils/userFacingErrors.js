class UserFacingError extends Error{
    errorCode = 'custom_error';
    constructor(message){super(message)}
}

class BadRequestError extends UserFacingError {
    get Status() {return 400} ;

    constructor(message, options = {msg: 'Bad Request'}) {
        super(message) ;
        this.errorCode = "bad_request" ;
        for (const key in options) {
            this[key] = options[key]
        }
    }
}

class NotFoundError extends UserFacingError {
    get Status() {return 404};

    constructor(message, options = {msg: 'Not Found'}) {
        super(message) ;
        this.errorCode = "not_found" ;
        for (const key in options) {
            this[key] = options[key]
        }
    }
}

class ConflictError extends UserFacingError {
    get Status() {return 409} ;

    constructor(message, options = {msg: 'Already Exist'}) {
        super(message) ;
        this.errorCode = "conflict" ;
        for (const key in options) {
            this[key] = options[key]
        }
    }
}

class InternalError extends UserFacingError {
    get Status() {return 500}
    constructor(message, options = {msg: 'Ups something went wrong, please try again later'}) {
        super(message) ;
        this.errorCode = "application_error" ;
        for (const key in options) {
            this[key] = options[key]
        }
    }
}

class ForbiddenError extends UserFacingError {
    get Status() {return 403}
    constructor(message, options = {msg: 'Forbidden'}) {
        super(message) ;
        this.errorCode = "forbidden_error" ;
        for (const key in options) {
            this[key] = options[key]
        }
    }
}

class UnauthorizedError extends UserFacingError {
    get Status() {return 401}
    constructor(message, options = {msg: 'Not logged'}) {
        super(message) ;
        this.errorCode = "unauthorized_error" ;
        for (const key in options) {
            this[key] = options[key]
        }
    }
}

module.exports = {
    UserFacingError,
    BadRequestError,
    NotFoundError,
    ConflictError,
    InternalError,
    ForbiddenError,
    UnauthorizedError
}