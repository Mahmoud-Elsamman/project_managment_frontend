import api from "./api";

export const getRoles = async () => {
  const response = await api.get("/roles");
  if (response.data.success) {
    return response.data.data;
  } else {
    throw new Error(response.data.message);
  }
};
