import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { SignupApi } from "../../services/apiAuth";

function useSignup() {
  const queryClient = useQueryClient();

  const data = useMutation({
    mutationFn: SignupApi,
    onSuccess: (data) => {
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
      toast.success(
        "Successfully signed up, Please verify the new account from the your email address"
      );
    },
    onError: (error) => {
      toast.error(error.message);
    },
  });

  return data;
}

export default useSignup;
