import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { LoginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const data = useMutation({
    mutationFn: LoginApi,
    onSuccess: (data) => {
      toast.success("You successfully loged in");
      queryClient.invalidateQueries({ queryKey: ["user"] });
      navigate("/dashboard", { replace: true });
      queryClient.setQueryData(["user", data?.user]);
    },

    onError: (err) => {
      toast.error(err.message);
    },
  });

  return data;
}

export default useLogin;
