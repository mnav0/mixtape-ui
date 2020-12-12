const FIND_ALL_SONGS  = "http://localhost:8080/findAllSongs"
const FIND_SONG_BY_ID = "http://localhost:8080/findSongById"
const DELETE_SONG_URL = "http://localhost:8080/deleteSong"
const ADD_SONG_TO_PLAYLIST = "http://localhost:8080/addSongToPlaylist"
const FIND_SONG_ARTISTS = "http://localhost:8080/findArtistsBySong"
const FIND_SONG_GENRES = "http://localhost:8080/findGenresBySong"
const GET_SONGS_INFO = "http://localhost:8080/getSongsInformation"
const URL = "http://localhost:8080"

export const findAllSongs = () =>
    fetch(`${FIND_ALL_SONGS}`)
    .then(response => response.json())

export const getSongsInfo = () =>
    fetch(`${GET_SONGS_INFO}`)
    .then(response => response.json())

export const findSongById = (id) =>
    fetch(`${FIND_SONG_BY_ID}/${id}`)
    .then(response => response.json())

export const createNewSong = (artistId, song) =>
    fetch(`${URL}/${artistId}/createSong`, {
      method: "POST",
      body: JSON.stringify({
        ...song
      }),
      headers: {
        "content-type": "application/json",
      },
    }).then((response) => response.json());

export const updateSong = (song, songId) =>
  fetch(`${URL}/updateSong/${songId}`, {
    method: "PUT",
    body: JSON.stringify({
      ...song
    }),
    headers: {
      "content-type": "application/json",
    },
  }).then((response) => response.json());

export const deleteSong = (id) =>
    fetch(`${DELETE_SONG_URL}/${id}`)

export const addSongToPlaylist = (playlistId, songId) =>
    fetch(`${ADD_SONG_TO_PLAYLIST}/${playlistId}/${songId}`)
    .then(response => response.json())

export const findSongArtists = (songId) =>
    fetch(`${FIND_SONG_ARTISTS}/${songId}`)
    .then(response => response.json())

export const findSongGenres = (id) =>
    fetch(`${FIND_SONG_GENRES}/${id}`)
        .then(response => {
            return response.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        })

export default { findAllSongs, updateSong, getSongsInfo, findSongById, createNewSong, deleteSong, addSongToPlaylist, findSongArtists, findSongGenres }