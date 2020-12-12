import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import artistService from "../services/artist-service";
import listenerService from "../services/listener-service";
import userService from "../services/user-service";
import UserForm from "../user-form/userForm";
import SongForm from "../song-form/song-form";

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
      {isDeleted ? (
        <>
          <h2>user has been deleted</h2>
          <Link to={"/users"}>Back to all users</Link>
        </>
      ) : (
        <>
          <h1>Profile</h1>
          {userLoading ? (
            <h2>loading ...</h2>
          ) : (
            <>
              <div>
                <h3>
                  {user.firstName} {user.lastName}
                </h3>
                {isEditing ? (
                  <UserForm currUser={user} isEditing={true} />
                ) : (
                  <>
                    <p>birthday: {user.dob}</p>
                    <p>username: {user.username}</p>
                    <p>password: {user.password}</p>
                  </>
                )}
                {!isEditing && (
                  <>
                    <button className="btn btn-warning" onClick={() => edit()}>
                      edit
                    </button>
                    <button
                      className="btn btn-danger"
                      onClick={() => deleteUser()}
                    >
                      delete
                    </button>
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
