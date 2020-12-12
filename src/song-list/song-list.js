import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import songService from "../services/song-service";
import UserContext from "../user";
import { PageHeader, TableHeader, TableLink, TableBody } from "../styled-table";

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
      <PageHeader>Songs</PageHeader>
      {songLoading ? (
        <TableHeader>Loading...</TableHeader>
      ) : (
        <>
          <table className="table my-4">
            <thead>
              <tr>
                <TableHeader scope="col">TITLE</TableHeader>
                <TableHeader scope="col">ARTISTS</TableHeader>
                <TableHeader scope="col">DURATION (s)</TableHeader>
                <TableHeader scope="col">GENRES</TableHeader>
              </tr>
            </thead>
            <tbody>
              {songInfo.map((song, i) => {
                return (
                  <tr key={i}>
                    <td>
                      <TableLink to={`/song/${song.song.id}`}>
                        {song.song.name}
                      </TableLink>
                    </td>
                    <td>
                      {song.artistNames.map((artist, key) => (
                        <div key={key}>
                          <TableBody>{artist}</TableBody>
                        </div>
                      ))}
                    </td>
                    <td>
                      <TableBody>
                        {Math.floor(song.song.duration / 60)}:
                        {(
                          song.song.duration -
                          Math.floor(song.song.duration / 60) * 60 +
                          "00"
                        ).slice(0, 2)}
                      </TableBody>
                    </td>
                    <td>
                      {song.genreNames.map((genre, index) => (
                        <TableBody key={index}>{genre}</TableBody>
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
