import React from 'react';
import MainMenu from "./MainMenu";
import ArtistTable from "./ArtistTable";
import AlbumTable from "./AlbumTable";
import TrackTable from "./TrackTable";
import RecentTracksTable from "./RecentTracksTable";
import NowPlaying from "./NowPlaying";
import Profile from "./Profile";

export default class Body extends React.Component
{
    constructor(props)
    {
        let username = localStorage.getItem("userName");
        if (!username || username.length === 0)
            username = 'shicks255';

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
            selected: 'recent',
            userAvatar: "",
            playCount: 0,
            registered: 0,
            userName: username,
            modalImageSrc: "",
            modalImageCaption: ""
        }

        this.modalTimeOut = null;

        this.changeItems = this.changeItems.bind(this);
        this.setUserName = this.setUserName.bind(this);
        this.loadData = this.loadData.bind(this);
        this.getFullUrl = this.getFullUrl.bind(this);
        this.getRecentTracks = this.getRecentTracks.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.callApi = this.callApi.bind(this);
        this.clickButton = this.clickButton.bind(this);
        this.mouseEnter = this.mouseEnter.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
    };

    setUserName(value)
    {
        localStorage.setItem("userName", value);
        this.setState({
            userName: value
        });
    }

    getFullUrl()
    {
        let key = 'c349ab1fcb6b132ffb8d842e982458db';
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.${this.state.strategy}&user=${this.state.userName}&api_key=${key}&format=json&period=${this.state.timeFrame}`;
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
        console.log('getting recent tracks');
        let key = 'c349ab1fcb6b132ffb8d842e982458db';
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${this.state.userName}&api_key=${key}&format=json`;
        fetch(url)
            .then(res => res.json())
            .then(
                res => {
                    if (res.recenttracks)
                    {
                        let recentTracks = res.recenttracks.track;
                        let nowPlaying = recentTracks.find((val,index) => {
                            if (val['@attr'] && val['@attr'].nowplaying === 'true')
                                return val;
                            else
                                return '';
                        });

                        this.setState({
                            recentTracks: recentTracks,
                            nowPlaying: nowPlaying ? nowPlaying : ''
                        });
                    }
                },
                err => {console.log(err);}
            )
    }

    getUserInfo()
    {
        console.log('gettin guser info');
        let key = 'c349ab1fcb6b132ffb8d842e982458db';
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${this.state.userName}&api_key=${key}&format=json`;
        fetch(url)
            .then(res => res.json())
            .then(
                res => {
                    this.setState({
                        userAvatar: res.user.image[3]['#text'],
                        playCount: res.user.playcount,
                        registered: res.user.registered['#text']
                    });
                },
                err => {console.log(err);}
            )
    }

    callApi()
    {
        console.log('calling api');
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

    loadData()
    {
        new Promise((resolve) => {
            this.callApi();
            this.getRecentTracks();
            this.getUserInfo();
            resolve(() => {});
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        console.log('update from body');
        console.log(this.state.userName + " " + prevState.userName);
        console.log(this.state.nowPlaying.name + " " + prevState.nowPlaying.name);
        if (this.state.userName !== prevState.userName || this.state.nowPlaying.name !== prevState.nowPlaying.name)
            this.loadData();
    }

    componentWillUpdate(nextProps, nextState, nextContext)
    {
        if (this.state.modalImageSrc.length > 0 && this.state.modalImageSrc !== nextState.modalImageSrc)
            this.render();
    }

    componentDidMount()
    {
        setInterval(() => {
            this.getRecentTracks();
        },10000);

        this.loadData();
    }

    clickButton(event)
    {
        const selectedId = event.target.id;

        if (selectedId === 'recentButton')
            this.setState({selected: "recent"});
        else if (selectedId === 'topButton')
            this.setState({selected: "top"})
    }

    mouseEnter(event, caption)
    {
        let url = event.target.src;
        if (url){
            let suffix = url.lastIndexOf("/");
            let imageId = url.substr(suffix+1);

            let prefix = url.substr(0,suffix);
            let t = prefix.lastIndexOf("/");
            prefix = prefix.substr(0,t);

            let newImageId = prefix + '/96s/' + imageId;
            this.modalTimeOut = setTimeout(() =>
            {
                this.setState({
                    modalImageSrc: newImageId,
                    modalImageCaption: caption
                });
            }, 500);
        }
    }

    mouseOut()
    {
        clearTimeout(this.modalTimeOut);
        this.setState({
            modalImageSrc: '',
            modalImageCaption: ''
        });
    }

    render()
    {
        console.log('rendering');
        let topContent = '';
        if (this.state.strategy === 'getTopArtists')
            topContent = <ArtistTable artists={this.state.artists} mouseOver={this.mouseEnter} mouseOut={this.mouseOut}/>
        if (this.state.strategy === 'getTopAlbums')
            topContent = <AlbumTable albums={this.state.albums} mouseOver={this.mouseEnter} mouseOut={this.mouseOut}/>
        if (this.state.strategy === 'getTopTracks')
            topContent = <TrackTable tracks={this.state.tracks} mouseOver={this.mouseEnter} mouseOut={this.mouseOut}/>

        let recentButton;
        let recentButtonTitle;
        if (this.state.selected === 'recent')
        {
            recentButton = <i id={"recentButton"} onClick={(event) => this.clickButton(event)} className={"fas fa-history fa-5x clicky selected"}></i>
            recentButtonTitle = <b>Recent</b>
        }
        else
        {
            recentButton = <i id={"recentButton"} onClick={(event) => this.clickButton(event)} className={"fas fa-history fa-5x clicky"}></i>
            recentButtonTitle = "Recent";
        }

        let topButton;
        let topButtonTitle;
        if (this.state.selected === 'top')
        {
            topButton = <i id={"topButton"} onClick={(event) => this.clickButton(event)} className={"fas fa-trophy fa-5x clicky selected"}></i>
            topButtonTitle = <b>Top</b>
        }
        else
        {
            topButton = <i id={"topButton"} onClick={(event) => this.clickButton(event)} className={"fas fa-trophy fa-5x clicky"}></i>
            topButtonTitle = "Top";
        }

        let mainContent;
        if (this.state.selected === 'top')
            mainContent = <div>
                <br/>
                <MainMenu {...this.state} onChange={(x,y) => this.changeItems(x,y)}/>
                <br/>
                {topContent}
            </div>;
        else
            mainContent = <RecentTracksTable mouseOver={this.mouseEnter} mouseOut={this.mouseOut} tracks={this.state.recentTracks}/>

        let modalClass = this.state.modalImageSrc.length > 0 ? 'active imagePopup box' : 'imagePopup';

        return(
            <div>
                <NowPlaying nowPlaying={this.state.nowPlaying}/>
                <div className={"columns"}>
                    <div className={"column is-half is-offset-one-quarter has-text-centered"}>
                        <Profile
                            userAvatar={this.state.userAvatar}
                            playCount={this.state.playCount}
                            registered={this.state.registered}
                            userName={this.state.userName}
                            changeUsername={(event) => this.setUserName(event)}
                        />
                    </div>
                </div>
                <div className={"columns menuButtons"}>
                    <div className={'column is-half is-offset-one-quarter has-text-centered'}>
                        <div style={{display: "inline-block"}}>
                            {recentButton}
                            <br/>
                            {recentButtonTitle}
                        </div>
                        <div style={{display: "inline-block"}}>
                            {topButton}
                            <br/>
                            {topButtonTitle}
                        </div>
                    </div>
                </div>
                <div className={"columns"}>
                    <div className={"column is-10 is-offset-1"} >
                        {mainContent}
                    </div>
                </div>
                <div className={modalClass} >
                    <img alt={""} src={this.state.modalImageSrc}/>
                    <span style={{color: "black"}}><b>{this.state.modalImageCaption}</b></span>
                </div>
            </div>
        )
    }
}