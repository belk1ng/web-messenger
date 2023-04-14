import { ReactNode } from "react";

declare global {
  export type Indexed = Record<string, unknown>;

  export type Children = ReactNode | ReactNode[];
}

export {};
