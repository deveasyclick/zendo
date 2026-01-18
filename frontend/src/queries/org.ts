import { useCreateOrgApi } from "@/api/org";
import type { Org } from "@/types/org";
import { useMutation } from "@tanstack/react-query";

export function useCreateOrg() {
  const createOrg = useCreateOrgApi();

  return useMutation({
    mutationFn: (org: Partial<Org>) => createOrg(org),
  });
}
