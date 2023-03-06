import { AxiosError } from "axios";
import { ServerError } from "../api/Api";

export function handleError(err: unknown) {
  let error = "";

  const serverError = err as AxiosError<ServerError>;

  if (serverError.response?.status === 500) {
    return (error = "Server error");
  }

  if (serverError.response?.data.message) {
    error = serverError.response.data.message;
  }

  return error;
}
