import {
  Navigate
}
from "react-router-dom";

import {
  getCurrentUser
}
from "aws-amplify/auth";

import {
  useEffect,
  useState
}
from "react";

export default function ProtectedRoute({
  children
}) {

  const [loading,
    setLoading] =
    useState(true);

  const [authenticated,
    setAuthenticated] =
    useState(false);

  useEffect(() => {

    checkUser();

  }, []);

  const checkUser =
    async () => {

      try {

        await getCurrentUser();

        setAuthenticated(
          true
        );

      }
      catch {

        setAuthenticated(
          false
        );

      }

      setLoading(false);

    };

  if (loading)
    return null;

  return authenticated
    ? children
    : <Navigate to="/login" />;
}