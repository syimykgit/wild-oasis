import { useQuery } from "@tanstack/react-query";

import { getSettings } from "../../services/apiSettings";

function useGetSettings() {
  const data = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return data;
}

export default useGetSettings;
