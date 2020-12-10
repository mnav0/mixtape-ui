import React, { useState, useEffect } from "react";
import ReactDOM from "react-dom";
import artistService from "../services/artist-service";
import UserContext from "../user";
import songService from "../services/song-service";

const ArtistList = () => {
  const [artistList, setArtistList] = useState("");
  const [artistListLoading, setArtistListLoading] = useState(true);
  const [socialMediaLoading, setSocialMediaLoading] = useState(true);
  const [userLoading, setUserLoading] = useState(true);

  const username = React.useContext(UserContext);

  useEffect(() => {
    artistService
      .findAllArtists()
      .then((artistList) => {
        artistList.map((artist) => {
          artistService
            .findSocialMediaForArtist(artist.userId)
            .then((response) => {
              (artist.socialMedia = response)
            })
            .finally(() => setSocialMediaLoading(false));
        });
        artistList.map((artist) => {
          artistService
            .findUserForArtist(artist.userId)
            .then((response) => {
              (artist.user = response)})
            .finally(() => setUserLoading(false));
        });
        setArtistList(artistList);
      })
      .finally(() => {
        setArtistListLoading(false)
      });
  }, []);

  console.log("social media: ", socialMediaLoading, "user: ", userLoading, "artist: ", artistListLoading)

  return (
    <div>
      {(artistListLoading) ? (
        <div>
        <h1>artist loading true</h1>
        </div>
      ) : (
    <div className="container-fluid">
      {/* <a href="../../index.html">Home</a> */}
      <h1>Artists</h1>
      {artistList ? artistList.map((artist) => (
        <table>
          <tbody>
            <tr key={artist.userId}>
              {artist.user ? (
                <td>
                  {artist.user.firstName ? artist.user.firstName : null} {artist.user.lastName ? artist.user.lastName : null}
                </td>
              ) : (
                <td></td>
              )}
            </tr>
          </tbody>
        </table>
      )) : <div></div>}
      {/* <table>
        <tbody>
          {artists.map((artist) => (
            <tr key={artist.userId}>
              <td>
                {artist.user.firstName} {artist.user.lastName}
              </td>
              <td>
                {artist.socialMedias.map((socialMedia) => (
                  <p>{socialMedia.url}</p>
                ))}
              </td>
              <td>
                {artist.songRecordings.map((song) => (
                  <p>{song.name}</p>
                ))}
              </td>
            </tr>
          ))}
        </tbody>
      </table> */}
      </div>
     )}
    </div>
  );
};

export default ArtistList;

// class ArtistList extends React.Component {
//     state = {
//         artists: [],
//         socialMediasLoading: true,
//         usersLoading: true
//     }

//     findArtistUser = (artistId) =>
//         findUserForArtist(artistId)
//             .then(response => response)

//     findArtistSocialMedia = (artistId) =>
//         findSocialMediaForArtist(artistId)
//             .then(response => response)

//     findAllArtists = () => {
//         return findAllArtists()
//             .then((artists) => {
//                 artists.map((artist) =>
//                     this.findArtistSocialMedia(artist.userId).then(
//                         response => artist.socialMedias = response).finally(
//                         () => this.setState({socialMediasLoading: false})))
//                 artists.map((artist) =>
//                     this.findArtistUser(artist.userId).then(
//                         response => artist.user = response).finally(
//                         () => this.setState({usersLoading: false})))
//                 this.setState({artists: artists})
//             })
//     }

//     componentDidMount = () => {
//         this.findAllArtists()
//     }

//     render(){
//         console.log(this.state)
//         return (
//             (this.state.socialMediasLoading || this.state.usersLoading) ?
//                 <div>Loading...</div> :
//                 <div className="container-fluid">
//                     <a href="../../index.html">
//                         Home
//                     </a>
//                     <h1>Artists</h1>
//                     <table>
//                         <tbody>
//                         {
//                             this.state.artists.map((artist) =>
//                                 <tr key={artist.userId}>
//                                     <td>{artist.user.firstName} {artist.user.lastName}</td>
//                                     <td>{artist.socialMedias.map((socialMedia) =>
//                                         <p>{socialMedia.url}</p>
//                                     )}</td>
//                                   <td>{artist.songRecordings.map((song) =>
//                                       <p>{song.name}</p>
//                                   )}</td>
//                                 </tr>
//                             )
//                         }
//                         </tbody>
//                     </table>
//                 </div>
//         )
//     }

// }

// ReactDOM.render(
//     <ArtistList />,
//     document.getElementById('root')
// )
