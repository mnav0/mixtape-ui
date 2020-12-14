import React, { useEffect, useState, useContext } from "react";
import { Link, useHistory } from "react-router-dom";
import songService from "../services/song-service";
import SongForm from "../song-form/song-form";
import {
  DetailsHeader,
  Name,
  DetailsLabel,
  DetailsBody,
  ButtonContainer,
  Permissions
} from "../styled-details";
import Button from "../button/button";
import { TableLink } from "../styled-table";
import UserContext from "../user";
import { LinkContainer } from "../styled-nav";

const SongDetails = ({ ...props }) => {
  const [song, setSong] = useState({});
  const [songLoading, setSongLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const songId = props.match.params.id;

  const userType = useContext(UserContext);

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
      <LinkContainer>
        <Link to="/menu">
          MENU
        </Link>
      </LinkContainer>
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
                <Name>{song.name}</Name>
                {isEditing ? (
                  <SongForm currSong={song} isEditing={true} />
                ) : (
                  <div>
                    <DetailsLabel>DURATION (s):</DetailsLabel>
                    <DetailsBody>{song.duration}</DetailsBody>
                  </div>
                )}
                {userType == "artist" ? (
                  !isEditing && (
                    <ButtonContainer>
                      <div onClick={() => edit()}>
                        <Button color={"#E3DAFD"} text={"EDIT"} />
                      </div>
                      <div onClick={() => deleteSong()}>
                        <Button text={"DELETE"} color={"#FDDADA"} />
                      </div>
                    </ButtonContainer>
                  )
                ) : (
                  <Permissions>
                    <div>
                      <DetailsLabel>
                        You do not have permission to edit this song.
                      </DetailsLabel>
                    </div>
                    <div>
                      <TableLink to={"/songs"}>Back to all songs</TableLink>
                    </div>
                  </Permissions>
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
