import React from "react";
import ReactDOM from "react-dom";
import UserContext from './user'

const Playlists = () => {
    const userInfo = React.useContext(UserContext)

    return (
        <div>
            <p>In playlists:</p>
            <p>{userInfo}</p>
        </div>
    )
}

export default Playlists