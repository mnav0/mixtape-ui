import React, { useState, useEffect } from "react";
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

  console.log(songInfo);

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
                console.log(song)
              return (
                <tr key={i}>
                  <td>{song.song.name}</td>
                  <td>
                    {song.artistNames.map(artist => (
                      <p key={artist}>{artist}</p>
                    ))}
                  </td>
                  <td>{song.song.duration}</td>
                  <td>
                    {song.genreNames.map(genre => (
                      <p key={genre}>{genre}</p>
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
