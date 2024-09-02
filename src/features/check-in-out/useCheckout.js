import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";

function useCheckout() {
  const queryClient = useQueryClient();

  const { mutate: checkout, isPending: isCheckingOut } = useMutation({
    mutationFn: (bookingId) => {
      return updateBooking(bookingId, {
        status: "checked-out",
      });
    },

    onSuccess: (data) => {
      toast.success(
        `Booking ${data?.id ? "#" + data?.id : ""} successfully checked out`
      );
      queryClient.invalidateQueries({ active: true });
    },
    onError: (err) => {
      toast.error(`Booking could not be checked out`);
    },
  });

  return { checkout, isCheckingOut };
}

export default useCheckout;
