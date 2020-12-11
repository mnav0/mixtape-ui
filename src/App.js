import React from "react";
import logo from "./logo.svg";
// import "./App.css";
import UserContext from "./user";
import SongList from "./song-list/song-list";
import ArtistList from "./artist-list/artist-list";
import Playlists from "./playlists";
import Home from "./home/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./users/users";
import Profile from "./profile/profile";

const App = () => {
  return (
    <div className="App">
      <Switch>
        <UserContext.Provider value={"HBD Mckenna!"}>
          <Route exact path="/" component={Home} />
          <Route path="/songs" component={SongList} />
          <Route path="/playlists" component={Playlists} />
          <Route path="/artists" component={ArtistList} />
          <Route path="/users" exact component={Users} />
          <Route path="/profile/:id" exact component={Profile} />
        </UserContext.Provider>
      </Switch>
    </div>
  );
};

export default App;
