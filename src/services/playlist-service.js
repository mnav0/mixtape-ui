const URL = "http://localhost:8080/";

export const findAllPlaylists = () =>
  fetch(`${URL}findAllPlaylists`).then((response) => response.json());

export const findPlaylistById = (id) =>
  fetch(`${URL}findPlaylistById/${id}`).then((response) => response.json());

export const findSongsForPlaylist = (id) =>
  fetch(`${URL}getSongInformationForPlaylist/${id}`).then((response) => response.json());

export const updatePlaylist = (playlist, playlistId) =>
  fetch(`${URL}updatePlaylist/${playlistId}`, {
    method: "PUT",
    body: JSON.stringify({
      ...playlist
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());

  export const addSongToPlaylist = (playlistId, songId) =>
    fetch(`${URL}addSongToPlaylist/${playlistId}/${songId}`).then((response) => response.json());

  export const deletePlaylist = (playlistId) =>
    fetch(`${URL}deletePlaylist/${playlistId}`);

  export const createNewPlaylist = (playlist) =>
    fetch(`${URL}/createPlaylist`, {
      method: "POST",
      body: JSON.stringify({
        ...playlist
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.json());


export default { findAllPlaylists, findPlaylistById, findSongsForPlaylist, updatePlaylist, addSongToPlaylist, deletePlaylist, createNewPlaylist };
