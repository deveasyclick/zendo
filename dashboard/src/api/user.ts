import { config } from "@/config";
import { useSecureFetch } from "./client";
import type { User } from "@/types/user";
import type { APISuccessResponse } from "./types";

const API_URL = `${config.apiBaseUrl}/users/me`;

type GetMeResponse = APISuccessResponse<User>;
export const UseGetMe = () => {
  const secureFetch = useSecureFetch();
  return async () => {
    return secureFetch<GetMeResponse>(API_URL);
  };
};
