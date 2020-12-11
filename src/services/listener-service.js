const URL = "http://localhost:8080/";

export const findAllListeners = () =>
  fetch(`${URL}findAllListeners`).then((response) => response.json());

export default { findAllListeners };
