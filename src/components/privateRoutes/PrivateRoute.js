import { Route, Navigate } from "react-router-dom";
export const PrivateRoute = ({ isUserLoggedIn, element, path }) => {
  return (
    <>
      {isUserLoggedIn ? (
        <Route path={path} element={element} />
      ) : (
        <Navigate to="/login" state={{ from: path }} replace />
      )}
    </>
  );
};
