export interface ServerError {
  field: string;
  message: string;
}

export interface ResponseError {
  message: string;
  errors?: ServerError[];
}

interface HttpErrorProps {
  errors?: ServerError[];
  code?: number;
}

class HttpError extends Error implements HttpErrorProps {
  status: number | undefined;
  errors: ServerError[] | undefined;

  constructor(message: string, errors?: ServerError[], code?: number) {
    super(message);
    this.status = code;
    this.errors = errors;
  }
}

export default HttpError;
