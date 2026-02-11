import { UseGetMe } from "@/api/user";
import { useQuery } from "@tanstack/react-query";

export function useFetchMe() {
  const getMe = UseGetMe();
  return useQuery({
    queryKey: ["user"],
    queryFn: () => getMe(),
    select: (data) => data.data,
    staleTime: 5 * 60 * 1000, // 5 minutes
    retry: 1,
  });
}
