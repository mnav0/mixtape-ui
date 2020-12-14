import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactDOM from "react-dom";
import listenerService from "../services/listener-service";
import { ButtonBody } from '../styled-form';
import { PageHeader, TableHeader, TableLink, TableBody } from "../styled-table";
import PlaylistForm from '../playlist-form/playlist-form';
import Button from '../button/button'

const ListenerList = () => {
  const [listenerInfo, setListenerInfo] = useState("");
  const [listenerLoading, setListenerLoading] = useState(true);
  const [creatingPlaylist, setCreatingPlaylist] = useState(false);
  const [newPlaylist, setNewPlaylist] = useState({})

  const createdNewPlaylist = (creatorId) => {
      console.log(creatorId)
      setNewPlaylist({createdBy:creatorId});
      setCreatingPlaylist(true);

  }

  useEffect(() => {
    listenerService.findListenerInformation()
      .then(response => setListenerInfo(response))
      .finally(() => setListenerLoading(false));
  }, []);

  console.log(listenerInfo)
  return ( <div>
      {
          creatingPlaylist ? ( <div>
              <PlaylistForm currPlaylist={newPlaylist} editing={false}></PlaylistForm>
          </div>

          ) : ( <div>
              <div className="container align-items-left">
              <a href=".." className="row">Home</a>
      <Link to="/menu">Menu</Link>
      <PageHeader>Listeners</PageHeader>
      {listenerLoading ? (
        <TableHeader>Loading...</TableHeader>
      ) : (
        <>
          <table className="table my-4">
            <thead>
              <tr>
                <TableHeader scope="col">NAME</TableHeader>
                <TableHeader scope="col">DATE JOINED</TableHeader>
                <TableHeader />
              </tr>
            </thead>
            <tbody>
              {listenerInfo.map((listener, i) => {
                return (
                    <tr key={i}>
                        {console.log(listener)}
                        <td><TableBody>{listener.name}</TableBody></td>
                        <td><TableBody>{listener.listener.dateJoined}</TableBody></td>
                        <td>
                        <div onClick={() => createdNewPlaylist(listener.listener.userId)}>
                          <Button text={'CREATE PLAYLIST'} color={"#A0D9B4"} />
                        </div>
                        </td>
                    </tr>
                );
              })}
            </tbody>
          </table>
        </>
      )}
    </div>

          </div>

          )
      }
  </div>
  );

}

export default ListenerList;
