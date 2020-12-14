import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import userService from "../services/user-service";
import UserForm from "../user-form/user-form";
import { PageHeader, TableHeader, TableLink, TableBody } from "../styled-table";
import { LinkContainer } from '../styled-nav';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [userLoading, setUserLoading] = useState(true);

  useEffect(() => {
    userService
      .findAllUsers()
      .then((response) => setUsers(response))
      .finally(() => setUserLoading(false));
  }, []);

  return (
    <div className="container align-items-left">
      <LinkContainer>
        <Link to="/">HOME</Link>
        <Link to="/menu">MENU</Link>
      </LinkContainer>
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
        <PageHeader>Create new user</PageHeader>
        <UserForm currUser={{firstName: '', lastName: '', username: '', password: '', dob: ''}} isEditing={false} />
      </div>
    </div>
  );
};

export default Users;
