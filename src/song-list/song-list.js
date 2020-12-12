import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import songService from "../services/song-service";
import UserContext from "../user";

const SongList = () => {
  const [songInfo, setSongInfo] = useState("");
  const [songLoading, setSongLoading] = useState(true);

  const username = React.useContext(UserContext);

  useEffect(() => {
    songService
      .getSongsInfo()
      .then(response => setSongInfo(response))
      .finally(() => setSongLoading(false));
  }, []);

  return (
    <div className="container align-items-left">
      <a href="..">Home</a>
      <h2>Songs</h2>
      {songLoading ? (
        <h1>Loading...</h1>
      ) : (
        <>
          <table className="table my-4">
            <thead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Artists</th>
                <th scope="col">Duration (s)</th>
                <th scope="col">Genres</th>
              </tr>
            </thead>
            <tbody>
              {songInfo.map((song, i) => {
                return (
                  <tr key={i}>
                    <td><Link to={`/song/${song.song.id}`}>{song.song.name}</Link></td>
                    <td>
                      {song.artistNames.map((artist, key) => (
                        <div key={key}>
                          <p>{artist}</p>
                        </div>
                      ))}
                    </td>
                    <td>{song.song.duration}</td>
                    <td>
                      {song.genreNames.map((genre, index) => (
                        <p key={index}>{genre}</p>
                      ))}
                    </td>
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

export default SongList;
