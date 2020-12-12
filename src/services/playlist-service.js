const URL = "http://localhost:8080/";

export const findAllPlaylists = () =>
  fetch(`${URL}findAllPlaylists`).then((response) => response.json());

export const findPlaylistById = (id) =>
  fetch(`${URL}findPlaylistById/${id}`).then((response) => response.json());

export const findSongsForPlaylist = (id) =>
  fetch(`${URL}getSongInformationForPlaylist/${id}`).then((response) => response.json());


export default { findAllPlaylists, findPlaylistById, findSongsForPlaylist };
