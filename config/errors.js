const Code = {
  Conflict: 'conflict',
  InternalServer: 'internal_server',
  UnprocessableEntity: 'unprocessable_entity',
};

class Base extends Error {
  constructor(code, statusCode) {
    super();
    this.code = code;
    this.statusCode = statusCode;
    Error.captureStackTrace(this, this.constructor);
  }

  toJSON() {
    return {
      code: this.code,
    };
  }
}

class Conflict extends Base {
  constructor(code = Code.Conflict, statusCode = 409) {
    super(code, statusCode);
  }
}

class InternalServer extends Base {
  constructor(code = Code.InternalServer, statusCode = 500) {
    super(code, statusCode);
  }
}

class UnprocessableEntity extends Base {
  constructor(errors = []) {
    super(Code.UnprocessableEntity, 422);
    this.errors = errors;
  }

  toJSON() {
    return {
      code: this.code,
      errors: this.errors,
    };
  }
}

module.exports = {
  Code,
  Conflict,
  InternalServer,
  UnprocessableEntity,
};
