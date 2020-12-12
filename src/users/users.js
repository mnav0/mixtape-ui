import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import artistService from "../services/artist-service";
import listenerService from "../services/listener-service";
import userService from "../services/user-service";
import UserForm from "../user-form/user-form";
import { PageHeader, TableHeader, TableLink, TableBody } from "../styled-table";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(true);

  const [newFirstName, setNewFirstName] = useState("");
  const [newLastName, setNewLastName] = useState("");
  const [newUsername, setNewUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [newDOB, setNewDOB] = useState("");

  useEffect(() => {
    userService
      .findAllUsers()
      .then((response) => setUsers(response))
      .finally(() => setUserLoading(false));
  }, []);

  const createUser = () => {
    const newUser = {
      firstName: newFirstName,
      lastName: newLastName,
      username: newUsername,
      password: newPassword,
      dob: newDOB,
    };
    userService
      .createNewUser(newUser)
      .then((response) => console.log(response));
  };

  return (
    <div className="container align-items-left">
      <a href="..">Home</a>
      <PageHeader>Users</PageHeader>
      {userLoading ? (
        <TableBody>Loading ...</TableBody>
      ) : (
        <>
          <table className="table my-4">
            <thead>
              <tr>
                <TableHeader scope="col">FIRST NAME</TableHeader>
                <TableHeader scope="col">LAST NAME</TableHeader>
                <TableHeader scope="col">USERNAME</TableHeader>
                <TableHeader scope="col">BIRTHDAY</TableHeader>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => {
                  console.log(user)
                return (
                  <tr key={i}>
                    <td><TableBody>{user.firstName}</TableBody></td>
                    <td><TableBody>{user.lastName}</TableBody></td>
                    <td><TableLink to={`/profile/${user.id}`}>{user.username}</TableLink></td>
                    <td><TableBody>{user.dob}</TableBody></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
      <div>
        <h2>Create new user</h2>
        <UserForm currUser={{firstName: '', lastName: '', username: '', password: '', dob: ''}} isEditing={false} />
      </div>
    </div>
  );
};

export default Users;
