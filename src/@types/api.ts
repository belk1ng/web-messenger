export type BadRequestError =
  | {
      reason: string;
    }
  | string;

export interface ServerResponse<T> {
  data: T | BadRequestError;
  status: number;
}

export type MethodResponse<T = string> = Promise<ServerResponse<T> | undefined>;
