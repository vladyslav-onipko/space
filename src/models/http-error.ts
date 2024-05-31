export interface ExtendedError {
  field: string;
  message: string;
}

interface HttpErrorProps {
  errors?: ExtendedError[];
  code?: number;
}

class HttpError extends Error implements HttpErrorProps {
  status: number | undefined;
  errors: ExtendedError[] | undefined;

  constructor(message: string, errors?: ExtendedError[], code?: number) {
    super(message);
    this.status = code;
    this.errors = errors;
  }
}

export default HttpError;
