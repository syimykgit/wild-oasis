import { useQuery } from "@tanstack/react-query";
import { GetCurrentUser } from "../../services/apiAuth";

function useGetUser() {
  const { data: user, isPending: isLoading } = useQuery({
    queryKey: ["user"],
    queryFn: GetCurrentUser,
  });

  return { user, isAuthenticated: user?.role === "authenticated", isLoading };
}

export default useGetUser;
