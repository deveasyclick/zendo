import { config } from "../config";
import { useSecureFetch } from "./client";
import type { APISuccessResponse } from "./types";
import type { Org } from "@/types/org";

const API_URL = `${config.apiBaseUrl}/orgs`;
type CreateOrgResponse = APISuccessResponse<Org>;

export const useCreateOrgApi = () => {
  const secureFetch = useSecureFetch();
  return async (org: Partial<Org>) => {
    return secureFetch<CreateOrgResponse>(API_URL, {
      method: "POST",
      body: JSON.stringify(org),
    });
  };
};
