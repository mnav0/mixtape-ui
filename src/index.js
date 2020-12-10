import React from 'react';
import ReactDOM from 'react-dom';
import SongList from './song-list/song-list'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import UserContext from './user';
import Playlists from './playlists'

ReactDOM.render(
  <React.StrictMode>
    <UserContext.Provider value={'Hannah!'}>
      <SongList />
      <Playlists />
    </UserContext.Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
