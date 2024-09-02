import { useQuery } from "@tanstack/react-query";

import { getCabins } from "../../services/apiCabins";

function useGetCabins() {
  const data = useQuery({
    queryKey: ["cabins"],
    queryFn: getCabins,
  });
  return data;
}

export default useGetCabins;
