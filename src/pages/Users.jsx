import Heading from "../ui/Heading";
import SignipForm from "../features/authentication/SignupForm";

function NewUsers() {
  return (
    <>
      <Heading as="h1">Create a new user</Heading>
      <SignipForm />
    </>
  );
}

export default NewUsers;
