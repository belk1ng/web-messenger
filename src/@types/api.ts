export type BadRequestError =
  | {
      reason: string;
    }
  | string;

export interface ServerResponse<T = string> {
  data: T | BadRequestError;
  status: number;
}

export type MethodResponse<T> = Promise<ServerResponse<T> | undefined>;
