import Axios, { AxiosResponse } from "axios";

export type ServerError = { message: string };

export async function apiRequest<D = {}, R = unknown>(
  method: "get" | "delete" | "head" | "options" | "post" | "put" | "patch",
  path: string,
  input?: D,
  options?: any,
  params?: any
) {
  const res = await Axios.request<D, AxiosResponse<R>>({
    url: `https://pokeapi.co/api/v2/${path}`,
    method: method,
    data: input,
    headers: options,
    params: params,
  });
  return res.data;
}
