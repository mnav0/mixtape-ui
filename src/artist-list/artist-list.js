import React, { useState, useEffect } from "react";
import artistService from "../services/artist-service";
import UserContext from "../user";
import { Link } from "react-router-dom";


const ArtistList = () => {
  const [artistInfo, setArtistInfo] = useState("");
  const [artistListLoading, setArtistListLoading] = useState(true);

  const username = React.useContext(UserContext);

  useEffect(() => {
    artistService
      .findArtistInformation()
      .then(response => setArtistInfo(response))
      .finally(() => setArtistListLoading(false));
  }, []);

  return (
    <div className="container align-items-left">
        <a href="..">Home</a>
        <h2> Artists </h2>
      {(artistListLoading) ? (
        <div>
        <h2>Loading ...</h2>
        </div>
      ) : (
        <>
        <table className="table my-4">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Bio</th>
              <th scope="col">Social Media Links</th>
            </tr>
          </thead>
          <tbody>
            {artistInfo.map((artist, i) => {
                console.log(artist)
              return (
                <tr key={i}>
                  <td><Link to={`/profile/${artist.artist.userId}`}> {artist.name} </Link></td>
                  <td>{artist.artist.bio}</td>
                  <td>
                    {artist.artist.socialMedias.map(socialMedia => (
                      <p key={socialMedia.id}>{socialMedia.url}</p>
                    ))}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </>
     )}
    </div>
  );
};

export default ArtistList;
