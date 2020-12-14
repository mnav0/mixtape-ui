import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import playlistService from "../services/playlist-service";
import songService from "../services/song-service";
import { ButtonBody } from "../styled-form";
import { PageHeader, TableHeader, TableLink, TableBody } from "../styled-table";
import Button from "../button/button";

const PlaylistForm = ({ currPlaylist, editing }) => {
  const [newPlaylistName, setNewPlaylistName] = useState(currPlaylist.name);
  const [newCreatedAt, setNewCreatedAt] = useState(currPlaylist.createdAt);
  const [newCreatedBy, setNewCreatedBy] = useState(currPlaylist.createdBy);
  const [newSongAdditions, setNewSongAdditions] = useState(
    currPlaylist.songAdditions
  );
  const [allSongs, setAllSongs] = useState([]);
  const [allSongsLoading, setAllSongsLoading] = useState(true);

  const removeSong = i => {
    const songs = newSongAdditions;
    delete songs[i];

    setNewSongAdditions(songs);

    const updatedPlaylist = {
      ...currPlaylist,
      name: newPlaylistName,
      createdAt: newCreatedAt,
      createdBy: newCreatedBy,
      songAdditions: newSongAdditions
    };
    playlistService
      .updatePlaylist(updatedPlaylist, currPlaylist.id)
      .then(response => console.log(response));
  };

  const addSong = songId => {
    playlistService
      .addSongToPlaylist(currPlaylist.id, songId)
      .then(response => console.log(response));
  };

  const update = () => {
    console.log("new playlist name: ", newPlaylistName);
    const updatedPlaylist = {
      ...currPlaylist,
      name: newPlaylistName,
      createdAt: newCreatedAt,
      createdBy: newCreatedBy,
      songAdditions: newSongAdditions
    };
    playlistService
      .updatePlaylist(updatedPlaylist, currPlaylist.id)
      .then(response => console.log(response));
  };

  const createPlaylist = () => {
    const newPlaylist = {
      name: newPlaylistName,
      createdAt: newCreatedAt,
      createdBy: newCreatedBy,
      songAdditions: []
    };
    playlistService
      .createNewPlaylist(newPlaylist)
      .then(response => console.log(response));
  };

  useEffect(() => {
    songService
      .findAllSongs()
      .then(response => setAllSongs(response))
      .finally(() => setAllSongsLoading(false));
  }, []);

  console.log(editing);
  return (
    <form className="my-4">
      {console.log(currPlaylist)}
      <PageHeader>Playlist Name</PageHeader>
      {console.log(newPlaylistName)}
      <div className="form-group">
        <input
          value={newPlaylistName}
          onChange={event => setNewPlaylistName(event.target.value)}
          id="playlistName"
          className="form-control col-6"
          type="text"
        />
      </div>
      {editing ? (
        <div>
          <div onClick={() => update()}>
            <Button text={"UPDATE PLAYLIST NAME"}></Button>
          </div>
          <div>
            <PageHeader>Songs</PageHeader>
          </div>
          <table className="table my-4">
            <thead>
              <tr>
                <TableHeader scope="col">NAME</TableHeader>
                <TableHeader></TableHeader>
              </tr>
            </thead>
            <tbody>
              {newSongAdditions.map((song, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <TableBody>{song.name}</TableBody>
                    </td>
                    <td>
                      <div onClick={() => removeSong(i)}>
                        <Button
                          text={"REMOVE FROM PLAYLIST"}
                          color={"#FDDADA"}
                        ></Button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
          <div>
            <PageHeader>Add Songs to Playlist</PageHeader>
            {allSongsLoading ? (
              <TableBody>Loading...</TableBody>
            ) : (
              <table className="table my-4">
                <thead>
                  <tr>
                    <TableHeader scope="col">SONG NAME</TableHeader>
                    <TableHeader></TableHeader>
                  </tr>
                </thead>
                <tbody>
                  {allSongs.map((song, i) => {
                    return (
                      <tr key={i}>
                        <td>
                          <TableBody>{song.name}</TableBody>
                        </td>
                        <td>
                          <div onClick={() => addSong(song.id)}>
                            <Button
                              text={"ADD TO PLAYLIST"}
                              color={"#A0D9B4"}
                            />
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            )}
          </div>
        </div>
      ) : (
        <div onClick={() => createPlaylist()}>
          <Button text={"CREATE PLAYLIST"} color={"#A0D9B4"} />
        </div>
      )}
    </form>
  );
};

export default PlaylistForm;
