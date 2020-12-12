import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import playlistService from "../services/playlist-service";
import userService from '../services/user-service';
// import UserForm from "../user-form/userForm";

const Playlists = () => {
  const [playlists, setPlaylists] = useState([]);
  const [playlistLoading, setPlaylistLoading] = useState(true);

  useEffect(() => {
    playlistService
      .findAllPlaylists()
      .then((response) => setPlaylists(response))
      .finally(() => setPlaylistLoading(false));
  }, []);

  console.log(playlists)
  return (
    <div className="container align-items-left">
      <a href="..">Home</a>
      <h1>Playlists</h1>
      {playlistLoading ? (
        <h2>loading ...</h2>
      ) : (
        <>
          <table className="table my-4">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Date Created</th>
              </tr>
            </thead>
            <tbody>
              {playlists.map((playlist, i) => {
                return (
                  <tr key={i}>
                    <td><Link to={`/playlist/${playlist.id}`}>{playlist.name}</Link></td>
                    <td>{playlist.createdAt}</td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>
  );
};

export default Playlists;
