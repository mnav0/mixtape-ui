import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import artistService from "../services/artist-service";
import listenerService from "../services/listener-service";
import userService from "../services/user-service";
import UserForm from "../user-form/userForm";

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
      <h1>Users</h1>
      {userLoading ? (
        <h2>loading ...</h2>
      ) : (
        <>
          <table className="table my-4">
            <thead>
              <tr>
                <th scope="col">First Name</th>
                <th scope="col">Last Name</th>
                <th scope="col">Username</th>
                <th scope="col">Birthday</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, i) => {
                  console.log(user)
                return (
                  <tr key={i}>
                    <td>{user.firstName}</td>
                    <td>{user.lastName}</td>
                    <td><Link to={`/profile/${user.id}`}>{user.username}</Link></td>
                    <td>{user.dob}</td>
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
