interface SuccessResponse<T> {
  success: true;
  data: T;
}

interface ErrorResponse {
  success: false;
  message: string;
}

export type ActionResponse<T> = SuccessResponse<T> | ErrorResponse;
