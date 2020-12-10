class ArtistList extends React.Component {
    state = {
        artists: [],
        socialMediasLoading: true,
        usersLoading: true
    }

    findArtistUser = (artistId) =>
        findUserForArtist(artistId)
            .then(response => response)

    findArtistSocialMedia = (artistId) =>
        findSocialMediaForArtist(artistId)
            .then(response => response)

    findAllArtists = () => {
        return findAllArtists()
            .then((artists) => {
                artists.map((artist) =>
                    this.findArtistSocialMedia(artist.userId).then(
                        response => artist.socialMedias = response).finally(
                        () => this.setState({socialMediasLoading: false})))
                artists.map((artist) =>
                    this.findArtistUser(artist.userId).then(
                        response => artist.user = response).finally(
                        () => this.setState({usersLoading: false})))
                this.setState({artists: artists})
            })
    }

    componentDidMount = () => {
        this.findAllArtists()
    }

    render(){
        console.log(this.state)
        return (
            (this.state.socialMediasLoading || this.state.usersLoading) ?
                <div>Loading...</div> :
                <div className="container-fluid">
                    <a href="../../index.html">
                        Home
                    </a>
                    <h1>Artists</h1>
                    <table>
                        <tbody>
                        {
                            this.state.artists.map((artist) =>
                                <tr key={artist.userId}>
                                    <td>{artist.user.firstName} {artist.user.lastName}</td>
                                    <td>{artist.socialMedias.map((socialMedia) =>
                                        <p>{socialMedia.url}</p>
                                    )}</td>
                                  <td>{artist.songRecordings.map((song) =>
                                      <p>{song.name}</p>
                                  )}</td>
                                </tr>
                            )
                        }
                        </tbody>
                    </table>
                </div>
        )
    }


}

ReactDOM.render(
    <ArtistList />,
    document.getElementById('root')
)