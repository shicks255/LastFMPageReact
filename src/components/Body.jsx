import React from 'react';
import MainMenu from "./MainMenu";
import ArtistTable from "./ArtistTable";


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
                "getTopTracks": "Top Songs",
                "getRecentTracks": "Recent Tracks"
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
            tracks: []
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
        if (type === 'strategy')
        {
            const strategyKey = Object.entries(this.state.strategies).find((val, index) => {
                return val[1] === newValue;
            });
            this.setState({
                strategy: strategyKey[0]
            });
        }
        if (type === 'timeFrame')
        {
            let timeFrameKey = Object.entries(this.state.timeFrames).find((val,index) => {
                return val[1] === newValue;
            })
            this.setState({
                timeFrame: timeFrameKey[0]
            });
        }
        this.callApi();
    }

    callApi()
    {
        setTimeout(() =>{
            let url = this.getFullUrl()
            fetch(url)
                .then(res => res.json())
                .then(
                    res => {
                        if (this.state.strategy === 'getTopArtists')
                        {
                            let topartists = res.topartists.artist;
                            this.setState({artists: topartists})
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
                    err => {console.log(err)}
                )
        }, 1);
    }

    componentDidMount()
    {
        this.callApi();
    }

    render()
    {
        return(
            <div>
                <MainMenu {...this.state} onChange={(x,y) => this.changeItems(x,y)}/>
                <ArtistTable artists={this.state.artists}/>
            </div>
        )
    }
}