import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

import { updateSetting } from "../../services/apiSettings";

function useUpdateSetting() {
  const queryClient = useQueryClient();
  const data = useMutation({
    mutationFn: updateSetting,
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: (data) => {
      toast.success("Succesfully updated");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });

  return data;
}

export default useUpdateSetting;
