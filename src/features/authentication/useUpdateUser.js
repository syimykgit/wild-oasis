import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutate: updateUser, isPending: isUpdating } = useMutation({
    mutationFn: updateCurrentUser,

    onSuccess: (data) => {
      toast.success("User account successfully updated");

      queryClient.setQueryData(["user"], data.user);

      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => {
      toast.success(error.message);
    },
  });

  return { updateUser, isUpdating };
}

export default useUpdateUser;
