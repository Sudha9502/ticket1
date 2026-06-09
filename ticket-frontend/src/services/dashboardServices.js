import API
from "./api";

export const getStats =
() =>
  API.get(
    "/dashboard"
  );

export const getCategoryStats =
() =>
  API.get(
    "/category-stats"
  );