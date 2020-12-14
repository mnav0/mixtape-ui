import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import UserContext from '../user'
import { Link } from 'react-router-dom';
import {
    PageHeader,
    TableHeader,
    TableLink,
    TableBody
  } from '../styled-table'

const Menu = () => {
    const type = React.useContext(UserContext);
    console.log("in menu: ", type)
  return (
    <div class="container">
        <UserContext.Provider value={type}>
        <PageHeader>Menu</PageHeader>
        <div>
            <TableLink to="/songs">Songs</TableLink>
        </div>
        <div>
            <TableLink to="/artists">Artists</TableLink>
        </div>
        <div>
            <TableLink to="/playlists">Playlists</TableLink>
        </div>
        <div>
            <TableLink to="/users">Users</TableLink>
        </div>
        <div>
            <TableLink to="/listeners">Listeners</TableLink>
        </div>
        </UserContext.Provider>
    </div>
  );
}

export default Menu;