import React, { useState, useEffect, useContext } from "react";
import ReactDOM from "react-dom";
import UserContext from '../user'
import { Link } from 'react-router-dom';
import { PageHeader } from '../styled-table';
import Menu from '../menu/menu';
import { EntryButton } from './styled'
import { ButtonBody } from "../styled-form";
import { WelcomeHeader } from '../styled-context-selector'

const Home = () => {
  const userType = useContext(UserContext);

  return (
    <div class="container">
        {(userType == 'artist' || userType == 'listener') && (
          <WelcomeHeader>Welcome back, {userType}!</WelcomeHeader>
      )}
        <Link to="/menu">
            <EntryButton class="btn"><p>ENTER MIXTAPE</p></EntryButton>
        </Link>
    </div>
  );
}

export default Home;