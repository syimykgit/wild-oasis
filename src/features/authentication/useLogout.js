import { useMutation, useQueryClient } from "@tanstack/react-query";
import { LogoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function useLogout() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isPending: isLoading, mutate: logout } = useMutation({
    mutationFn: LogoutApi,
    onSuccess: () => {
      navigate("/login", { replace: true });
      queryClient.removeQueries();
      toast.success("Successfully loged out");
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });
  return { isLoading, logout };
}

export default useLogout;
