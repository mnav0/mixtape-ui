import React, { useState, useContext } from "react";
import logo from "./logo.svg";
import UserContext from "./user";
import SongList from "./song-list/song-list";
import ArtistList from "./artist-list/artist-list";
import Playlists from "./playlists/playlists";
import Home from "./home/home";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Users from "./users/users";
import Profile from "./profile/profile";
import SongDetails from "./song-details/song-details";
import PlaylistDetails from "./playlist-details/playlist-details";
import PlaylistForm from "./playlist-form/playlist-form";
import ListenerList from "./listener-list/listener-list";
import Menu from "./menu/menu";
import { WelcomeHeader, Artist, Listener } from "./styled-context-selector";

const App = () => {
  const [user, setUser] = useState("");
  const userType = useContext(UserContext);
  return (
    <div className="App">
      {!( user || (userType == 'artist' || userType == 'listener')) && (
        <div className="container">
          <WelcomeHeader>Welcome to mixtape!<br></br>Are you a listener or an artist?</WelcomeHeader>
          <Artist onClick={() => setUser("artist")} className="col-lg-6 col-md-4 col-sm-2"><h2>I am an artist</h2></Artist>
          <Listener onClick={() => setUser("listener")} className="col-lg-6 col-md-4 col-sm-2"><h2>I am a listener</h2></Listener>
        </div>
      )}
      <UserContext.Provider value={user}>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/menu" component={Menu} />
          <Route path="/songs" component={SongList} />
          <Route path="/playlists" component={Playlists} />
          <Route path="/artists" component={ArtistList} />
          <Route path="/users" exact component={Users} />
          <Route path="/profile/:id" exact component={Profile} />
          <Route path="/song/:id" exact component={SongDetails} />
          <Route path="/playlist/:id" exact component={PlaylistDetails} />
          <Route path="/playlist/edit/:id" exact component={PlaylistForm} />
          <Route path="/listeners" component={ListenerList} />
        </Switch>
      </UserContext.Provider>
    </div>
  );
};

export default App;
