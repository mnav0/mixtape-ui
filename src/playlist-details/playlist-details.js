import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import playlistService from "../services/playlist-service";
import userService from "../services/user-service";

const PlaylistDetails = ({ ...props }) => {
  const [playlist, setPlaylist] = useState({});
  const [playlistLoading, setPlaylistLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [songs, setSongs] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [songLoading, setSongLoading] = useState(true);

  const playlistId = props.match.params.id;

  const history = useHistory();

  //   const getType = () => {
  //     artistService.findAllArtists().then(response => {
  //       console.log(response);
  //       {
  //         response.map(
  //           (artist, i) => artist.userId == userId && setIsArtist(true)
  //         );
  //       }
  //     });
  //   };

  useEffect(() => {
    playlistService
      .findPlaylistById(playlistId)
      .then(playlist => {
        userService
          .findUserById(playlist.createdBy)
          .then(user => (playlist.user = user))
          .finally(() => setUserLoading(false));
        setPlaylist(playlist);
        playlistService
          .findSongsForPlaylist(playlistId)
          .then(songs => setSongs(songs))
          .finally(() => setSongLoading(false));
      })
      .finally(() => {
        setPlaylistLoading(false);
      });
  }, []);

  const edit = () => {
    setIsEditing(true);
  };

  const deletePlaylist = () => {
    playlistService
      .deletePlaylist(playlistId)
      .then(response => console.log(response));
    setIsDeleted(true);
  };

  return (
    <div className="container my-5">
      {isDeleted ? (
        <>
          <h2>playlist has been deleted</h2>
          <Link to={"/playlists"}>Back to all playlists</Link>
        </>
      ) : (
        <>
          <h1>Playlist</h1>
          {playlistLoading || userLoading ? (
            <h2>loading ...</h2>
          ) : (
            <>
              <div>
                <h3>{playlist.name}</h3>
                {isEditing ? (
                  //   <UserForm currUser={user} isEditing={true} />
                  <div>editing</div>
                ) : (
                  <>
                    <p>
                      Created by: {playlist.user.firstName}{" "}
                      {playlist.user.lastName}
                    </p>
                    <p>Created at: {playlist.createdAt}</p>
                  </>
                )}
                {!isEditing && (
                  <>
                    <button className="btn btn-warning" onClick={() => edit()}>
                      edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deletePlaylist()}
                    >
                      delete
                    </button>
                  </>
                )}
                {songLoading ? (
                  <div>loading...</div>
                ) : (
                  <div>
                      <h3>Songs</h3>
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
                        {songs.map((song, i) => {
                          return (
                            <tr key={i}>
                              <td>
                                <Link to={`/song/${song.song.id}`}>
                                  {song.song.name}
                                </Link>
                              </td>
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
                  </div>
                )}
              </div>
              {/* {isArtist ? (
                <SongForm
                  currSong={{ name: "", duration: "" }}
                  isEditing={false}
                  artistId={userId}
                />
              ) : (
                <></>
              )} */}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PlaylistDetails;
