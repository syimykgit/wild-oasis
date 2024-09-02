import Form from "../../ui/Form";
import FormRow from "../../ui/FormRow";
import Input from "../../ui/Input";
import Spinner from "../../ui/Spinner";

import useGetSettings from "./useGetSettings";
import useUpdateSetting from "./useUpdateSetting";

function UpdateSettingsForm() {
  const {
    data: {
      minBookingLength,
      maxBookingLength,
      maxNumGuestsPerBooking,
      breakfastPrice,
    } = {},
    isPending,
  } = useGetSettings();

  const { isPending: isUpdating, mutate: updateSetting } = useUpdateSetting();

  const handleUpdateSetting = function (field, e) {
    const data = { [field]: e.target.value };
    updateSetting(data);
  };

  if (isPending) return <Spinner />;

  return (
    <Form>
      <FormRow label="Minimum nights/booking">
        <Input
          type="number"
          id="min-nights"
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting("minBookingLength", e)}
          defaultValue={minBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum nights/booking">
        <Input
          type="number"
          id="max-nights"
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting("maxBookingLength", e)}
          defaultValue={maxBookingLength}
        />
      </FormRow>
      <FormRow label="Maximum guests/booking">
        <Input
          type="number"
          id="max-guests"
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting("maxNumGuestsPerBooking", e)}
          defaultValue={maxNumGuestsPerBooking}
        />
      </FormRow>
      <FormRow label="Breakfast price">
        <Input
          type="number"
          id="breakfast-price"
          disabled={isUpdating}
          onBlur={(e) => handleUpdateSetting("breakfastPrice", e)}
          defaultValue={breakfastPrice}
        />
      </FormRow>
    </Form>
  );
}

export default UpdateSettingsForm;
