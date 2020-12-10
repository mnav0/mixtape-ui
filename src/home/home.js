import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import UserContext from '../user'
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div>
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
    </div>
  );
}

export default Home;