import { useQuery } from "@tanstack/react-query";
import { getBooking } from "../../services/apiBookings";
import { useParams } from "react-router-dom";

function useGetBooking() {
  const { bookingId } = useParams();

  const data = useQuery({
    queryKey: ["bookings", bookingId],
    queryFn: () => getBooking(bookingId),
    retry: false,
  });

  return data;
}

export default useGetBooking;
