import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import playlistService from "../services/playlist-service";
import userService from "../services/user-service";
import { ButtonBody } from "../styled-form";
import { PageHeader, TableHeader, TableLink, TableBody } from "../styled-table";
import PlaylistForm from "../playlist-form/playlist-form";
import {
  DetailsHeader,
  Name,
  DetailsLabel,
  DetailsBody,
  ButtonContainer,
  Permissions
} from "../styled-details";
import Button from "../button/button";
import UserContext from "../user";
import { LinkContainer } from '../styled-nav'

const PlaylistDetails = ({ ...props }) => {
  const [playlist, setPlaylist] = useState({});
  const [playlistLoading, setPlaylistLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [songs, setSongs] = useState([]);
  const [userLoading, setUserLoading] = useState(true);
  const [songLoading, setSongLoading] = useState(true);

  const playlistId = props.match.params.id;

  const userType = useContext(UserContext);

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
      {isEditing ? (
        <PlaylistForm currPlaylist={playlist} editing={true} />
      ) : isDeleted ? (
        <>
          <Name>playlist has been deleted</Name>
          <TableLink to={"/playlists"}>Back to all playlists</TableLink>
        </>
      ) : (
        <>
          <LinkContainer>
            <Link to="/menu">MENU</Link>
          </LinkContainer>
          <DetailsHeader>Playlist</DetailsHeader>
          {playlistLoading || userLoading ? (
            <DetailsLabel>Loading ...</DetailsLabel>
          ) : (
            <>
              <div>
                <Name>{playlist.name}</Name>
                {!isEditing && (
                  <>
                    <div>
                      <DetailsLabel>CREATED BY:</DetailsLabel>
                      <DetailsBody>
                        {playlist.user.firstName} {playlist.user.lastName}
                      </DetailsBody>
                    </div>
                    <div>
                      <DetailsLabel>CREATED AT:</DetailsLabel>
                      <DetailsBody>{playlist.createdAt}</DetailsBody>
                    </div>
                  </>
                )}
                {userType == "listener" ? (
                  !isEditing && (
                    <ButtonContainer>
                      <div onClick={() => edit()}>
                        <Button color={"#C9E4FF"} text={"EDIT"} />
                      </div>
                      <div onClick={() => deletePlaylist()}>
                        <Button text={"DELETE"} color={"#FDDADA"} />
                      </div>
                    </ButtonContainer>
                  )
                ) : (
                  <Permissions>
                    <div>
                      <DetailsLabel>
                        You do not have permission to edit this playlist.
                      </DetailsLabel>
                    </div>
                    <div>
                      <TableLink to={"/playlists"}>Back to all playlists</TableLink>
                    </div>
                  </Permissions>
                )}
                {songLoading ? (
                  <DetailsLabel>Loading...</DetailsLabel>
                ) : (
                  <div>
                    <PageHeader>Songs in {playlist.name}</PageHeader>
                    <table className="table my-4">
                      <thead>
                        <tr>
                          <TableHeader scope="col">NAME</TableHeader>
                          <TableHeader scope="col">ARTISTS</TableHeader>
                          <TableHeader scope="col">DURATION (S)</TableHeader>
                          <TableHeader scope="col">GENRES</TableHeader>
                        </tr>
                      </thead>
                      <tbody>
                        {songs.map((song, i) => {
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
                                <TableBody>{song.song.duration}</TableBody>
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
                  </div>
                )}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default PlaylistDetails;
