import React from 'react';
import MainMenu from "./MainMenu";
import ArtistTable from "./ArtistTable";
import AlbumTable from "./AlbumTable";
import TrackTable from "./TrackTable";
import RecentTracksTable from "./RecentTracksTable";

export default class Body extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            strategy: "getTopArtists",
            timeFrame: "7day",
            strategies: {
                "getTopArtists": "Top Artists",
                "getTopAlbums": "Top Albums",
                "getTopTracks": "Top Songs"
            },
            timeFrames: {
                "7day": "7 Days",
                "1month": "1 Month",
                "3month": "3 Months",
                "6month": "6 Months",
                "12month": "1 Year",
                "overall": "All Time",
            },
            artists: [],
            albums: [],
            tracks: [],
            recentTracks: [],
            nowPlaying: "",

        }

        this.changeItems = this.changeItems.bind(this);
    };

    getFullUrl()
    {
        let key = 'c349ab1fcb6b132ffb8d842e982458db';
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.${this.state.strategy}&user=shicks255&api_key=${key}&format=json&period=${this.state.timeFrame}`;
        return url;
    }

    changeItems(newValue, type)
    {
        console.log(newValue);
        if (type === 'strategy')
        {
            const strategyKey = Object.entries(this.state.strategies).find((val, index) => {
                return val[1] === newValue;
            });
            this.setState({
                strategy: strategyKey[0]
            }, this.callApi);
        }
        if (type === 'timeFrame')
        {
            let timeFrameKey = Object.entries(this.state.timeFrames).find((val,index) => {
                return val[1] === newValue;
            })
            this.setState({
                timeFrame: timeFrameKey[0]
            }, this.callApi);
        }
    }

    getRecentTracks()
    {
        let key = 'c349ab1fcb6b132ffb8d842e982458db';
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=shicks255&api_key=${key}&format=json`;
        fetch(url)
            .then(res => res.json())
            .then(
                res => {
                    let recentTracks = res.recenttracks.track;
                    let nowPlaying = recentTracks.find((val,index) => {
                        if (val['@attr'] && val['@attr'].nowplaying == 'true')
                            return val;
                    });

                    this.setState({
                        recentTracks: recentTracks,
                        nowPlaying: nowPlaying
                    });
                },
                err => {console.log(err);}
            )
    }

    callApi()
    {
        let url = this.getFullUrl()
        fetch(url)
            .then(res => res.json())
            .then(
                res => {
                    if (this.state.strategy === 'getTopArtists')
                    {
                        let topArtists = res.topartists.artist;
                        this.setState({artists: topArtists})
                    }
                    if (this.state.strategy === 'getTopAlbums')
                    {
                        let topAlbums = res.topalbums.album;
                        this.setState({albums: topAlbums});
                    }
                    if (this.state.strategy === 'getTopTracks')
                    {
                        let topTracks = res.toptracks.track;
                        this.setState({tracks: topTracks});
                    }
                    if (this.state.strategy === 'getRecentTracks')
                    {
                        let recentTracks = res.recenttracks.track;
                        this.setState({tracks: recentTracks});
                    }
                },
                err => {console.log(err);}
            );
    }

    componentDidMount()
    {
        let promise1 = new Promise((resolve, reject) => {
            this.callApi();
            resolve(() => {});
        });
        let promise2 = new Promise((resolve, reject) => {
            this.getRecentTracks();
            resolve(() => {});
        });
    }

    componentDidMount1()
    {
        this.callApi();
        this.getRecentTracks();
    }

    render()
    {
        let content = ''
        if (this.state.strategy === 'getTopArtists')
            content = <ArtistTable artists={this.state.artists}/>
        if (this.state.strategy === 'getTopAlbums')
            content = <AlbumTable albums={this.state.albums}/>
        if (this.state.strategy === 'getTopTracks')
            content = <TrackTable tracks={this.state.tracks}/>

        return(
            <div>
                <div className={"columns"}>
                    <div className={'column is-half is-offset-one-quarter has-text-centered'}>
                        <i className="fas fa-history fa-5x" style={{padding: "0 15px 0 15px"}}></i>
                        <i className="fas fa-trophy fa-5x" style={{padding: "0 15px 0 15px"}}></i>
                    </div>
                    <div className={'column'}>
                    </div>
                </div>
                <MainMenu {...this.state} onChange={(x,y) => this.changeItems(x,y)}/>
                <div className={"columns"}>
                    <div className={"column"}>
                        <RecentTracksTable tracks={this.state.recentTracks}/>
                    </div>
                    <div className={"column"}>{content}</div>
                </div>
            </div>
        )
    }
}