import React from 'react';
import MainMenu from "./MainMenu";
import ArtistTable from "./ArtistTable";
import AlbumTable from "./AlbumTable";
import TrackTable from "./TrackTable";
import RecentTracksTable from "./RecentTracksTable";
import NowPlaying from "./NowPlaying";
import Profile from "./Profile";
import Pagination from "./Pagination";

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
            page: 1,
            recentTracksPages: 0,
            artistsPages: 0,
            albumsPages: 0,
            tracksPages: 0,
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
            modalImageCaption: "",
            loading: true,
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
        this.mouseEnter2 = this.mouseEnter2.bind(this);
        this.mouseOut = this.mouseOut.bind(this);
        this.forwardPage = this.forwardPage.bind(this);
        this.backwardPage = this.backwardPage.bind(this);
        this.jumpToPage = this.jumpToPage.bind(this);
    };

    setUserName(value)
    {
        localStorage.setItem("userName", value);
        this.setState({
            userName: value,
            page: 1,
            selected: 'recent',
            strategy: 'getTopArtists',
            timeFrame: '7day'
        });
    }

    forwardPage()
    {
        this.setState({
            page: this.state.page + 1
        });
    }

    backwardPage()
    {
        if (this.state.page > 1)
            this.setState({
                page: this.state.page - 1
            });
    }

    jumpToPage(event, number)
    {
        this.setState({
            page: number
        });
    }

    getFullUrl()
    {
        let key = 'c349ab1fcb6b132ffb8d842e982458db';
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.${this.state.strategy}&user=${this.state.userName}&api_key=${key}&format=json&period=${this.state.timeFrame}&page=${this.state.page}`;
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
                strategy: strategyKey[0],
                page: 1
            }, this.callApi);
        }
        if (type === 'timeFrame')
        {
            let timeFrameKey = Object.entries(this.state.timeFrames).find((val,index) => {
                return val[1] === newValue;
            })
            this.setState({
                timeFrame: timeFrameKey[0],
                page: 1
            }, this.callApi);
        }
    }

    getRecentTracks()
    {
        let key = 'c349ab1fcb6b132ffb8d842e982458db';
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks&user=${this.state.userName}&api_key=${key}&format=json&page=${this.state.page}`;
        return fetch(url)
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
                            nowPlaying: nowPlaying ? nowPlaying : '',
                            recentTracksPages: res.recenttracks['@attr'].totalPages
                        });
                    }
                },
                err => {console.log(err);}
            )
    }

    getUserInfo()
    {
        let key = 'c349ab1fcb6b132ffb8d842e982458db';
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.getinfo&user=${this.state.userName}&api_key=${key}&format=json`;
        return fetch(url)
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
        let url = this.getFullUrl()
        return fetch(url)
            .then(res => res.json())
            .then(
                res => {
                    if (this.state.strategy === 'getTopArtists')
                    {
                        let topArtists = res.topartists.artist;
                        this.setState({
                            artists: topArtists,
                            artistsPages: res.topartists['@attr'].totalPages
                        });
                    }
                    if (this.state.strategy === 'getTopAlbums')
                    {
                        let topAlbums = res.topalbums.album;
                        this.setState({
                            albums: topAlbums,
                            albumsPages: res.topalbums['@attr'].totalPages
                        });
                    }
                    if (this.state.strategy === 'getTopTracks')
                    {
                        let topTracks = res.toptracks.track;
                        this.setState({
                            tracks: topTracks,
                            tracksPages: res.toptracks['@attr'].totalPages
                        });
                    }
                    if (this.state.strategy === 'getRecentTracks')
                    {
                        let recentTracks = res.recenttracks.track;
                        this.setState({
                            recentTracks: recentTracks,
                            recentTracksPages: res.recenttracks['@attr'].totalPages
                        });
                    }
                },
                err => {console.log(err);}
            );
    }

    loadData()
    {
        console.log('loading data');
        this.setState({loading: true});
        let p1 = new Promise((res) =>
        {
            let p = this.callApi();
            p.then(() => {
                res();
            })
        });
        let p2 = new Promise((res) =>
        {
            let p = this.getRecentTracks();
            p.then(() => {
                res();
            });
        });
        new Promise((res) =>
        {
            let p = this.getUserInfo();
            p.then(() => {
                res();
            });
        });

        let promiseData = Promise.all([p1, p2])

        promiseData.then(() => {
            this.setState({loading: false});
        });
    }

    componentDidUpdate(prevProps, prevState, snapshot)
    {
        if (this.state.userName !== prevState.userName || this.state.nowPlaying.name !== prevState.nowPlaying.name)
            this.loadData();

        if (this.state.strategy !== prevState.strategy || this.state.timeFrame !== prevState.timeFrame)
            this.loadData();

        if (this.state.page !== prevState.page)
            this.loadData();
    }

    componentWillUpdate(nextProps, nextState, nextContext)
    {
        if ((this.state.modalImageSrc.length > 0 && this.state.modalImageSrc !== nextState.modalImageSrc) || this.state.page !== nextState.page)
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
            this.setState({
                selected: "recent",
                page: 1
            });
        else if (selectedId === 'topButton')
            this.setState({
                selected: "top",
                page: 1
            })
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

    mouseEnter2(event, caption)
    {
        let url = event.target.src;
        if (url){
            this.modalTimeOut = setTimeout(() =>
            {
                this.setState({
                    modalImageSrc: url,
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
        let pagination;
        let topContent = '';
        if (this.state.strategy === 'getTopArtists') {
            topContent =
                <ArtistTable artists={this.state.artists} mouseOver={this.mouseEnter2} mouseOut={this.mouseOut}/>
            pagination =
                <Pagination totalPages={this.state.artistsPages} currentPage={this.state.page} next={this.forwardPage}
                            previous={this.backwardPage} jumpTo={this.jumpToPage}/>
        }
        if (this.state.strategy === 'getTopAlbums') {
            topContent = <AlbumTable albums={this.state.albums} mouseOver={this.mouseEnter} mouseOut={this.mouseOut}/>
            pagination =
                <Pagination totalPages={this.state.albumsPages} currentPage={this.state.page} next={this.forwardPage}
                            previous={this.backwardPage} jumpTo={this.jumpToPage}/>
        }
        if (this.state.strategy === 'getTopTracks') {
            topContent = <TrackTable tracks={this.state.tracks} mouseOver={this.mouseEnter2} mouseOut={this.mouseOut}/>
            pagination =
                <Pagination totalPages={this.state.tracksPages} currentPage={this.state.page} next={this.forwardPage}
                            previous={this.backwardPage} jumpTo={this.jumpToPage}/>
        }

        let recentButton;
        let recentButtonTitle;
        if (this.state.selected === 'recent') {
            recentButton = <i id={"recentButton"} onClick={(event) => this.clickButton(event)}
                              className={"fas fa-history fa-5x clicky selected"}></i>
            recentButtonTitle = <b>Recent</b>
        } else {
            recentButton = <i id={"recentButton"} onClick={(event) => this.clickButton(event)}
                              className={"fas fa-history fa-5x clicky"}></i>
            recentButtonTitle = "Recent";
        }

        let topButton;
        let topButtonTitle;
        if (this.state.selected === 'top') {
            topButton = <i id={"topButton"} onClick={(event) => this.clickButton(event)}
                           className={"fas fa-trophy fa-5x clicky selected"}></i>
            topButtonTitle = <b>Top</b>
        } else {
            topButton = <i id={"topButton"} onClick={(event) => this.clickButton(event)}
                           className={"fas fa-trophy fa-5x clicky"}></i>
            topButtonTitle = "Top";
        }

        let menu = '';
        let mainContent;
        if (this.state.selected === 'top')
        {
            mainContent =
                <div>
                    <br/>
                    <br/>
                    {topContent}
                </div>;
            menu = <MainMenu {...this.state} onChange={(x, y) => this.changeItems(x, y)}/>
        }
        else
        {
            mainContent = <RecentTracksTable mouseOver={this.mouseEnter} mouseOut={this.mouseOut} tracks={this.state.recentTracks}/>
            pagination = <Pagination totalPages={this.state.recentTracksPages} currentPage={this.state.page} next={this.forwardPage} previous={this.backwardPage} jumpTo={this.jumpToPage}/>
        }

        let loading = '';
        if (this.state.loading)
            loading =
                <div className="modal is-active" >
                    <div className = "modal-background" >  </div>
                    <div className="modal-content" style={{color : "#C3073F"}}>
                        <div>
                            <i className="fas fa-compact-disc fa-7x fa-spin"></i>
                            <br/><br/>
                            &nbsp;&nbsp;&nbsp;&nbsp;<span style={{color: "white"}}>Loading...</span>
                        </div>
                    </div>
                </div>

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
                        {menu}
                        {pagination}
                        {loading}
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