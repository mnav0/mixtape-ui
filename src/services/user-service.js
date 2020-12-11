const URL = "http://localhost:8080";

export const findUserById = (id) =>
  fetch(`${URL}/findUserById/${id}`).then((response) => response.json());

  export const findAllUsers = () =>
  fetch(`${URL}/findAllUsers`).then((response) => response.json());

  export const createNewUser = (user) =>
  fetch(`${URL}/createUser`, {
    method: "POST",
    body: JSON.stringify({
      ...user
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());

  export const updateUser = (user, userId) =>
  fetch(`${URL}/updateUser/${userId}`, {
    method: "PUT",
    body: JSON.stringify({
      ...user
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());

  export const deleteUser = (userId) =>
  fetch(`${URL}/deleteUser/${userId}`, {
    method: "DELETE",
  }).then((response) => response.text());

export default { findUserById, findAllUsers, createNewUser, updateUser, deleteUser };
