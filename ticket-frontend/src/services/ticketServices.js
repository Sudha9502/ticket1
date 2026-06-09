import API from "./api";

export const updateStatus =
  async (
    ticketId,
    status
  ) => {

    return API.put(
      `/ticket/${ticketId}`,
      {
        status
      }
    );
  };