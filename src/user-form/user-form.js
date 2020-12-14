import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import artistService from "../services/artist-service";
import listenerService from "../services/listener-service";
import userService from "../services/user-service";
import {
  FormContainer,
  FormLabel,
  ButtonBody,
  UnstyledButtonContainer
} from "../styled-form";
import Button from "../button/button";

const UserForm = ({ currUser, isEditing }) => {
  const [newFirstName, setNewFirstName] = useState(currUser.firstName);
  const [newLastName, setNewLastName] = useState(currUser.lastName);
  const [newUsername, setNewUsername] = useState(currUser.username);
  const [newPassword, setNewPassword] = useState(currUser.password);
  const [newType, setNewType] = useState(currUser.type);

  const createUser = () => {
    const newUser = {
      firstName: newFirstName,
      lastName: newLastName,
      username: newUsername,
      password: newPassword
    };
    userService.createNewUser(newUser).then(createdUser => {
      newType.toUpperCase() == "ARTIST"
        ? artistService
            .createNewArtist(createdUser.id)
            .then(response => console.log(response))
        : listenerService
            .createNewListener(createdUser.id)
            .then(response => console.log(response));
    });
  };

  const update = () => {
    const updateUser = {
      ...currUser,
      firstName: newFirstName,
      lastName: newLastName,
      username: newUsername,
      password: newPassword
    };
    userService
      .updateUser(updateUser, currUser.id)
      .then(response => console.log(response));
  };

  const deleteUser = () => {
    console.log(currUser.id);
  };

  return (
    <FormContainer>
      <form className="my-4">
        <div className="form-group">
          <FormLabel htmlFor="firstName">FIRST NAME</FormLabel>
          <input
            value={newFirstName}
            onChange={event => setNewFirstName(event.target.value)}
            id="firstName"
            className="form-control col-6"
            type="text"
          />
        </div>
        <div className="form-group">
          <FormLabel htmlFor="lastName">LAST NAME</FormLabel>
          <input
            value={newLastName}
            onChange={event => setNewLastName(event.target.value)}
            id="lastName"
            className="form-control col-6"
            type="text"
          />
        </div>
        <div className="form-group">
          <FormLabel htmlFor="username">USERNAME</FormLabel>
          <input
            value={newUsername}
            onChange={event => setNewUsername(event.target.value)}
            id="username"
            className="form-control col-6"
            type="text"
          />
        </div>
        <div className="form-group">
          <FormLabel htmlFor="password">PASSWORD</FormLabel>
          <input
            value={newPassword}
            onChange={event => setNewPassword(event.target.value)}
            id="password"
            className="form-control col-6"
            type="password"
          />
        </div>
        { !isEditing &&
        <div className="form-group">
          <FormLabel htmlFor="type">LISTENER OR ARTIST?</FormLabel>
          <input
            value={newType}
            onChange={event => setNewType(event.target.value)}
            id="type"
            className="form-control col-6"
          />
        </div>
        }
        {isEditing ? (
          <div onClick={() => update()}>
            <Button text={"UPDATE"} />
          </div>
        ) : (
          <UnstyledButtonContainer>
            <button
              onClick={() => {
                createUser();
                setTimeout(() => window.location.reload(), 1200);
              }}
              type="button"
            >
              <ButtonBody>CREATE USER</ButtonBody>
            </button>
          </UnstyledButtonContainer>
        )}
      </form>
    </FormContainer>
  );
};

export default UserForm;
