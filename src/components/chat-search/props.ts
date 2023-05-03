import { Dispatch, SetStateAction } from "react";

export interface ChatSearchProps {
  setSearchQuery: Dispatch<SetStateAction<string>>;
}
