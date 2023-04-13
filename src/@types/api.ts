export type BadRequestError =
  | {
      reason: string;
    }
  | string;

export interface ServerResponse<T = string> {
  data: T | BadRequestError;
  status: number;
}
