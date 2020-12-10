const FIND_ALL_ARTISTS = "http://localhost:8080/findAllArtists"
const FIND_USER_BY_ID = "http://localhost:8080/findUserById"
const FIND_SOCIAL_MEDIA_BY_ARTIST = "http://localhost:8080/findSocialMediaByArtist"

export const findAllArtists = () =>
    fetch(`${FIND_ALL_ARTISTS}`)
        .then(response => response.json())

export const findUserForArtist = (id) =>
    fetch(`${FIND_USER_BY_ID}/${id}`)
        .then(response => {
            return response.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        })

export const findSocialMediaForArtist = (id) =>
    fetch(`${FIND_SOCIAL_MEDIA_BY_ARTIST}/${id}`)
        .then(response => {
            return response.text()
        })
        .then((data) => {
            return data ? JSON.parse(data) : {}
        })

export default { findAllArtists, findUserForArtist, findSocialMediaForArtist}