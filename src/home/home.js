import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import UserContext from '../user'
import { Link } from 'react-router-dom';
import SongForm from '../song-form/song-form'

const Home = () => {
  return (
    <div class="container">
        <h1>Home</h1>
        <div>
            <Link to="/songs">Songs</Link>
        </div>
        <div>
            <Link to="/artists">Artists</Link>
        </div>
        <div>
            <Link to="/playlists">Playlists</Link>
        </div>
        <div>
            <Link to="/users">Users</Link>
        </div>
    </div>
  );
}

export default Home;