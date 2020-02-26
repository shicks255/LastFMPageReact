import {decorate, observable} from "mobx";

class LogicStore {
    strategy: string = 'getTopArtists';
    timeFrame: string = '7day';
    artists:[] = [];
    albums:[] = [];
    tracks:[] = [];
    recentTracks:[] = [];
    nowPlaying: string = "";
    selected:string = 'recent';
}

decorate(LogicStore, {
    strategy: observable,
    timeFrame: observable,
    artists: observable,
    albums: observable,
    tracks: observable,
    recentTracks: observable,
    nowPlaying: observable,
    selected: observable,
});

export const logicStore = new LogicStore();