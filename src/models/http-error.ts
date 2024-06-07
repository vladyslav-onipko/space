export interface ServerInputError {
  field: string;
  message: string;
}

export interface ResponseError {
  message: string;
  errors?: ServerInputError[];
}

interface HttpErrorProps {
  errors?: ServerInputError[];
  code?: number;
}

class HttpError extends Error implements HttpErrorProps {
  status: number | undefined;
  errors: ServerInputError[] | undefined;

  constructor(message: string, errors?: ServerInputError[], code?: number) {
    super(message);
    this.status = code;
    this.errors = errors;
  }
}

export default HttpError;
