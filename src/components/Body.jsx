import React from 'react';
import {observer,inject} from 'mobx-react';
import MainMenu from "./MainMenu";
import {ArtistTable} from "./ArtistTable";
import {AlbumTable} from "./AlbumTable";
import {TrackTable} from "./TrackTable";
import {RecentTracksTable} from "./RecentTracksTable";
import NowPlaying from "./NowPlaying";
import {Profile} from "./Profile";
import {Pagination} from "./Pagination";
import {uiStore} from "../stores/UIStore";
import {timeFrames,strategies} from "../utils";
import LoadingModal from "./LoadingModal";
import Button from "./Button";
import {logicStore} from "../stores/LogicStore";
import {profileStore} from "../stores/ProfileStore";
import Visuals from "./visuals/Visuals";

export const Body = inject("uiStore","logicStore","profileStore")(observer(class Body extends React.Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            lastFmKey: process.env.REACT_APP_LAST_FM_KEY,
        }

        this.changeItems = this.changeItems.bind(this);
        this.loadData = this.loadData.bind(this);
        this.getFullUrl = this.getFullUrl.bind(this);
        this.getRecentTracks = this.getRecentTracks.bind(this);
        this.getUserInfo = this.getUserInfo.bind(this);
        this.callApi = this.callApi.bind(this);
        this.clickButton = this.clickButton.bind(this);
    };

    getFullUrl()
    {
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.${this.props.logicStore.strategy}
        &user=${this.props.profileStore.userName}
        &api_key=${this.state.lastFmKey}
        &format=json
        &period=${this.props.logicStore.timeFrame}
        &page=${this.props.uiStore.page}`;
        return url;
    }

    changeItems(newValue, type)
    {
        const {logicStore} = this.props;
        this.props.uiStore.jumpToPage(1);
        if (type === 'strategy')
        {
            const strategyKey = Object.entries(strategies).find((val) => {
                return val[1] === newValue;
            });
            logicStore.strategy = strategyKey[0];
            this.callApi();
        }
        if (type === 'timeFrame')
        {
            let timeFrameKey = Object.entries(timeFrames).find((val) => {
                return val[1] === newValue;
            })
            logicStore.timeFrame = timeFrameKey[0];
            this.callApi();
        }
    }

    getRecentTracks()
    {
        let url = `https://ws.audioscrobbler.com/2.0/?method=user.getrecenttracks
        &user=${profileStore.userName}
        &api_key=${this.state.lastFmKey}
        &format=json
        &page=${this.props.uiStore.page}`;

        const {logicStore} = this.props;

        return fetch(url)
            .then(res => res.json())
            .then(
                res => {
                    if (res.recenttracks)
                    {
                        let recentTracks = res.recenttracks.track;
                        let nowPlaying = recentTracks.find((val) => {
                            if (val['@attr'] && val['@attr'].nowplaying === 'true')
                                return val;
                        });

                        logicStore.recentTracks = recentTracks;
                        logicStore.nowPlaying = nowPlaying ? nowPlaying : '';
                        this.setState({
                            recentTracksPages: res.recenttracks['@attr'].totalPages
                        });
                    }
                },
                err => {console.log(err);}
            )
    }

    getUserInfo()
    {
        return this.props.profileStore.getUserInfo();
    }

    callApi()
    {
        const {logicStore} = this.props;
        let url = this.getFullUrl()
        return fetch(url)
            .then(res => res.json())
            .then(
                res => {
                    if (logicStore.strategy === 'getTopArtists')
                    {
                        logicStore.artists = res.topartists.artist;
                        console.log(res.topartists.artist);
                        this.setState({
                            artistsPages: res.topartists['@attr'].totalPages
                        });
                    }
                    if (logicStore.strategy === 'getTopAlbums')
                    {
                        logicStore.albums = res.topalbums.album;
                        this.setState({
                            albumsPages: res.topalbums['@attr'].totalPages
                        });
                    }
                    if (logicStore.strategy === 'getTopTracks')
                    {
                        logicStore.tracks = res.toptracks.track;
                        this.setState({
                            tracksPages: res.toptracks['@attr'].totalPages
                        });
                    }
                    if (logicStore.strategy === 'getRecentTracks')
                    {
                        logicStore.recentTracks = res.recenttracks.track;
                        this.setState({
                            recentTracksPages: res.recenttracks['@attr'].totalPages
                        });
                    }
                },
                err => {console.log(err);}
            );
    }

    loadData()
    {
        this.props.uiStore.loading = true;
        let p1 = new Promise((res) =>
        {
            this.callApi().then(() => res());
        });
        let p2 = new Promise((res) =>
        {
            this.getRecentTracks().then(() => res());
        });
        let p3 = new Promise((res) =>
        {
            this.getUserInfo().then(() => res());
        });

        let promiseData = Promise.all([p1, p2, p3])

        promiseData.then(() => {
            this.props.uiStore.loading = false;
        });
    }

    componentDidMount()
    {
        this.loadData();
        // setInterval(() => {
        //     this.getRecentTracks();
        // },10000);
    }

    clickButton(event)
    {
        const selectedId = event.target.id;
        let value = '';
        if (selectedId === 'recentButton')
            value = 'recent';
        if (selectedId === 'topButton')
            value = 'top';
        if (selectedId === 'vis')
            value = 'vis'

        this.props.logicStore.selected = value;
        this.props.uiStore.jumpToPage(1);
        this.loadData();
    }

    render()
    {
        const {uiStore,logicStore} = this.props;

        let pagination;
        let topContent = '';
        if (logicStore.strategy === 'getTopArtists') {
            topContent =
                <ArtistTable />
            pagination =
                <Pagination loadData={this.loadData} totalPages={this.state.artistsPages} />
        }
        if (logicStore.strategy === 'getTopAlbums') {
            topContent = <AlbumTable />
            pagination =
                <Pagination loadData={this.loadData} totalPages={this.state.albumsPages}/>
        }
        if (logicStore.strategy === 'getTopTracks') {
            topContent = <TrackTable />
            pagination =
                <Pagination loadData={this.loadData} totalPages={this.state.tracksPages} />
        }

        let recentButtonClass = 'fas fa-history fa-5x clicky';
        if (logicStore.selected === 'recent')
            recentButtonClass += ' selected';

        let topButtonClass = 'fas fa-trophy fa-5x clicky';
        if (logicStore.selected === 'top')
            topButtonClass += ' selected';

        let vizButtonClass = 'fas fa-trophy fa-5x clicky';
        if (logicStore.selected === 'vis')
            vizButtonClass += ' selected';

        let menu = '';
        let mainContent;
        if (logicStore.selected === 'top') {
            mainContent =
                <div>
                    <br/>
                    <br/>
                    {topContent}
                </div>;
            menu = <MainMenu {...this.state} strategies={strategies} timeFrames={timeFrames} onChange={(x, y) => this.changeItems(x, y)}/>
        } else if (logicStore.selected === 'vis') {
            mainContent = <Visuals timeFrame={this.state.timeFrame} onChange={(x,y) => this.changeItems(x, y)}/>

            pagination = null
        } else {
            mainContent = <RecentTracksTable />
            pagination = <Pagination loadData={this.loadData} totalPages={this.state.recentTracksPages} />
        }

        let loading = uiStore.loading ? <LoadingModal/> : '';
        let modalClass = uiStore.modalImageSrc.length > 0 ? 'active imagePopup box' : 'imagePopup';

        return(
            <div>
                <NowPlaying nowPlaying={logicStore.nowPlaying}/>
                <div className={"columns"}>
                    <div className={"column is-half is-offset-one-quarter has-text-centered"}>
                        <Profile
                            userAvatar={this.state.userAvatar}
                            playCount={this.state.playCount}
                            registered={this.state.registered}
                            loadData={this.loadData}
                        />
                    </div>
                </div>
                <div className={"columns menuButtons"}>
                    <div className={'column is-half is-offset-one-quarter has-text-centered'}>
                        <Button id={'recentButton'} class={recentButtonClass} title='Recent' clickButton={this.clickButton}/>
                        <Button id={'topButton'} class={topButtonClass} title='Top' clickButton={this.clickButton}/>
                        <Button id={'vis'} class={vizButtonClass} title='Visualization' clickButton={this.clickButton} />
                    </div>
                </div>
                <div className={"columns"}>
                    <div className={"column is-10 is-offset-1"} >
                        {menu}
                        {pagination}
                        {loading}
                        {mainContent}
                        {pagination}
                    </div>
                </div>
                <div className={modalClass} >
                    <img alt={""} src={uiStore.modalImageSrc}/>
                    <span style={{color: "black"}}><b>{uiStore.modalImageCaption}</b></span>
                </div>
            </div>
        )
    }
}));