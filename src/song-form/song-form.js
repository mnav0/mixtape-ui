import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import songService from "../services/song-service";
import { FormContainer, FormLabel, ButtonBody } from '../styled-form'
import Button from '../button/button'

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
        <FormContainer>
        <form className="my-4">
        <div className="form-group">
          <FormLabel htmlFor="name">SONG NAME</FormLabel>
          <input
            value={newName}
            onChange={(event) => setNewName(event.target.value)}
            id="name"
            className="form-control col-6"
            type="text"
          />
        </div>
        <div className="form-group">
          <FormLabel htmlFor="duration">DURATION (S)</FormLabel>
          <input
            value={newDuration}
            onChange={(event) => setNewDuration(event.target.value)}
            id="duration"
            className="form-control col-6"
            type="text"
          />
        </div>
        {isEditing ? (
          <div onClick={() => updateSong()}>
            <Button text={'UPDATE'} />
          </div>
        )
        : (
        <div onClick={() => createSong()}>
          <Button text={'CREATE SONG'}></Button>
        </div>
        )}
      </form>
      </FormContainer>
    )
}

export default SongForm