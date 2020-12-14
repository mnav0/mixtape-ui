import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import playlistService from "../services/playlist-service";
import userService from '../services/user-service';
import PlaylistForm from '../playlist-form/playlist-form';
import { PageHeader, TableHeader, TableLink, TableBody } from "../styled-table";

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
      <a href=".." className="row">Home</a>
      <Link to="/menu">Menu</Link>
      <PageHeader>Playlists</PageHeader>
      {playlistLoading ? (
        <TableHeader>Loading ...</TableHeader>
      ) : (
        <>
          <table className="table my-4">
            <thead>
              <tr>
                <TableHeader scope="col">NAME</TableHeader>
                <TableHeader scope="col">DATE CREATED</TableHeader>
              </tr>
            </thead>
            <tbody>
              {playlists.map((playlist, i) => {
                return (
                  <tr key={i}>
                    <td><TableLink to={`/playlist/${playlist.id}`}>{playlist.name}</TableLink></td>
                    <td><TableBody>{playlist.createdAt}</TableBody></td>
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
