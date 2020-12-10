import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import songService from "../services/song-service";
import UserContext from "../user";

const SongList = () => {
  const [songInfo, setSongInfo] = useState("");
  const [songLoading, setSongLoading] = useState(true);
  const [artistLoading, setArtistLoading] = useState(true);
  const [genreLoading, setGenreLoading] = useState(true);

  const username = React.useContext(UserContext);

  useEffect(() => {
    songService
      .getSongsInfo()
      .then(response => setSongInfo(response))
      .finally(() => setSongLoading(false));
  }, []);

  console.log(songInfo);

  return (
    <div>
      {songLoading ? (
        <h1>Loading...</h1>
      ) : (
        <div className="container-fluid">
          <a href="../../index.html">Home</a>
          <h1>Songs</h1>
          <table>
            <tbody>
              {songInfo.map(song => (
                <tr key={song.song.id}>
                  <td>{song.song.name}</td>
                  <td>
                    {song.artistNames.map(artist => (
                      <p key={artist}>{artist}</p>
                    ))}
                  </td>
                  <td>{song.song.duration && song.song.duration}</td>
                  <td>
                    {song.genreNames.map(genre => (
                      <p key={genre}>{genre}</p>
                    ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
    
  );
};

export default SongList;

{
  /*<a className="btn btn-primary float-right"*/
}
{
  /*   href={`/course-editor/course-editor.html?courseId=${course.courseId}`}>*/
}
{
  /*  Edit*/
}
{
  /*</a>*/
}
{
  /* <button className="btn btn-danger float-right"
                                      onClick={() => deleteSong(song.id)}>
                                Delete
                              </button> */
}
