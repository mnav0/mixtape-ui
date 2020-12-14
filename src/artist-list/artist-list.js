import React, { useState, useEffect } from "react";
import artistService from "../services/artist-service";
import UserContext from "../user";
import { Link } from "react-router-dom";
import { PageHeader, TableHeader, TableLink, TableBody } from "../styled-table";
import { LinkContainer } from '../styled-nav';

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
       <LinkContainer>
        <Link to="/">HOME</Link>
        <Link to="/menu">MENU</Link>
      </LinkContainer>
        <PageHeader>Artists</PageHeader>
      {(artistListLoading) ? (
        <div>
        <TableBody>Loading ...</TableBody>
        </div>
      ) : (
        <>
        <table className="table my-4">
          <thead>
            <tr>
              <TableHeader scope="col">NAME</TableHeader>
              <TableHeader scope="col">BIO</TableHeader>
              <TableHeader scope="col">SOCIAL MEDIA LINKS</TableHeader>
            </tr>
          </thead>
          <tbody>
            {artistInfo.map((artist, i) => {
                console.log(artist)
              return (
                <tr key={i}>
                  <td><TableLink to={`/profile/${artist.artist.userId}`}> {artist.name} </TableLink></td>
                  <td><TableBody>{artist.artist.bio}</TableBody></td>
                  <td>
                    {artist.artist.socialMedias.map(socialMedia => (
                      <TableBody key={socialMedia.id}>{socialMedia.url}</TableBody>
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
