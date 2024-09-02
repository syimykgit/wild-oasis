import Heading from "../ui/Heading";
import Row from "../ui/Row";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";
function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>
      <Heading as="h3">Update user data</Heading>
      <Row>
        <UpdateUserDataForm />
      </Row>

      <Heading as="h3">Update user password form</Heading>
      <Row>
        <UpdatePasswordForm />
      </Row>
    </>
  );
}

export default Account;
