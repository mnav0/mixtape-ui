import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import songService from "../services/song-service";
import UserContext from '../user'

const SongList = () => {
  const [songs, setSongs] = useState("");
  const [songLoading, setSongLoading] = useState(true);
  const [artistLoading, setArtistLoading] = useState(true);
  const [genreLoading, setGenreLoading] = useState(true);

  const username = React.useContext(UserContext)

  useEffect(() => {
    songService
      .findAllSongs()
      .then(songs => {
        songs.map((song, i) => {
          songService
            .findSongArtists(song.id)
            .then(response => (song.artists = response))
            .finally(() => setArtistLoading(false));
          songService
            .findSongGenres(song.id)
            .then(response => (song.genres = response))
            .finally(() => setGenreLoading(false));
        });
        setSongs(songs);
      })
      .finally(() => setSongLoading(false));
  }, []);

  console.log(songs)

  return (
    <div>
      {songLoading || artistLoading ? (
        <div>
        <h1>song loading true</h1>
        <p>{username}</p>
        </div>
      ) : (
        <div className="container-fluid">
          <a href="../../index.html">Home</a>
          <h1>Songs</h1>
          <table>
            <tbody>
              {songs.map(song => (
                <tr key={song.id}>
                  <td>{song.name}</td>
                  { song.artists ?
                            <td>{song.artists.map((artist) =>
                              <p key={artist.id}>{artist.firstName} {artist.lastName}</p>
                            )}</td>
                                : <td></td> }
                            <td>{song.duration}</td>
                            { song.genres ?
                                <td>{song.genres.map((genre) =>
                                    <p key={genre.id}>{genre.name}</p>
                                )}</td> : <td></td> }
                            <td>
                    {/*<a className="btn btn-primary float-right"*/}
                    {/*   href={`/course-editor/course-editor.html?courseId=${course.courseId}`}>*/}
                    {/*  Edit*/}
                    {/*</a>*/}
                    {/* <button className="btn btn-danger float-right"
                                      onClick={() => deleteSong(song.id)}>
                                Delete
                              </button> */}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div>
            {/* { context ? <div>Context used</div> : <div>Empty</div>} */}
          </div>
        </div>
      )}
    </div>
  );
};

export default SongList;
