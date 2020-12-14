import React, { useContext } from "react";
import ReactDOM from "react-dom";
import UserContext from '../user'
import { Link } from 'react-router-dom';
import { WelcomeHeader } from '../styled-context-selector'
import Button from '../button/button'

const Home = () => {
  const userType = useContext(UserContext);

  return (
    <div class="container">
        {(userType == 'artist' || userType == 'listener') && (
          <WelcomeHeader>Welcome back, {userType}!</WelcomeHeader>
      )}
        <Link to="/menu">
            <Button text={'ENTER MIXTAPE'} />
        </Link>
    </div>
  );
}

export default Home;