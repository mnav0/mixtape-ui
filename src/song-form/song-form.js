import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import songService from "../services/song-service";

const SongForm = ({currSong, isEditing, artistId}) => {

    const [newName, setNewName] = useState(currSong.name);
    const [newDuration, setNewDuration] = useState(currSong.duration);
    
    const createSong = () => {
        const newSong = {
            name: newName,
            duration: newDuration
        };
        songService
          .createNewSong(artistId, newSong)
          .then((response) => console.log(response));
      };

      const updateSong = () => {
        const updatedSong = {
            ...currSong,
            name: newName,
            duration: newDuration
        }
        console.log(updatedSong)
        songService.updateSong(updatedSong, currSong.id).then((response) => console.log(response))
    }
    
    return (
        <div>
        <form className="my-4">
        <div className="form-group">
          <label htmlFor="name">Song Name</label>
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            id="name"
            className="form-control col-6"
            type="text"
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (s)</label>
          <input
            value={newDuration}
            onChange={(event) => setNewDuration(event.target.value)}
            id="duration"
            className="form-control col-6"
            type="text"
          />
        </div>
        {isEditing ? (
            <button onClick={() => updateSong()}>
                UPDATE
            </button>
        )
        : (
        <button onClick={() => createSong()} className="btn btn-success" type="button">
          <p className="p-2 mb-0">CREATE SONG</p>
        </button>
        )}
      </form>
      </div>
    )
}

export default SongForm