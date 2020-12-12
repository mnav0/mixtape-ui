import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import songService from "../services/song-service";
import SongForm from "../song-form/song-form";

const SongDetails = ({ ...props }) => {
  const [song, setSong] = useState({});
  const [songLoading, setSongLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const songId = props.match.params.id;

  const history = useHistory();

  useEffect(() => {
    songService
      .findSongById(songId)
      .then(response => setSong(response))
      .finally(() => {
        setSongLoading(false);
      });
  }, []);

  const edit = () => {
    setIsEditing(true);
  };

  const deleteSong = () => {
    songService.deleteSong(songId).then(response => console.log(response));
    setIsDeleted(true);
  };

  return (
    <div className="container my-5">
      {isDeleted ? (
        <>
          <h2>Song has been deleted</h2>
          <Link to={"/songs"}>Back to all songs</Link>
        </>
      ) : (
        <>
          <h1>Song Details</h1>
          {songLoading ? (
            <h2>loading ...</h2>
          ) : (
            <>
              <div>
                <h3>
                  {song.name}
                </h3>
                {isEditing ? (
                  <SongForm currSong={song} isEditing={true} />
                ) : (
                  <>
                    <p>Artists: {}</p>
                    <p>Duration: {song.duration}</p>
                    <p>Genres: {}</p>
                  </>
                )}
                {!isEditing && (
                  <>
                    <button className="btn btn-warning" onClick={() => edit()}>
                      edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteSong()}
                    >
                      delete
                    </button>
                  </>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default SongDetails;
