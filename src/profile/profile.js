import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import artistService from "../services/artist-service";
import listenerService from "../services/listener-service";
import userService from "../services/user-service";
import UserForm from "../user-form/user-form";
import SongForm from "../song-form/song-form";
import { DetailsHeader, Name, DetailsLabel, DetailsBody, ButtonContainer } from '../styled-details'
import Button from '../button/button'
import { TableLink } from '../styled-table'

const Profile = ({ ...props }) => {
  const [user, setUser] = useState({});
  const [userLoading, setUserLoading] = useState(true);
  const [isEditing, setIsEditing] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);
  const [isArtist, setIsArtist] = useState(false);

  const userId = props.match.params.id;

  const history = useHistory();

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
      <Link to="/menu" className="row">Menu</Link>
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
                {!isEditing && (
                  <>
                  <ButtonContainer>
                    <div onClick={() => edit()}>
                      <Button color={'#E3DAFD'} text={'EDIT'} />
                    </div>
                    <div onClick={() => deleteUser()}>
                      <Button text={'DELETE'} color={'#FDDADA'} />
                    </div>
                    </ButtonContainer>
                  </>
                )}
              </div>
              {isArtist ? (
                <SongForm
                  currSong={{ name: "", duration: "" }}
                  isEditing={false}
                  artistId={userId}
                />
              ) : (
                <></>
              )}
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Profile;
