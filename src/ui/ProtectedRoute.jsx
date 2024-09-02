import styled from "styled-components";
import useGetUser from "../features/authentication/useGetUser";
import Spinner from "../ui/Spinner";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
const FullPage = styled.div`
  display: flex;
  height: 100dvh;
  background-color: var(--color-greq-50);
  align-items: center;
  justify-content: center;
`;

function ProtectedRoute({ children }) {
  const navigate = useNavigate();

  // 1. Load the authenticated user
  const { isLoading, isAuthenticated } = useGetUser();

  // 2. If there is no authenticated user, redirect to the  /login (page)
  useEffect(() => {
    if (!isAuthenticated && !isLoading) navigate("/login");
  }, [navigate, isAuthenticated, isLoading]);

  // 3. While loading, show a loading spinner
  if (isLoading)
    return (
      <FullPage>
        <Spinner />
      </FullPage>
    );

  // 4. If there is a user, render the app
  if (isAuthenticated) return children;
}

export default ProtectedRoute;
