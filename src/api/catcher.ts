import axios from "axios";
import { BadRequestError } from "../@types/api";

function catcher(_: object, __: string, descriptor: PropertyDescriptor) {
  const method = descriptor.value;

  descriptor.value = async function (...args: unknown[]) {
    try {
      const response = await method.apply(this, args);
      return response;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        console.log("AxiosError: ", error.response);
        return {
          data: error.response?.data as BadRequestError,
          status: error?.response?.status as number,
        };
      } else {
        console.log("Unexpected error: ", error);
      }
    }
  };
}

export default catcher;
