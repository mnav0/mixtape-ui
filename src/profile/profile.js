import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import artistService from "../services/artist-service";
import listenerService from "../services/listener-service";
import userService from "../services/user-service";
import UserForm from "../user-form/user-form";
import SongForm from "../song-form/song-form";
import UserContext from "../user";
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
import { LinkContainer } from "../styled-nav";

const Profile = ({ ...props }) => {
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isArtist, setIsArtist] = useState(false);

  const userId = props.match.params.id;

  const userType = useContext(UserContext);

  const getType = () => {
    artistService.findAllArtists().then(response => {
      console.log(response);
      {
        response.map(
          (artist, i) => artist.userId == userId && setIsArtist(true)
        );
      }
    });
  };

  useEffect(() => {
    userService
      .findUserById(userId)
      .then(response => setUser(response))
      .finally(() => {
        getType();
        setUserLoading(false);
      });
  }, []);

  const edit = () => {
    setIsEditing(true);
  };

  const deleteUser = () => {
    userService.deleteUser(userId).then(response => console.log(response));
    setIsDeleted(true);
  };

  return (
    <div className="container my-5">
      <LinkContainer>
        <Link to="/menu">MENU</Link>
      </LinkContainer>
      {isDeleted ? (
        <>
          <Name>User has been deleted</Name>
          <TableLink to={"/users"}>Back to all users</TableLink>
        </>
      ) : (
        <>
          <DetailsHeader>Profile</DetailsHeader>
          {userLoading ? (
            <DetailsLabel>Loading ...</DetailsLabel>
          ) : (
            <>
              <div>
                <Name>
                  {user.firstName} {user.lastName}
                </Name>
                {isEditing ? (
                  <UserForm currUser={user} isEditing={true} />
                ) : (
                  <>
                    <div>
                      <DetailsLabel>BIRTHDAY:</DetailsLabel>
                      <DetailsBody>{user.dob}</DetailsBody>
                    </div>
                    <div>
                      <DetailsLabel>USERNAME:</DetailsLabel>
                      <DetailsBody>{user.username}</DetailsBody>
                    </div>
                    <div>
                      <DetailsLabel>PASSWORD:</DetailsLabel>
                      <DetailsBody>{user.password}</DetailsBody>
                    </div>
                  </>
                )}
                {(isArtist && userType == "artist") ||
                (!isArtist && userType == "listener") ? (
                  !isEditing && (
                    <ButtonContainer>
                      <div onClick={() => edit()}>
                        <Button color={"#E3DAFD"} text={"EDIT"} />
                      </div>
                      <div onClick={() => deleteUser()}>
                        <Button text={"DELETE"} color={"#FDDADA"} />
                      </div>
                    </ButtonContainer>
                  )
                ) : (
                  <Permissions>
                    <div>
                      <DetailsLabel>
                        You do not have permission to edit this user
                        {isArtist && " or add a song"}.
                      </DetailsLabel>
                    </div>
                    <div>
                      <TableLink to={"/users"}>Back to all users</TableLink>
                    </div>
                  </Permissions>
                )}
              </div>
              {userType == "artist" && isArtist && (
                <SongForm
                  currSong={{ name: "", duration: "" }}
                  isEditing={false}
                  artistId={userId}
                />
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
