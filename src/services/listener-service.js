const URL = "http://localhost:8080/";

export const findAllListeners = () =>
  fetch(`${URL}findAllListeners`).then((response) => response.json());

export const findListenerInformation = () =>
  fetch(`${URL}findListenerInformation`).then((response) => response.json());

export const createNewListener = (id) =>
  fetch(`${URL}/createListener/${id}`)
      .then(response => {
          return response.json()
  })

export default { findAllListeners, findListenerInformation, createNewListener };
