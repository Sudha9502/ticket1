import API from "./api";

export const getUploadUrl =
  async () => {

    const response =
      await API.post("/upload");

    return response.data;
  };