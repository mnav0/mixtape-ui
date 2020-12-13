import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import playlistService from "../services/playlist-service";
import songService from "../services/song-service";
import { ButtonBody } from '../styled-form';
import { PageHeader, TableHeader, TableLink, TableBody } from "../styled-table";

const PlaylistForm = ({ currPlaylist, editing }) => {
    console.log(currPlaylist)
    const [newPlaylistName, setNewPlaylistName] = useState(currPlaylist.name);
    const [newCreatedAt, setNewCreatedAt] = useState(currPlaylist.createdAt);
    const [newCreatedBy, setNewCreatedBy] = useState(currPlaylist.createdBy);
    const [newSongAdditions, setNewSongAdditions] = useState(currPlaylist.songAdditions)
    const [allSongs, setAllSongs] = useState([])
    const [allSongsLoading, setAllSongsLoading] = useState(true)

    const removeSong = (i) =>{
        const songs = newSongAdditions;
        delete songs[i];

        setNewSongAdditions(songs);

        const updatedPlaylist = {
            ...currPlaylist,
            name: newPlaylistName,
            createdAt: newCreatedAt,
            createdBy: newCreatedBy,
            songAdditions: newSongAdditions
        }
        playlistService.updatePlaylist(updatedPlaylist, currPlaylist.id).then((response) => console.log(response))

    }

    const addSong = (songId) => {
        playlistService.addSongToPlaylist(currPlaylist.id, songId).then((response) => console.log(response))
    }
    

    const update = () => {
        console.log(newPlaylistName)
        const updatedPlaylist = {
            ...currPlaylist,
            name: newPlaylistName,
            createdAt: newCreatedAt,
            createdBy: newCreatedBy,
            songAdditions: newSongAdditions
        }
        playlistService.updatePlaylist(updatedPlaylist, currPlaylist.id).then((response) => console.log(response))
    }

    const createPlaylist = () => {
        const newPlaylist = {
            name: newPlaylistName,
            createdAt: newCreatedAt,
            createdBy: newCreatedBy,
            songAdditions: [],
        }
        playlistService
            .createNewPlaylist(newPlaylist)
            .then((response) => console.log(response));

    }

    useEffect(() => {
        songService.findAllSongs()
        .then(response => setAllSongs(response))
        .finally(() => setAllSongsLoading(false))
    }, [])

    console.log(editing)
    return (
        <form className="my-4">
            {console.log(currPlaylist)}
            <h3>Playlist Name</h3>
            {console.log(newPlaylistName)}
            <div className="form-group">
                <input 
                    value={newPlaylistName}
                    onChange={(event) => setNewPlaylistName(event.target.value)}
                    id="playlistName"
                    className="form-control col-6"
                    type="text"
                />
            </div>
            {editing ? ( 
            <div>
            <button onClick={() => update()} className="btn btn-success">
                <ButtonBody>UPDATE PLAYLIST NAME</ButtonBody>
            </button>
            <div>
                <h3> Songs </h3>
            </div>
            <table className="table my-4">
                <thead>
                    <tr>
                        <TableHeader scope="col">NAME</TableHeader>
                    </tr>
                </thead>
                <tbody>
                    {newSongAdditions.map((song, i) => {
                        return (
                            <tr key={i}>
                                <td>
                                    <TableBody>{song.name}</TableBody>
                             
                                </td>
                                <td>
                                <button onClick={() => removeSong(i)} className="btn btn-danger">
                                        <ButtonBody>
                                            REMOVE FROM PLAYLIST
                                        </ButtonBody>

                                    </button>
                                </td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <div>
                <h3>Add Songs to Playlist</h3>
                {allSongsLoading ? (
                    <p> Loading... </p>
                ): (
                <table className="table my-4">
                    <thead>
                        <tr>
                            <TableHeader scope="col"> SONG NAME</TableHeader>
                        </tr>
                    </thead>
                    <tbody>
                        {allSongs.map((song, i) => {
                            return(
                                <tr key={i}>
                                    <td> {song.name} </td>
                                    <td>
                                        <button onClick={() => addSong(song.id)} className="btn btn-success">
                                            <ButtonBody>
                                                ADD TO PLAYLIST
                                            </ButtonBody>

                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>

                </table>
                )}
            </div>

            </div>
                ) : (
                    <button onClick={() => createPlaylist()} className="btn btn-success">
                <ButtonBody>CREATE PLAYLIST</ButtonBody>
            </button> )}
            

        </form>
    )


}

export default PlaylistForm;