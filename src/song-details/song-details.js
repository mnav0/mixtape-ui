import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import songService from "../services/song-service";
import SongForm from "../song-form/song-form";
import { DetailsHeader, Name, DetailsLabel, DetailsBody, ButtonContainer } from '../styled-details'
import Button from '../button/button'
import { TableLink } from '../styled-table'

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
      <Link to="/menu" className="row">Menu</Link>
      {isDeleted ? (
        <>
          <Name>Song has been deleted</Name>
          <TableLink to={"/songs"}>Back to all songs</TableLink>
        </>
      ) : (
        <>
          <DetailsHeader>Song Details</DetailsHeader>
          {songLoading ? (
            <DetailsLabel>Loading ...</DetailsLabel>
          ) : (
            <>
              <div>
                <Name>
                  {song.name}
                </Name>
                {isEditing ? (
                  <SongForm currSong={song} isEditing={true} />
                ) : (
                  <div>
                    <DetailsLabel>DURATION:</DetailsLabel>
                    <DetailsBody>{Math.floor(song.duration / 60)}:
                        {(
                          song.duration -
                          Math.floor(song.duration / 60) * 60 +
                          "00"
                        ).slice(0, 2)}</DetailsBody>
                  </div>
                )}
                {!isEditing && (
                  <ButtonContainer>
                    <div onClick={() => edit()}>
                      <Button color={'#E3DAFD'} text={'EDIT'} />
                    </div>
                    <div onClick={() => deleteSong()}>
                      <Button text={'DELETE'} color={'#FDDADA'} />
                    </div>
                  </ButtonContainer>
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
