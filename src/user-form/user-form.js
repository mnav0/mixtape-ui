import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import artistService from "../services/artist-service";
import listenerService from "../services/listener-service";
import userService from "../services/user-service";
import { FormLabel, ButtonBody } from '../styled-form';

const UserForm = ({currUser, isEditing}) => {

    const [newFirstName, setNewFirstName] = useState(currUser.firstName)
    const [newLastName, setNewLastName] = useState(currUser.lastName);
    const [newUsername, setNewUsername] = useState(currUser.username);
    const [newPassword, setNewPassword] = useState(currUser.password);

    const createUser = () => {
        const newUser = {
          firstName: newFirstName,
          lastName: newLastName,
          username: newUsername,
          password: newPassword,
        };
        userService
          .createNewUser(newUser)
          .then((response) => console.log(response));
      };

    const update = () => {
        const updateUser = {
            ...currUser,
            firstName: newFirstName,
            lastName: newLastName,
            username: newUsername,
            password: newPassword,
        }
        userService.updateUser(updateUser, currUser.id).then((response) => console.log(response))
    }

    const deleteUser = () => {
        console.log(currUser.id)
    }


    return (
        <form className="my-4">
        <div className="form-group">
          <FormLabel htmlFor="firstName">FIRST NAME</FormLabel>
          <input
            value={newFirstName}
            onChange={(event) => setNewFirstName(event.target.value)}
            id="firstName"
            className="form-control col-6"
            type="text"
          />
        </div>
        <div className="form-group">
          <FormLabel htmlFor="lastName">LAST NAME</FormLabel>
          <input
            value={newLastName}
            onChange={(event) => setNewLastName(event.target.value)}
            id="lastName"
            className="form-control col-6"
            type="text"
          />
        </div>
        <div className="form-group">
          <FormLabel htmlFor="username">USERNAME</FormLabel>
          <input
            value={newUsername}
            onChange={(event) => setNewUsername(event.target.value)}
            id="username"
            className="form-control col-6"
            type="text"
          />
        </div>
        <div className="form-group">
          <FormLabel htmlFor="password">PASSWORD</FormLabel>
          <input
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            id="password"
            className="form-control col-6"
            type="password"
          />
        </div>
        {isEditing ? (
            <button onClick={() => update()} className="btn btn-success">
               <ButtonBody>UPDATE</ButtonBody>
            </button>
        )
        : (
        <button onClick={() => createUser()} className="btn btn-success">
          <ButtonBody>CREATE USER</ButtonBody>
        </button>
        )}
      </form>
    )
}

export default UserForm