import api from "./api";

export const getUsers = async () => {
  const response = await api.get("/users");
  if (response.data) {
    return response.data.filter((user) => user.role == "Employee");
  } else {
    throw new Error(response.data.message);
  }
};
