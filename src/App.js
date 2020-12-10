import logo from './logo.svg';
import './App.css';
import UserContext from './user'
import SongList from './song-list/song-list'
import ArtistList from './artist-list/artist-list'
import Playlists from './playlists'

const App = () => {
  return (
    <div className="App">
      <UserContext.Provider value={'HBD Mckenna!'}>
        <SongList />
        <Playlists />
        <ArtistList />
      </UserContext.Provider>
    </div>
  );
}

export default App;

{/* <UserContext.Provider value={'Hannah!'}>
      <SongList />
      <Playlists />
      <ArtistList />
    </UserContext.Provider> */}